from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import User

# Register your models here.


# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     model = User


admin.site.register(User, UserAdmin)
