from rest_framework import serializers
from .models import *

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'tipo', 'first_name', 'last_name', 'username']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        email = self.validated_data['email']
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        tipo = self.validated_data['tipo']
        first_name = self.validated_data['first_name']
        last_name = self.validated_data['last_name']
        username = self.validated_data['username']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})

        user = User(email=email, tipo=tipo, first_name=first_name, last_name=last_name, username=username)
        user.set_password(password)
        user.save()
        return user
    

class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"}, required=True)
    new_password = serializers.CharField(style={"input_type": "password"}, required=True)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError({'current_password': 'Does not match'})
        return value
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'tipo', 'estado']
        extra_kwargs = {
            'tipo': {'required': True},
            'estado': {'required': True}
        }

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        representation['tipo_display'] = instance.get_tipo_display()
        representation['estado_display'] = instance.get_estado_display()
        return representation