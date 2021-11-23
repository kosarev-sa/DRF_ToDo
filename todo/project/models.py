from django.db import models
from django.utils import timezone

from users.models import User

# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=32)
    rep_url = models.URLField()
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class TODO(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    from_user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_active = models.BooleanField()

    def __str__(self):
        return self.text
