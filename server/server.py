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
    # TODO: Return correct status code
    return make_response(jsonify(payload), 200)


@app.route("/register", methods=["POST"])
def register():
    credentials = request.json
    auth_system = AuthSystem(credentials["email"], credentials["password"])
    token = auth_system.register(credentials["username"])
    # TODO: Return correct status code
    return make_response(jsonify(token), 200)


@app.route("/create-category", methods=["POST"])
def create_category():
    # TODO: Check for token
    token = request.headers.get('Authorization')
    if token is None:
        return make_response(jsonify({"success": False, "error": "Missing Auth Token"}), 401)
    else:
        # TODO: Check that user's category doesnt already exist
        # TODO: Create Category
        user_id = AuthSystem.validate_token(token)
        print(user_id)
        return make_response(jsonify(user_id), 200)
        