from .models import *
from rest_framework import serializers


class AnimalesSerializer(serializers.ModelSerializer):
    tipo = serializers.SerializerMethodField()
    estado = serializers.SerializerMethodField()

    class Meta:
        model = Animales
        fields = '__all__'

    def get_tipo(self, obj):
        return obj.get_tipo_display()
    
    def get_estado(self, obj):
        return obj.get_estado_display()