from django.urls import path
from base.views import order_views as views


urlpatterns = [
    #because the defualt route is api/orders and we want to use same route we will leave the route as below
    path('', views.getOrders, name='orders'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='orders-add'),

    path('<str:pk>/delivered/', views.updateOrderToDelivered, name='delivered-order'),
    path('<str:pk>/', views.getOrderById, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]