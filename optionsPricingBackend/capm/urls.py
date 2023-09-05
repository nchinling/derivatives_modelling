from django.urls import path
from . import views

urlpatterns = [
    path("", views.process_capm, name='process_capm'),
]
