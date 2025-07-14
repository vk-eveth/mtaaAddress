from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    ordering = ['email']
    list_display = ['email', 'name', "role", 'is_staff','is_superuser']
    list_filter = ["role", "is_superuser", "is_staff"]
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("name",)}),
        ("Permissions", {"fields": ("role","is_superuser", "is_staff")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "name", "password1", "password2", "is_staff", "is_superuser"),
        }),
    )

    search_fields = ["email", "name"]
    filter_horizontal = ("groups", "user_permissions")

admin.site.register(User, UserAdmin)
