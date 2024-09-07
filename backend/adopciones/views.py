from .models import Adopciones
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class ListAndCreateAdopcionesApiView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Lista las adopciones
        """
        adopciones = Adopciones.objects.all()
        serializer = AdopcionesGetSerializer(adopciones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        """
        Crea las adopciones
        """
        adopciones = request.data
        serializer = AdopcionesUpsertSerializer(data=adopciones)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DetailAdopcionesApiView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, id, *args, **kwargs):
        adopcion = get_object_or_404(Adopciones, pk=id)
        serializer = AdopcionesGetSerializer(adopcion)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id, *args, **kwargs):
        adopcion = get_object_or_404(Adopciones, pk=id)
        serializer = AdopcionesUpsertSerializer(adopcion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id, *args, **kwargs):
        adopcion = get_object_or_404(Adopciones, pk=id)
        adopcion.delete()
        return Response({"msg": "Adopción eliminada correctamente"}, status=status.HTTP_204_NO_CONTENT)