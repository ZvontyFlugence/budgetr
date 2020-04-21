from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from authsystem import AuthSystem
from db import Database
from user import User
from category import Category
from income import Income
from expense import Expense

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
    return make_response(jsonify(payload), payload["status_code"])

@app.route("/register", methods=["POST"])
def register():
    credentials = request.json
    auth_system = AuthSystem(credentials["email"], credentials["password"])
    payload = auth_system.register(credentials["username"])
    return make_response(jsonify(payload), payload["status_code"])

@app.route("/user")
def get_user():
    token = request.headers.get('Authorization')
    if token is None:
        return make_response(jsonify({"error": "No Auth Token"}), 400)
    else:
        db = Database()
        user_id = AuthSystem.validate_token(token)
        query = {"_id": user_id}
        user = db.findUser(query)
        if user:
            try:
                del user['password']
            except KeyError:
                return make_response(jsonify({"error": "Internal Server Error"}), 500)
            return make_response(jsonify({"user": user}), 200)
        else:
            return make_response(jsonify({"error": "User Not Found!"}), 404)

@app.route("/create-category", methods=["POST"])
def create_category():
    token = request.headers.get('Authorization')
    if token is None:
        return make_response(jsonify({"success": False, "error": "No Auth Token"}), 400)
    else:
        db = Database()
        user_id = AuthSystem.validate_token(token)
        query = {"_id": user_id}
        user = db.findUser(query)
        if user:
            category = request.json
            user = User.from_dict(user)
            user.addCategory(Category(category["name"], category["limit"]))
            updates = {"categories": user.as_dict()["categories"]}
            did_update = db.updateUser(query, updates)
            if did_update:
                return make_response(jsonify({"success": True}), 201)
            else:
                return make_response(jsonify({"success": False, "error": "Failed to update User!"}), 304)
        else:
            return make_response(jsonify({"success": False, "error": "User not found!"}), 404)

@app.route("/add-income", methods=["POST"])
def add_income():
    token = request.headers.get('Authorization')
    if token is None:
        return make_response(jsonify({"success": False, "error": "No Auth Token"}), 400)
    else:
        db = Database()
        user_id = AuthSystem.validate_token(token)
        query = {"_id": user_id}
        user = db.findUser(query)
        if user:
            income = request.json
            user = User.from_dict(user)
            user.addIncome(Income(income["name"], income["amount"], income["date"]))
            user_dict = user.as_dict()
            updates = {}
            if income["isSavings"] is not True:
                updates = {"income": user_dict["income"], "totalIncome": user_dict["totalIncome"]}
            else:
                updates = {"savings": user_dict["savings"], "totalSavings": user_dict["totalSavings"]}
            did_update = db.updateUser(query, updates)
            if did_update:
                return make_response(jsonify({"success": True}), 201)
            else:
                return make_response(jsonify({"success": False, "error": "Failed to update User!"}), 304)
        else:
            return make_response(jsonify({"success": False, "error": "User not found!"}), 404)

@app.route("/add-expense", methods=["POST"])
def add_expense():
    token = request.headers.get('Authorization')
    if token is None:
        return make_response(jsonify({"success": False, "error": "No Auth Token"}), 400)
    else:
        db = Database()
        user_id = AuthSystem.validate_token(token)
        query = {"_id": user_id}
        user = db.findUser(query)
        if user:
            expense = request.json
            user = User.from_dict(user)
            for category in user.getUserCategories():
                if category.name == expense["expenseCategory"]:
                    category.addExpense(Expense(expense["item"], expense["amount"], expense["date"], expense["expenseCategory"]))
                    user.updateTotalExpenses(expense["amount"])
                    break
            user_dict = user.as_dict()
            updates = {"categories": user_dict["categories"], "totalExpenses": user_dict["totalExpenses"]}
            did_update = db.updateUser(query, updates)
            if did_update:
                return make_response(jsonify({"success": True}), 201)
            else:
                return make_response(jsonify({"success": False, "error": "Failed to update User!"}), 304)
        else:
            return make_response(jsonify({"success": False, "error": "User not found!"}), 404)
