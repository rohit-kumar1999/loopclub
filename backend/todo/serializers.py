from rest_framework import serializers
from .models import SubscribedUser


class SubscribedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscribedUser
        fields = ('id', 'user_email')