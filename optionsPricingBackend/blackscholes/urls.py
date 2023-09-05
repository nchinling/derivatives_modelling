from django.urls import path
from . import views

urlpatterns = [
    path("", views.process_black_scholes, name='process_black_scholes'),
]
