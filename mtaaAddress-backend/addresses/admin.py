from django.contrib import admin
from .models import Address

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ("code", "full_name", "place_type", "status", "created_at")
    list_filter = ("status", "place_type")
    search_fields = ("full_name", "landmark", "national_id")
    readonly_fields = ("created_at",)  # ✅ remove 'code' from here
