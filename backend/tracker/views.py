from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Activity
from .serializer import ActivitySerializer


@api_view(["GET"])
def get_activities(request):

    activities = Activity.objects.all().order_by("-id")

    serializer = ActivitySerializer(
        activities,
        many=True
    )

    return Response(serializer.data)


@api_view(["POST"])
def add_activity(request):

    serializer = ActivitySerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "message": "Activity added successfully",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        {
            "errors": serializer.errors
        },
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["DELETE"])
def delete_activity(request, id):

    try:
        activity = Activity.objects.get(id=id)

    except Activity.DoesNotExist:

        return Response(
            {
                "error": "Activity not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    activity.delete()

    return Response(
        {
            "message": "Activity deleted successfully"
        },
        status=status.HTTP_200_OK
    )


@api_view(["GET"])
def summary(request):

    activities = Activity.objects.all()

    total_entries = activities.count()

    total_hours = sum(
        activity.hours
        for activity in activities
    )

    most_active_user = ""

    if activities.exists():

        user_hours = {}

        for activity in activities:

            if activity.name in user_hours:

                user_hours[activity.name] += activity.hours

            else:

                user_hours[activity.name] = activity.hours

        most_active_user = max(
            user_hours,
            key=user_hours.get
        )

    return Response(
        {
            "total_entries": total_entries,
            "total_hours": total_hours,
            "most_active_user": most_active_user
        }
    )