from decimal import Decimal

from django.shortcuts import render
from django.views.generic import TemplateView
from liqpay import LiqPay
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.parsers import FormParser
from rest_framework.response import Response

from amster_flora.settings import LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY
from common.constants import PaymentStatus
from orders.models import Order
from payments.models import Transaction
from payments.serializers import LiqpayEncodeSerializer


class LiqpayCallbackView(CreateAPIView):
    serializer_class = LiqpayEncodeSerializer
    parser_classes = [FormParser]

    def create(self, request, *args, **kwargs):
        print("liqpay callback")
        print(self.request.data)
        liqpay = LiqPay(LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY)
        data = request.POST.get('data')
        print('data', data)
        signature = request.POST.get('signature')
        decode_data = liqpay.decode_data_from_str(data)
        sign = liqpay.str_to_sign(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY)
        if sign == signature:
            print('callback is valid')
        response = liqpay.decode_data_from_str(data)
        print('callback data', response)
        if sign == signature and decode_data['status'] == 'success':
            print('callback is valid')
            response = decode_data
            print('response', response)
            print('*' * 100)
            # amount = Decimal(decode_data['amount'])
            # status = PaymentStatus.PAYED
            # order_id = decode_data['order_id']
            # order = Order.objects.filter(id=order_id).select_related('creator').first()
            # creator = None
            # if order:
            #     creator = order.creator
            # transactions_data = {
            #     'title': order_id, 'status': status, 'amount': amount,
            #     'creator': creator, 'response': response
            # }
            # transaction = Transaction.objects.create(**transactions_data)
            # print(transaction.id)
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        # else:
        #     return Response({'status': 'error'}, status=status.HTTP_400_BAD_REQUEST)