from django.urls import path
from .views import *

urlpatterns = [
    path('adopciones/', ListAndCreateAdopcionesApiView.as_view(), name='list-adopciones'),
    path('adopciones/<int:id>/', DetailAdopcionesApiView.as_view(), name='detail-adopcion'),
]