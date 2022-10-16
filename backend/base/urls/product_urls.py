from django.urls import path
from base.views import product_views as views

 
urlpatterns = [  
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="create-product"),
    path('upload/', views.uploadImage, name="create-image"),
    #just like we did in react, we pass the id or primary sent from the view to the url routes into a variable called str:pk
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>', views.getProduct, name="product"),

    path('<str:pk>/reviews/', views.createProductReview, name="product-review"),
    
    path('update/<str:pk>/', views.updateProduct, name="update-product"),
    path('delete/<str:pk>/', views.deleteProduct, name="delete-product"),
]