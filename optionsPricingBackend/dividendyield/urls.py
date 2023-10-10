from django.urls import path
from . import views

urlpatterns = [
    path("", views.process_dividend_yield, name='process_dividend_yield'),
]
