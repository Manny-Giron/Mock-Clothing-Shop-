from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        login_input = attrs.get("username")
        password = attrs.get("password")

        try:
            user = User.objects.filter(username=login_input).first()
            if not user:
                user = User.objects.get(email=login_input)
            attrs["username"] = user.username

        except User.DoesNotExist:
            raise AuthenticationFailed("Invalid username/email or password.")

        return super().validate(attrs)

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        
    def validate_Email(self, value):
        if (User.objects.filter(email=value).exists()):
            raise serializers.ValidationError("Email already exists")
        else:
            return value
    def validate_Username(self, value):
        if (User.objects.filter(username=value).exists()):
            raise serializers.ValidationError("Username already exists")
        else:
            return value
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user
        
