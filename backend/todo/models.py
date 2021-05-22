from django.db import models


# Create your models here.
class SubscribedUser(models.Model):
    user_email = models.EmailField(null=False, blank=False, unique=True, max_length=254)

    def __str__(self):
        return self.user_email