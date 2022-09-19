from ast import Try
from dataclasses import fields
import email
from unittest.util import _MAX_LENGTH
from xml.dom import ValidationErr
from rest_framework import serializers
from .models import MyUser, Contact
from django.utils.encoding import smart_str,force_bytes,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .utils import Util
'''class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id','stuname','email']'''
class UserRegisterationSerial(serializers.ModelSerializer):
    password2=serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model=MyUser
        fields=['email','name','phone','password','password2','tc']
        extra_kwargs={
            'password':{'write_only':True}
        }
    def validate(self,attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        email=attrs.get('email')
        
        if password!=password2:
            raise serializers.ValidationError("password and Confirm password Does not match")
        body='Account has been created Successfully Team MFW'
        data={'subject':'Reset Password Link via MFW','body':body,'to_email':email}
        Util.sendEmail(data)
        return attrs
    def create(self,validate_data):
        
        return MyUser.objects.create_user(**validate_data)
class ContactSerial(serializers.ModelSerializer):
    class Meta:
        model=Contact
        fields=['name','email','phone','address','city','state','desc']

class UserLoginSerial(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        model=MyUser
        fields=['email','password']
class UserProfileSerial(serializers.ModelSerializer):
    class Meta:
        model=MyUser
        fields=['id','email','name','password']
class ChangePasswordSeial(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True) 
      
    class Meta:
        model=MyUser
        fields=['password','password2']
    def validate(self,attrs):
        password=attrs.get('password')
        password2=attrs.get('password2')
        user=self.context.get('user') 
        if password!=password2:
            raise serializers.ValidationError("password and Confirm password Does not match")
        user.set_password(password)
        user.save()
        return attrs
class SendPasswordResetMailSerial(serializers.Serializer):
    email=serializers.EmailField(max_length=255)
    class Meta:
        fields=['email']
    def validate(self, attrs):
        email=attrs.get('email')
        if MyUser.objects.filter(email=email).exists():
            user=MyUser.objects.get(email=email)
            uid=urlsafe_base64_encode(force_bytes(user.id))
            token=PasswordResetTokenGenerator().make_token(user)
            link='http://localhost:3000/reset-password/'+uid+'/'+token
            print(link)
            body='Click Following Link to reset Password : '+link
            data={'subject':'Reset Password Link via MFW','body':body,'to_email':user.email}
            Util.sendEmail(data)


            return attrs
        else:
            raise serializers.ValidationError('You are not registered User')

class UserPasswordResetSerial(serializers.Serializer):
    password=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True)
    password2=serializers.CharField(max_length=255,style={'input_type':'password'},write_only=True) 
      
    class Meta:
        model=MyUser
        fields=['password','password2']
    def validate(self,attrs):
       try:
        password=attrs.get('password')
        password2=attrs.get('password2')
        uid=self.context.get('uid') 
        token=self.context.get('token') 
        if password!=password2:
            raise serializers.ValidationError("password and Confirm password Does not match")
        id = urlsafe_base64_decode(uid)
        user=MyUser.objects.get(id=id)
        #use_email=MyUser.objects.get(email=email)
        if not PasswordResetTokenGenerator().check_token(user,token):
            raise ValidationErr('Token is not Valid or Expired')
        user.set_password(password)
        user.save()
        
        return attrs
       except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user,token)
            raise ValidationErr('Token is not Valid or Expired')

            

