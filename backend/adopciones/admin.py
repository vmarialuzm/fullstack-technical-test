from django.contrib import admin
from .models import Adopciones

@admin.register(Adopciones)
class AdopcionesAdmin(admin.ModelAdmin):
    list_display = ('animal', 'voluntario', 'adoptante', 'estado', 'created_at', 'updated_at')
    list_filter = ('estado', 'created_at')
    search_fields = ('animal__nombre', 'voluntario__username', 'adoptante__username')
