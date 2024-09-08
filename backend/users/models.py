from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _

class UserManager(BaseUserManager):

    def create_user(self, email, password, role=None, **extra_fields):
        if not email:
            raise ValueError(_('Users must have an email address'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.role = role
        user.save()
        return user

    def create_superuser(self, email, password, role=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    TIPO_USUARIO = [("1", "Voluntario"), ("2", "Adoptante")]
    ESTADO_USUARIO = [("1", "Activo"), ("2", "Inactivo")]

    email = models.EmailField(_('email address'), unique=True)
    tipo = models.CharField(max_length=1, choices=TIPO_USUARIO)
    estado = models.CharField(max_length=1, choices=ESTADO_USUARIO, default="1")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',)

    objects = UserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
