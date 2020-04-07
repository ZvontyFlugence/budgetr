from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from authsystem import AuthSystem
# from db import db

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "Welcome to the Budgetr API!"


@app.route("/auth", methods=["POST"])
def auth():
    credentials = request.json
    auth_system = AuthSystem(credentials["email"], credentials["password"])
    payload = auth_system.login()
    return make_response(jsonify(payload), 200)


@app.route("/register", methods=["POST"])
def register():
    credentials = request.json
    auth_system = AuthSystem(credentials["email"], credentials["password"])
    token = auth_system.register(credentials["username"])
    return make_response(jsonify(payload), 200)
