from django.urls import path
from .views import (
    CreateAddressView,
    MyAddressesView,
    AllAddressesView,
    UpdateAddressStatusView,
    AdminUsersListView,
    DeleteAddressView, 
    UpdateAddressView,
)

urlpatterns = [
    path("create/", CreateAddressView.as_view(), name="create-address"),
    path("my/", MyAddressesView.as_view(), name="my-addresses"),

    path("<int:pk>/delete/", DeleteAddressView.as_view(), name="delete-address"),
    path("<int:pk>/update/", UpdateAddressView.as_view(), name="update-address"),

    # Admin Routes
    path("admin/all/", AllAddressesView.as_view(), name="admin-all-addresses"),
    path("admin/status/<int:pk>/", UpdateAddressStatusView.as_view(), name="update-address-status"),
    path("admin/users/", AdminUsersListView.as_view(), name="admin-users"),
]
