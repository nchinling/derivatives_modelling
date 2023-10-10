from django.urls import path
from . import views

urlpatterns = [
    path("", views.process_intrinsic_value, name='process_intrinsic_value'),
]
