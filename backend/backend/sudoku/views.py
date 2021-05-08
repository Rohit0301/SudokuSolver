from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from rest_framework.decorators import api_view
import random
# Create your views here.
sudokuboard=None
@api_view(['POST'])
def SolveMySudoku(request):
    stringsudokuboard=None
    
    if request.method=="POST":
        stringsudokuboard=request.data['sudoku']
        sudokuboard=generatesudoku(stringsudokuboard)
        if(VerifyUtil(sudokuboard)==False):
            return HttpResponse("invalid")
        if (solveSuduko(sudokuboard, 0, 0)):   
              return HttpResponse(sudokuboard)
        else:
            return HttpResponse("invalid")      

@api_view(['POST'])
def GenerateNewSudoku(request):
	if request.method=="POST":
		difficulty=request.data['difficulty']
		tempboard= [[0 for i in range(9)] for j in range(9)]
		a=[1,2,3,4,5,6,7,8,9]
		for i in range(9):
			number=a[i]
			row=random.randrange(0,8)
			col=random.randrange(0,8)
			while(tempboard[row][col]!=0):
				row=random.randrange(0,8)
				col=random.randrange(0,8)
		tempboard[row][col]=number
		sudokuboard=tempboard
		solveSuduko(sudokuboard,0,0)
		rem=0
		if(difficulty==1):
			rem=35
		elif(difficulty==2):
			rem=45
		else:
			rem=55		
		board=GenerateUtil(sudokuboard,rem)
		return HttpResponse(board)

@api_view(['POST'])
def VerifySudoku(request):
	stringsudokuboard=request.data['sudokuboard']
	sudokuboard=generatesudoku(stringsudokuboard)
	if(VerifyUtil(sudokuboard)==False):
		return HttpResponse('Invalid Board !')
	return HttpResponse('Correct Board !')			

def VerifyUtil(sudokuboard):
	for i in range(9):
		for j in range(9):
			if(isSafeGrid(sudokuboard,i,j,sudokuboard[i][j])==False):
				return False
	return True	

def isSafeGrid(grid, row, col, num):
	if(num==0):
		return True
	for x in range(9):
		if x!=col and grid[row][x]== num:
			return False

	for x in range(9):
		if x!=row and grid[x][col] == num:
			return False

	startRow = row - row % 3
	startCol = col - col % 3
	for i in range(3):
		for j in range(3):
			if i+startRow!=row and j+startCol!=col and grid[i + startRow][j + startCol] == num:
				return False
	return True



def GenerateUtil(sudokuboard,rem):
	for i in range(rem):
		row=random.randrange(0,9)
		col=random.randrange(0,9)
		while(sudokuboard[row][col]==0):
			row=random.randrange(0,9)
			col=random.randrange(0,9)
		sudokuboard[row][col]=0
	return sudokuboard			





def generatesudoku(s):
    sudokuboard= [[0 for i in range(9)] for j in range(9)]
    k=0
    for i in range(9):
        for j in range(9):
            sudokuboard[i][j]=int(s[k])
            k+=1
    return sudokuboard


N = 9

def isSafe(grid, row, col, num):
	if(num==0):
		return True
	for x in range(9):
		if grid[row][x] == num:
			return False

	for x in range(9):
		if grid[x][col] == num:
			return False

	startRow = row - row % 3
	startCol = col - col % 3
	for i in range(3):
		for j in range(3):
			if grid[i + startRow][j + startCol] == num:
				return False
	return True


def solveSuduko(grid, row, col):


	if (row == N - 1 and col == N):
		return True

	if col == N:
		row += 1
		col = 0
	if grid[row][col] > 0:
		return solveSuduko(grid, row, col + 1)
	for num in range(1, N + 1, 1):
		if isSafe(grid, row, col, num):
			grid[row][col] = num

			if solveSuduko(grid, row, col + 1):
				return True

		grid[row][col] = 0
	return False




