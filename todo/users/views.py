from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .serializers import UserModelSerializer
from .models import User

# Create your views here.

class UserModelViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
   queryset = User.objects.all()
   serializer_class = UserModelSerializer
