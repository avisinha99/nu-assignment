"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core import views

router = routers.DefaultRouter()
# router.register(r'equity', views.EquityView, 'equity')
# router.register(r'daily_returns', views.DailyReturnsView, 'daily_returns')
# router.register(r'equity/', views.DailyReturnsView, 'equity_detail')
# router.register(r'daily_returns/(?P<equity_id>\d+)/$',
#                 views.DailyReturnsForEquityView, 'daily_returns_id')

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include(router.urls)),
    path('api/equity/', views.EquityView.as_view()),
    path('api/equity/<int:equity_id>/', views.EquityDetailView.as_view()),
    path('api/daily_returns/',
         views.DailyReturnsView.as_view()),
    path('api/daily_returns/<int:equity_id>/',
         views.DailyReturnsForEquityView.as_view()),
]
