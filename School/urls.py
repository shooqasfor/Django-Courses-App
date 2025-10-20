from django.contrib import admin
from django.urls import path
from Courses.views import Welcome_View, Courses_Info, welcome_text

urlpatterns = [
    path('admin/', admin.site.urls),
    path('welcome-text/', welcome_text, name='welcome_text'),
    path('', Welcome_View, name='welcome'),
    path('welcome/', Welcome_View, name='welcome_page'),
    path('courses/', Courses_Info, name='courses_info'),
]

