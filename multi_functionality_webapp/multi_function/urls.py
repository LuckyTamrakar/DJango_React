from django.contrib import admin
from django.urls import path
from multi_function import views


urlpatterns = [
    path('register/', views.UserRegistration.as_view()),
    path('login/', views.UserLogin.as_view()),
    path('user/', views.UserProfile.as_view()),
    path('changePassword/', views.ChangePassword.as_view()),
    path('send-reset-password-link/', views.SendPasswordResetMail.as_view()),
    path('reset-password/<uid>/<token>', views.UserPasswordReset.as_view()),
    path('contact/', views.ContactView.as_view()),
]
