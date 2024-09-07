from django.contrib import admin
from .models import Animales

@admin.register(Animales)
class AnimalesAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'edad', 'raza', 'tipo', 'estado')
    list_filter = ('edad', 'raza', 'tipo', 'estado')
    search_fields = ('nombre',)
