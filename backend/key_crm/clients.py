from amster_flora.settings import KEY_CRM_API_KEY, KET_CRM_URL
from common.clients import BasicAUTHRequest


class KeyCrmApiClient(BasicAUTHRequest):
    token = 'Bearer'
    api_key = KEY_CRM_API_KEY
    host = KET_CRM_URL
