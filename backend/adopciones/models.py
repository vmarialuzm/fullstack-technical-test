from django.db import models
from animales.models import Animales
from users.models import User

class Adopciones(models.Model):
    ESTADO_ADOPCION = [("1", "Finalizado"), ("2", "En proceso"), ("3", "Cancelado")]

    animal = models.ForeignKey(Animales, on_delete=models.CASCADE, related_name='adopciones_animal')
    voluntario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'tipo': '1'}, related_name='adopciones_voluntario')
    adoptante = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'tipo': '2'}, related_name='adopciones_adoptante')
    estado = models.CharField(max_length=1, choices=ESTADO_ADOPCION, default="2")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Adopcion"
        verbose_name_plural = "Adopciones"

    def __str__(self):
        return f"{self.animal} en estado {self.get_estado_display()} de adopción por {self.adoptante}"
