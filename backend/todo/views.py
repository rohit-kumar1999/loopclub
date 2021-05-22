from .serializers import SubscribedUserSerializer
from rest_framework import viewsets
from .models import SubscribedUser
from rest_framework.views import APIView
from rest_framework.response import Response


class TodoView(viewsets.ModelViewSet):
    serializer_class = SubscribedUserSerializer
    queryset = SubscribedUser.objects.all()


class ListAllUsers(APIView):
    def get(self, request, *args, **kwargs):
        user_list = SubscribedUser.objects.all().values()
        return Response({"users": list(user_list)})


class SaveUserEmail(APIView):
    def post(self, request, *arg, **kwargs):
        new_res = request.data
        user_email = SubscribedUser.objects.filter(user_email=new_res['user_email'])
        if not user_email:
            new_user = SubscribedUser.objects.create(
                user_email=new_res['user_email']
            )
            return Response({'user_list': new_res['user_email']})
        else:
            new_res = False
            return Response({'user_list': new_res})
