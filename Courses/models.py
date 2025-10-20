from django.db import models

class Course(models.Model):
    course_name = models.CharField("اسم المقرر", max_length=50)
    course_number = models.IntegerField("رمز المقرر",
        help_text="Course Number represents the Course ID.")

    def __str__(self):
        return f"{self.course_number} - {self.course_name}"
