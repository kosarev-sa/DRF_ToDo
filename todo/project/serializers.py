from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from project.models import TODO, Project
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    # users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'rep_url', 'users']


class TodoModelSerializer(ModelSerializer):
    # from_user = serializers.StringRelatedField()
    # project = ProjectModelSerializer()

    class Meta:
        model = TODO
        fields = ['id', 'text', 'project', 'from_user', 'is_active', 'created_at', 'updated_at', 'url']
