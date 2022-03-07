from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import auth
from flask_cors import CORS
from flask import Flask
import user
import product
import session
try:
    app = Flask(__name__)
    cors = CORS(app)
    cred = credentials.Certificate(
        'ecommerce-96643-firebase-adminsdk-jtrqt-3b3d63264d.json')
    default_app = firebase_admin.initialize_app(cred, {
        'databaseURL': "https://ecommerce-96643-default-rtdb.firebaseio.com/"
    })

# -----Server created for user users from here------
    @app.get("/users")
    def getAllUsers():
        return user.getAllUsers()

    @app.post("/user")
    def addUser():
        return user.addUser()

    @app.get("/user/<n>")
    def getByIdUser(n):
        return user.getByIdUser(n)

    @app.put("/user/<n>")
    def updateUser(n):
        return user.updateUser(n)

    @app.delete("/user/<n>")
    def deleteUser(n):
        return user.deleteUser(n)

# --------------------seesion-------------

    @app.post('/token')
    def getToken():
        return session.getToken()

    @app.get('/session')
    def getSession():
        return session.getSessionCookies()

# -----Server created for user products------
    @app.get("/products")
    def getAllProducts():
        return product.getAllProducts()

    @app.post("/product")
    def addProduct():
        return product.addProduct()

    @app.get("/product/<n>")
    def getByIdProduct(n):
        return product.getByIdProduct(n)

    @app.put("/product/<n>")
    def updateProduct(n):
        return product.updateProduct(n)

    @app.delete("/product/<n>")
    def deleteProduct(n):
        return product.deleteProduct(n)

except Exception as e:
    print("Error :", str(e))
