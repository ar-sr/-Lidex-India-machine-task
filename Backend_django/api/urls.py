# api/urls.py

from django.urls import path
from api import views

urlpatterns = [
    path('',views.index,name='index'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
]
