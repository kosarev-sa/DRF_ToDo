from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

# Create your views here.
from project.filters import ProjectFilter, TodoFilter
from project.models import Project, TODO
from project.serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    # renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectLimitOffsetPagination
    # filterset_class = ProjectFilter


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class TodoModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TodoModelSerializer
    # pagination_class = TodoLimitOffsetPagination
    # filterset_fields = ['project']
    # filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()

        if todo.is_active == True:
            todo.is_active = False
            todo.save()

        return Response(status=status.HTTP_202_ACCEPTED)
