from django.shortcuts import render, redirect
from django.http import JsonResponse,HttpResponse
from .models import *
import random
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



@api_view(['GET'])
def home(request):
    categories = Category.objects.all()
    payload = {'categories': [category.category_name for category in categories]}
    if request.GET.get('category'):
        return redirect(f"quiz/?category={request.GET.get('category')[1::]}")
    return Response(payload, status=status.HTTP_200_OK)


@api_view(['GET'])
def quiz(request):
    category_name = request.GET.get('category', 'Django')
    questions = Question.objects.all()

    if category_name:
        questions = questions.filter(category__category_name__icontains=category_name)
    
    questions = list(questions)
    random.shuffle(questions)
    
    data = []

    for question_ in questions:
        data.append({
            "uid": question_.uuid,
            "question_text": question_.question_text,
            "options": [option.option_text for option in question_.options.all()],
            "correct_option": question_.options.filter(is_correct=True).first().option_text
        })
    
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_quiz(request):
    try:
        category_name = request.GET.get('category', 'Django')
        questions = Question.objects.all()

        if category_name:
            questions = questions.filter(category__category_name__icontains=category_name)
        
        questions = list(questions)
        random.shuffle(questions)
        
        data = []

        for question_ in questions:
            data.append({
                "uid": question_.uuid,
                "question_text": question_.question_text,
                "options": [option.option_text for option in question_.options.all()],
                "correct_option": question_.options.filter(is_correct=True).first().option_text
            })
        
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def get_categories(request):
    try:
        categories = Category.objects.all()
        data = [{"id": category.id, "category_name": category.category_name} for category in categories]
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
