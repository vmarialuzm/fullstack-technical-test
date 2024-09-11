from .models import *
from rest_framework import serializers


class AnimalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animales
        fields = ['id', 'nombre', 'edad', 'raza', 'tipo', 'estado']
        extra_kwargs = {
            'tipo': {'required': True},
            'estado': {'required': True}
        }

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        representation['tipo_display'] = instance.get_tipo_display()
        representation['estado_display'] = instance.get_estado_display()
        return representation