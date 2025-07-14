from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email", "role", "is_active", "date_joined"]

class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.CharField(default="user")

    class Meta:
        model = User
        fields = ["email", "name", "password", "role"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_role(self, value):
        # Prevent users from registering as admin
        if value == "admin":
            raise serializers.ValidationError("Cannot register as admin.")
        return "user"

    def create(self, validated_data):
        # role is validated already, guaranteed to be "user"
        return User.objects.create_user(**validated_data)
