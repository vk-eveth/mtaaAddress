from rest_framework import serializers
from .models import Address

class AddressSerializer(serializers.ModelSerializer):
    code = serializers.SerializerMethodField()

    class Meta:
        model = Address
        fields = "__all__"
        read_only_fields = ["status", "user", "code", "created_at"]

    def get_code(self, obj):
        return obj.code
