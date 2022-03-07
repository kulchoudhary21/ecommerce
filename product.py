from flask import jsonify, request
from firebase_admin import db


def getAllProducts():
    try:
        ref = db.reference('/products/')
        products = ref.get()
        return jsonify(products), 200
    except Exception as e:
        return (("Internal Server Error"), 500)


def addProduct():
    try:
        ref = db.reference('/products/')
        product = request.get_json()
        ref.push(product)
        return "Success", 200
    except Exception as e:
        return (("Internal Server error "), 500)


def getByIdProduct(n):
    try:
        ref = db.reference('/products/'+n)
        product = ref.get()
        return jsonify(product), 200
    except Exception as e:
        return ("Internal Server error", 500)


def updateProduct(n):
    try:
        ref = db.reference('/products/')
        product = request.get_json()
        return jsonify(product), 200
    except Exception as e:
        return "Internal Server Error:", 500


def deleteProduct(n):
    try:
        ref = db.reference('/products/')
        deletedProduct = ref.child(n).delete()
        return jsonify(deletedProduct), 200
    except Exception as e:
        return "Internal Error:", 500
