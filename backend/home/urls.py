
from django.urls import path
from . import views

# add path to view and renderring
urlpatterns = [
#    path('get-quiz/', views.get_quiz, name='get_quiz'),
    path('', views.home, name='home'),
    path('quiz/', views.quiz, name='quiz'),
    path('get_categories', views.get_categories, name='get_categories'),
    path('get_quiz', views.get_quiz, name='get_quiz'),
]
