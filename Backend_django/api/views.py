from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from db_connection import db

@csrf_exempt
def index(request):
    return HttpResponse('<h1>working</h1>')

def signup(request):
    print("Signup request received")
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Data received:", data)
            username = data.get('UserName')
            email = data.get('Email')
            password = data.get('Password')
            is_supervisor = data.get('IsSupervisor', False)
            employee_code = data.get('EmployeeCode')

            existing_user = db['users'].find_one({"email": email})
            if existing_user:
                return JsonResponse({"result": False, "message": "Email already registered."}, status=400)

            user = {
                "username": username,
                "email": email,
                "password": password,  # For production, hash this!
                "is_supervisor": is_supervisor,
                "employee_code": employee_code
            }
            db['users'].insert_one(user)
            print("User inserted into MongoDB")
            return JsonResponse({"result": True, "message": "Signup success!"})

        except Exception as e:
            print("Error:", e)
            return JsonResponse({"result": False, "message": str(e)}, status=500)

    return JsonResponse({"result": False, "message": "Invalid request method."}, status=405)

@csrf_exempt
def login(request):
    print("Login request received")
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Data received:", data)
            email = data.get('EmailId')
            password = data.get('Password')

            user = db['users'].find_one({"email": email, "password": password})
            if user:
                print("User authenticated")
                return JsonResponse({"result": True, "message": "Login success!"})
            else:
                return JsonResponse({"result": False, "message": "Invalid email or password."}, status=401)

        except Exception as e:
            print("Error:", e)
            return JsonResponse({"result": False, "message": str(e)}, status=500)

    return JsonResponse({"result": False, "message": "Invalid request method."}, status=405)
