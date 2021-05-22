from django.contrib import admin
from .models import SubscribedUser


class SubscribedUserAdmin(admin.ModelAdmin):
    list = ('user_email')


admin.site.register(SubscribedUser, SubscribedUserAdmin)

