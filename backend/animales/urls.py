from django.urls import path
from .views import *

urlpatterns = [
    path('animales/', ListaAndCreateAnimalesApiView.as_view(), name='list-animales'),
    path('animales/<int:id>/', DetailAnimalesApiView.as_view(), name='detail-animal'),
]