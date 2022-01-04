import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserModelViewSet
from .models import User
from project.models import Project


class TestUserModelViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'
        self.data = {'username': 'test_user_7', 'email': '7@mail.ru',
                     'first_name': 'first_name_test_user_7', 'last_name': 'last_name_test_user_7'}
        self.data_put = {'username': 'test', 'email': 'test@mail.ru',
                         'first_name': 'test', 'last_name': 'test'}
        self.admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.data, format='json')
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post({self.url}, self.data, format='json')
        force_authenticate(request, self.admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.put(f'/api/users/{user.id}/', **self.data_put)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        client.login(username='admin', password='admin123456')
        response = client.put(f'{self.url}{user.id}/', self.data_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_updated = User.objects.get(id=user.id)
        self.assertEqual(user_updated.username, 'test')
        self.assertEqual(user_updated.email, 'test@mail.ru')
        self.assertEqual(user_updated.first_name, 'test')
        self.assertEqual(user_updated.last_name, 'test')
        client.logout()

    def tearDown(self) -> None:
        pass


class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        import math
        self.assertEqual(math.sqrt(4), 2)


class TestProjectModelViewSet(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/project/'
        self.data_user = {'username': 'test_user_7', 'email': '7@mail.ru',
                     'first_name': 'first_name_test_user_7', 'last_name': 'last_name_test_user_7'}
        self.data_project_put = {'name':'test_new', 'rep_url':'http://127.0.0.1:8000/github/test_new', 'users': [1, 2]}
        self.admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        User.objects.create(**self.data_user)
        users = User.objects.filter(email='7@mail.ru')
        project = Project.objects.create(name='test', rep_url='http://127.0.0.1:8000/github/test')
        project.users.set(users)
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'{self.url}{project.id}/', self.data_project_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project_updated = Project.objects.get(id=project.id)
        self.assertEqual(project_updated.name, 'test_new')
        self.assertEqual(project_updated.rep_url, 'http://127.0.0.1:8000/github/test_new')
        self.assertEqual([user for user in project_updated.users.all()],
                         [User.objects.filter(id='1')[0], User.objects.filter(id='2')[0]])
        self.client.logout()

    def test_edit_mixer(self):
        mixer.blend(User)
        project = mixer.blend(Project)
        project.users.set(User.objects.filter(id=2))
        # print(project.users.all())
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'{self.url}{project.id}/', self.data_project_put)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project_updated = Project.objects.get(id=project.id)
        # print(project_updated.users.all())
        self.assertEqual(project_updated.rep_url, 'http://127.0.0.1:8000/github/test_new')
        self.assertEqual([user for user in project_updated.users.all()],
                         [User.objects.filter(id='1')[0], User.objects.filter(id='2')[0]])
        self.client.logout()

    def test_get_user_detail_mixer(self):
        user = mixer.blend(User)
        response = self.client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
