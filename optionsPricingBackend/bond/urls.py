from django.urls import path
from . import views

urlpatterns = [
    path("", views.process_bond_price, name='process_bond_price'),
]
