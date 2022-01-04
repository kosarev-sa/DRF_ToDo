import graphene
from graphene_django import DjangoObjectType

from users.models import User
from project.models import TODO, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = "__all__"


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    todo_by_project_name = graphene.List(TodoType, name=graphene.String(required=False))

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return TODO.objects.all()

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    def resolve_todo_by_project_name(root, info, name=None):
        todos = TODO.objects.all()
        if name:
            todos = todos.filter(project__name=name)
        return todos


class TodoUpdateMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        id = graphene.ID()

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(self, root, info, text, id):
        todo = TODO.objects.get(id=id)
        todo.text = text
        todo.save()
        return TodoUpdateMutation(todo=todo)


class TodoCreateMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        project_name = graphene.String(required=True)
        from_user_id = graphene.Int(required=True)
        is_active = graphene.Boolean(required=True)

    todo = graphene.Field(TodoType)

    @classmethod
    def mutate(self, root, info, text, project_name, from_user_id, is_active):
        project = Project.objects.get(name=project_name)
        from_user = User.objects.get(id=from_user_id)
        todo = TODO.objects.create(text=text, project=project, from_user=from_user, is_active=is_active)
        return TodoCreateMutation(todo=todo)


class TodoDeleteMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    todo = graphene.List(TodoType)

    @classmethod
    def mutate(self, root, info, id):
        TODO.objects.get(id=id).delete()
        todo = TODO.objects.all()
        return TodoDeleteMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TodoUpdateMutation.Field()
    create_todo = TodoCreateMutation.Field()
    delete_todo = TodoDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
