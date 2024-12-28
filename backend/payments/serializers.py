from rest_framework import serializers

from payments.models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class LiqpayEncodeSerializer(serializers.Serializer):  # encode data
    data = serializers.CharField(max_length=455)
    signature = serializers.CharField(max_length=255)


class LiqpaySerializer(serializers.Serializer):  # decode data
    action = serializers.CharField(max_length=255)
    payment_id = serializers.CharField(max_length=255)
    status = serializers.CharField(max_length=255)
    version = serializers.CharField(max_length=255)
    type = serializers.CharField(max_length=255)
    paytype = serializers.CharField(max_length=255)
    public_key = serializers.CharField(max_length=255)
    acq_id = serializers.CharField(max_length=255)
    order_id = serializers.CharField(max_length=255)
    liqpay_order_id = serializers.CharField(max_length=255)
    description = serializers.CharField(max_length=255)
    sender_phone = serializers.CharField(max_length=255)
    sender_card_mask2 = serializers.CharField(max_length=255)
    sender_card_bank = serializers.CharField(max_length=255)
    sender_card_type = serializers.CharField(max_length=255)
    sender_card_country = serializers.CharField(max_length=255)
    ip = serializers.CharField(max_length=255)
    card_token = serializers.CharField(max_length=255)
    info = serializers.CharField(max_length=1555)
    amount = serializers.CharField(max_length=255)
    currency = serializers.CharField(max_length=255)
    sender_commission = serializers.CharField(max_length=255)
    receiver_commission = serializers.CharField(max_length=255)
    agent_commission = serializers.CharField(max_length=255)
    amount_debit = serializers.CharField(max_length=255)
    amount_credit = serializers.CharField(max_length=255)
    commission_debit = serializers.CharField(max_length=255)
    commission_credit = serializers.CharField(max_length=255)
    currency_debit = serializers.CharField(max_length=255)
    currency_credit = serializers.CharField(max_length=255)
    sender_bonus = serializers.CharField(max_length=255)
    amount_bonus = serializers.CharField(max_length=255)
    bonus_type = serializers.CharField(max_length=255)
    bonus_procent = serializers.CharField(max_length=255)
    authcode_debit = serializers.CharField(max_length=255)
    authcode_credit = serializers.CharField(max_length=255)
    rrn_debit = serializers.CharField(max_length=255)
    rrn_credit = serializers.CharField(max_length=255)
    mpi_eci = serializers.CharField(max_length=255)
    is_3ds = serializers.CharField(max_length=255)
    create_date = serializers.CharField(max_length=255)
    end_date = serializers.CharField(max_length=255)
    moment_part = serializers.CharField(max_length=255)
    transaction_id = serializers.CharField(max_length=255)



class WayForPayEncodeSerializer(serializers.Serializer):  # encode data
    merchantAccount = serializers.CharField(max_length=255)
    orderReference = serializers.CharField(max_length=255)
    merchantSignature = serializers.CharField(max_length=255)
    amount = serializers.CharField(max_length=255)
    currency = serializers.CharField(max_length=255)
    authCode = serializers.CharField(max_length=255)
    email = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=255)
    createdDate = serializers.CharField(max_length=255)
    processingDate = serializers.CharField(max_length=255)
    cardPan = serializers.CharField(max_length=255)
    cardType = serializers.CharField(max_length=255)
    issuerBankCountry = serializers.CharField(max_length=255)
    issuerBankName = serializers.CharField(max_length=255)
    recToken = serializers.CharField(max_length=255)
    transactionStatus = serializers.CharField(max_length=255)
    reason = serializers.CharField(max_length=255)
    reasonCode = serializers.CharField(max_length=255)
    fee = serializers.CharField(max_length=255)
    paymentSystem = serializers.CharField(max_length=255)
    acquirerBankName = serializers.CharField(max_length=255)
    cardProduct = serializers.CharField(max_length=255)
    clientName = serializers.CharField(max_length=255)