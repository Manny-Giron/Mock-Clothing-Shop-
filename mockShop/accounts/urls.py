from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


from .views import RegisterView, CustomTokenObtainPairView, LogoutView

urlpatterns = [
    # registration endpoint
    path('register/', RegisterView.as_view(), name='register'),
    # login + JWT endpoint
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('logout/', LogoutView.as_view(), name='logout'),

]
