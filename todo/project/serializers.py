from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer

from project.models import TODO, Project
from users.serializers import UserModelSerializer


class ProjectModelSerializer(HyperlinkedModelSerializer):
    # users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = ['name', 'rep_url', 'users']


class TodoModelSerializer(HyperlinkedModelSerializer):
    # from_user = serializers.StringRelatedField()

    class Meta:
        model = TODO
        fields = ['text', 'project', 'from_user', 'is_active', 'created_at', 'updated_at', 'url']
