from decimal import Decimal

from django.shortcuts import render
from django.views.generic import TemplateView
from liqpay import LiqPay
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.parsers import FormParser
from rest_framework.response import Response

from amster_flora.settings import LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY
from common.constants import PaymentStatus, Role
from orders.models import Order
from payments.models import Transaction
from payments.serializers import LiqpayEncodeSerializer, TransactionSerializer
from users.permissions import IsAuthenticatedAs


class LiqpayCallbackView(CreateAPIView):
    serializer_class = LiqpayEncodeSerializer
    parser_classes = [FormParser]

    def create(self, request, *args, **kwargs):
        print("liqpay callback")
        liqpay = LiqPay(LIQPAY_PUBLIC_KEY, LIQPAY_PRIVATE_KEY)
        data = request.POST.get('data')
        signature = request.POST.get('signature')
        decode_data = liqpay.decode_data_from_str(data)
        sign = liqpay.str_to_sign(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY)
        if sign == signature and decode_data['status'] == 'success':
            print('callback is valid')
            response = decode_data
            amount = Decimal(decode_data['amount'])
            payment_status = PaymentStatus.PAYED
            order_id = decode_data['order_id']
            order = None
            creator = None
            if order_id and str(order_id).isdigit():
                order = Order.objects.filter(id=order_id).select_related('creator').first()
            if order:
                creator = order.creator
            transactions_data = {
                'title': order_id, 'status': payment_status, 'amount': amount,
                'creator': creator, 'response': response
            }
            transaction = Transaction.objects.create(**transactions_data)
            print('transaction id', transaction.id)
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        # else:
        #     return Response({'status': 'error'}, status=status.HTTP_400_BAD_REQUEST)


class TransactionListAPIView(ListAPIView):
    serializer_class = TransactionSerializer
    # permission_classes = (IsAuthenticatedAs(Role.ADMIN, Role.MANAGER),)

    def get_queryset(self):
        return Transaction.objects.all()
