from django.http import HttpResponse
from django.shortcuts import render
from .models import Course

def welcome_text(request):
    return HttpResponse("Welcome to Courses App")

def Welcome_View(request):
    name = request.GET.get('name', 'Student')
    return render(request, 'Courses/base.html', {'name': name})

def Courses_Info(request):
    courses = Course.objects.all().order_by('course_number')
    return render(request, 'Courses/courses_info.html', {'courses': courses})
