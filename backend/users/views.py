from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .utils import get_tokens_for_user
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.shortcuts import get_object_or_404


class RegistrationView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        if 'email' not in request.data or 'password' not in request.data:
            return Response({'msg': 'Credentials missing'}, status=status.HTTP_400_BAD_REQUEST)
        email = request.data['email']
        password = request.data['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            auth_data = get_tokens_for_user(request.user)
            return Response({'msg': 'Login Success', **auth_data}, status=status.HTTP_200_OK)
        return Response({'msg': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'msg': 'Successfully Logged out'}, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(context={'request': request}, data=request.data)
        serializer.is_valid(raise_exception=True) 
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        # Agregar un log de cambio de contraseña o enviar un correo de confirmación de cambio de contraseña
        return Response({'msg': 'Contraseña cambiada exitosamente'}, status=status.HTTP_200_OK)


# ************************* VOLUNTARIOS Y ADOPTANTES*************************

class ListUsuarioApiView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Lista y crea los voluntarios y adoptantes
        """
        tipo_usuario = request.query_params.get("tipo")

        if tipo_usuario == "1":
            users = User.objects.filter(tipo=tipo_usuario)
        elif tipo_usuario == "2":
            users = User.objects.filter(tipo=tipo_usuario)
        else:
            return Response({"msg": "No se proporcionó un tipo de usuario correcto"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class DetailUsuarioApiView(APIView):

    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            return [IsAdminUser()]
        return [AllowAny()]
    
    def get(self, request, id, *args, **kwargs):
        usuario = get_object_or_404(User, pk=id)
        serializer = UserSerializer(usuario)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id, *args, **kwargs):
        usuario = get_object_or_404(User, pk=id)
        serializer = UserSerializer(usuario, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id, *args, **kwargs):
        usuario = get_object_or_404(User, pk=id)
        usuario.delete()
        return Response({"msg": "Usuario eliminado correctamente"}, status=status.HTTP_204_NO_CONTENT)
    
    