from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


class ListaAndCreateAnimalesApiView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Lista los animales
        """
        animales = Animales.objects.all()
        serializer = AnimalesSerializer(animales, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        """
        Crea los animales
        """
        animales = request.data
        serializer = AnimalesSerializer(data=animales)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DetailAnimalesApiView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, id, *args, **kwargs):
        animal = get_object_or_404(Animales, pk=id)
        serializer = AnimalesSerializer(animal)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id, *args, **kwargs):
        animal = get_object_or_404(Animales, pk=id)
        serializer = AnimalesSerializer(animal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id, *args, **kwargs):
        animal = get_object_or_404(Animales, pk=id)
        animal.delete()
        return Response({"msg": "Animal eliminado correctamente"}, status=status.HTTP_204_NO_CONTENT)