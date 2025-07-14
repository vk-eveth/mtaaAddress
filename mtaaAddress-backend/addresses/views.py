from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Address
from .serializers import AddressSerializer
from users.models import User
from users.serializers import UserSerializer  
class CreateAddressView(generics.CreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MyAddressesView(generics.ListAPIView):
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user).order_by("-created_at")

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "admin"

class AllAddressesView(generics.ListAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Address.objects.all().order_by("-created_at")

class UpdateAddressStatusView(generics.UpdateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAdminUser]

    def patch(self, request, *args, **kwargs):
        address = self.get_object()
        status_value = request.data.get("status")
        if status_value not in ["approved", "rejected", "pending"]:
            return Response({"error": "Invalid status"}, status=400)

        address.status = status_value
        address.save()
        return Response(AddressSerializer(address).data)

class AdminUsersListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return User.objects.all().order_by("-date_joined")
    

class DeleteAddressView(generics.DestroyAPIView):
    queryset = Address.objects.all()
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def get_queryset(self):
        # Ensure users can only delete their own address
        return Address.objects.filter(user=self.request.user)

class UpdateAddressView(generics.UpdateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def get_queryset(self):
        # Only allow updating their own address
        return Address.objects.filter(user=self.request.user)