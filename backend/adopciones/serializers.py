from .models import *
from rest_framework import serializers
from users.serializers import UserSerializer
from animales.serializers import AnimalesSerializer


class AdopcionesUpsertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adopciones
        fields = ['id', 'animal', 'voluntario', 'adoptante', 'estado', 'created_at', 'updated_at']

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        representation['estado_display'] = instance.get_estado_display()
        return representation
    

class AdopcionesGetSerializer(serializers.ModelSerializer):
    animal = AnimalesSerializer(read_only=True)
    voluntario = UserSerializer(read_only=True)
    adoptante = UserSerializer(read_only=True)
    class Meta:
        model = Adopciones
        fields = ['id', 'animal', 'voluntario', 'adoptante', 'estado', 'created_at', 'updated_at']

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        representation['estado_display'] = instance.get_estado_display()
        return representation