from enum import unique

from rest_framework import serializers

from key_crm.models import KeyCRMProduct


class KeyCRMProductSerializer(serializers.ModelSerializer):
    key_crm_id = serializers.IntegerField()  # for tasks

    class Meta:
        model = KeyCRMProduct
        fields = '__all__'

    def to_internal_value(self, data):
        data['key_crm_id'] = data['id']
        return super().to_internal_value(data)
