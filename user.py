from flask import jsonify, request
from firebase_admin import db
from firebase_admin import auth


def getAllUsers():
    try:
        ref = db.reference('/users/')
        users = ref.get()
        return jsonify(users), 200
    except Exception as e:
        return (("Internal Server Error"), 500)


def addUser():
    try:
        user = request.get_json()
        email = user['email']
        password = user['password']
        name = user['name']
        phone = '+91'+user['contact']
        data = auth.create_user(
            email=email, password=password, phone_number=phone, display_name=name, email_verified=True,)
        user1 = auth.get_user_by_email(email)
        ref = db.reference('/users/')
        ref.push(user)
        return "Success", 200
    except Exception as e:
        return (str(e)), 500


def getByIdUser(n):
    try:
        ref = db.reference('/users/'+n)
        user = ref.get()
        return jsonify(user), 200
    except Exception as e:
        return ("Internal Server error", 500)


def updateUser(n):
    try:
        ref = db.reference('/users/')
        user = request.get_json()
        return jsonify(user), 200
    except Exception as e:
        return "Internal Server Error:", 500


def deleteUser(n):
    try:
        ref = db.reference('/users/')
        deletedUser = ref.child(n).delete()
        return jsonify(deletedUser), 200
    except Exception as e:
        return "Internal Error:", 500
