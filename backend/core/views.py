from rest_framework import viewsets
from django.core.paginator import Paginator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from .serializers import EquitySerializer, DailyReturnsSerializer
from .models import Equity, DailyReturns

# Create your views here.


class EquityView(generics.ListAPIView):
    serializer_class = EquitySerializer
    queryset = Equity.objects.all()


class DailyReturnsView(generics.ListAPIView):
    serializer_class = DailyReturnsSerializer
    queryset = DailyReturns.objects.order_by("date")[:200]


class EquityDetailView(generics.ListAPIView):
    def get_object(self, equity_id):
        '''
        Helper method to get the object with given equity_id
        '''
        try:
            return Equity.objects.get(id=equity_id)
        except Equity.DoesNotExist:
            return None

    def get(self, request, equity_id, *args, **kwargs):
        '''
        Retrieves the Equitsy with given todo_id
        '''
        equity_instance = self.get_object(equity_id)
        if not equity_instance:
            return Response(
                {"res": "Object with equity id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = EquitySerializer(equity_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DailyReturnsForEquityView(generics.ListAPIView):
    serializer_class = DailyReturnsSerializer

    def get_queryset(self):
        return DailyReturns.objects.filter(equity_id=self.kwargs['equity_id']).order_by("date")[:200]

    def get_objects(self, equity_id):
        try:
            return DailyReturns.objects.filter(equity_id=equity_id).order_by("date")[:200]
        except DailyReturns.DoesNotExist:
            return None

    def get(self, request, equity_id, *args, **kwargs):
        equity_instance = self.get_objects(equity_id)
        if not equity_instance:
            return Response(
                {"res": "Object with equity id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = DailyReturnsSerializer(equity_instance, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
