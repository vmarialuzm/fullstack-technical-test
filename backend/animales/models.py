from django.db import models

class Animales(models.Model):
    TIPOS_ANIMAL = [("1", "Perro"), ("2", "Gato")]
    ESTADOS_ANIMAL = [("1", "Adoptado"), ("2", "En adopción"), ("3", "En espera de adopción")]

    nombre = models.CharField(max_length=50)
    edad = models.IntegerField()
    raza = models.CharField(max_length=50)
    tipo = models.CharField(max_length=1, choices=TIPOS_ANIMAL, default="1")
    estado = models.CharField(max_length=1, choices=ESTADOS_ANIMAL, default="3")

    class Meta:
        verbose_name = "Animal"
        verbose_name_plural = "Animales"

    def __str__(self):
        return f"{self.get_tipo_display()} llamado {self.nombre} {self.get_estado_display()}"