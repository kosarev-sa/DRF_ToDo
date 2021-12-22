from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .serializers import UserModelSerializer, UserModelSerializerV2
from .models import User

# Create your views here.

class UserModelViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet):
   queryset = User.objects.all()
   serializer_class = UserModelSerializer

   def get_serializer_class(self):
      if self.request.version == 'v2':
         return UserModelSerializerV2
      return UserModelSerializer
