from django.urls import path
from .views import *

urlpatterns = [
    path("activities/", get_activities),
    path("activities/add/", add_activity),
    path(
        "activities/delete/<int:id>/",
        delete_activity
    ),
    path("summary/", summary),
]