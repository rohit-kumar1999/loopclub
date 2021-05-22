from django.urls import path

from . import views

urlpatterns = [
    path('save-user-email/', views.SaveUserEmail.as_view(), name='save_user_email'),
    path('list-users/', views.ListAllUsers.as_view(), name='list_users'),
]
