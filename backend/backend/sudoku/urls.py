from django.contrib import admin
from django.urls import path
from .views import SolveMySudoku,GenerateNewSudoku,VerifySudoku
urlpatterns = [
    path('solvemysudoku/',SolveMySudoku,name="SolveMySudoku"),
    path('generatesudoku/',GenerateNewSudoku,name="generatesudoku"),
    path('verifysudoku/',VerifySudoku,name="VerifySudoku"),
]