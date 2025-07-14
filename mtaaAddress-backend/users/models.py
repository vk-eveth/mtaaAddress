from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, name="", role="user", is_staff=False, is_superuser=False):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        # Force role to "user" if something else is passed
        if role != "admin":
            role = "user"
        user = self.model(email=email, name=name, role=role)
        user.set_password(password)
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, name=None):
        return self.create_user(
        email=email,
        password=password,
        name=name,
        role="admin",
        is_staff=True,
        is_superuser=True
    )

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = UserManager()

    def __str__(self):
        return self.email
