from Django.renders import render

def home(request):
    if request.POST:
        pass
    return render(request, 'home.html')
