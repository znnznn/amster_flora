from celery import shared_task

from key_crm.clients import KeyCrmApiClient
from key_crm.models import KeyCRMProduct
from key_crm.serializers import KeyCRMProductSerializer


def get_products_data(response_data) -> dict:
    products_data = {}
    for product in response_data['data']:
        if product['quantity'] < 0:
            continue
        if isinstance(product['quantity'], float):
            product['quantity'] = int(product['quantity'])
        serializer = KeyCRMProductSerializer(data=product)
        serializer.is_valid(raise_exception=True)
        products_data[product['id']] = serializer.validated_data
    return products_data

def update_or_create_products(products_data):
    key_crm_products = KeyCRMProduct.objects.filter(key_crm_id__in=products_data.keys())
    for key_crm_product in key_crm_products:
        data = products_data.pop(key_crm_product.key_crm_id, None)
        if data:
            key_crm_product.quantity = data['quantity']
    KeyCRMProduct.objects.bulk_update(key_crm_products, ['quantity'])
    if products_data:
        KeyCRMProduct.objects.bulk_create([KeyCRMProduct(**product) for product in products_data.values()])


@shared_task
def update_quantity(limit=100):
    key_crm_client = KeyCrmApiClient()
    url = key_crm_client.get_url('products?limit={}'.format(limit))
    response = key_crm_client.get(url)
    if not response.status_code == 200:
        return
    response_data = response.json()
    products_data = get_products_data(response_data)
    update_or_create_products(products_data)
    next_page = False
    if response_data.get('next_page_url'):
        next_page = True
    while next_page:
        url = response_data['next_page_url']
        response = key_crm_client.get(url)
        if not response.status_code == 200:
            return
        response_data = response.json()
        products_data = get_products_data(response_data)
        update_or_create_products(products_data)
        if not response_data.get('next_page_url'):
            next_page = False