from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("course_number", "course_name")
    search_fields = ("course_name",)
