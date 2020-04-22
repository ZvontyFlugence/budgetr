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


@app.route("/edit-category", methods=["POST"])
def edit_category():
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
            for i in range(0, len(user.categories)):
                if user.categories[i].getName() == category['oldName']:
                    user.categories[i].setName(category['name'])
                    user.categories[i].setLimit(category['limit'])
                    break
            user_dict = user.as_dict()
            updates = {'categories': user_dict['categories']}
            did_update = db.updateUser(query, updates)
            if did_update:
                return make_response(jsonify({'success': True}), 200)
            else:
                return make_response(jsonify({'success': False, 'error': 'Failed to update User!'}), 304)
        else:
            return make_response(jsonify({"success": False, "error": "User not found!"}), 404)

@app.route("/edit-expense", methods=["POST"])
def edit_expense():
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

            if expense['oldCat'] != expense['expenseCategory']:
                for i in range(0, len(user.categories)):
                    if user.categories[i].getName() == expense['oldCat']:
                        user.categories[i].removeExpense(expense)
                        break
                for i in range(0, len(user.categories)):
                    if user.categories[i].getName() == expense['expenseCategory']:
                        user.categories[i].addExpense(Expense(expense['item'], expense['amount'], expense['date'], expense['expenseCategory']))
                        break
            else:
                for i in range(0, len(user.categories)):
                    if user.categories[i].getName() == expense['expenseCategory']:
                        for j in range(0, len(user.categories[i].expenses)):
                            if user.categories[i].expenses[j].getItem() == expense['oldItem']:
                                user.categories[i].expenses[j].setItem(expense['item'])
                                user.categories[i].expenses[j].setAmount(expense['amount'])
                                user.categories[i].expenses[j].setDate(expense['date'])
                                user.categories[i].expenses[j].setExpenseCategory(expense['expenseCategory'])
                                break
                        break
            user_dict = user.as_dict()
            updates = {'categories': user_dict['categories']}
            did_update = db.updateUser(query, updates)
            if did_update:
                return make_response(jsonify({'success': True}), 200)
            else:
                return make_response(jsonify({'success': False, 'error': 'Failed to update User!'}), 304)
        else:
            return make_response(jsonify({"success": False, "error": "User not found!"}), 404)


@app.route("/delete-category", methods=["DELETE"])
def delete_category():
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
            misc_index = -1
            cat_index = -1
            categories = user.getUserCategories()
            for i in range(0, len(categories)):
                if categories[i].getName() == "Miscellaneous":
                    misc_index = i
                elif categories[i].getName() == category["name"]:
                    cat_index = i

                if misc_index != -1 and cat_index != -1:
                    break

            for expense in categories[cat_index].getExpenses():
                expense.setExpenseCategory('Miscellaneous')
                categories[misc_index].addExpense(expense)
            user.removeCategory(cat_index)
            user_dict = user.as_dict()
            updates = {"categories": user_dict["categories"]}
            did_update = db.updateUser(query, updates)
            if did_update:
                return make_response(jsonify({"success": True}), 200)
            else:
                return make_response(jsonify({"success": False, "error": "Failed to update User!"}), 304)
        else:
            return make_response(jsonify({"success": False, "error": "User not found!"}), 404)


@app.route("/delete-expense", methods=["DELETE"])
def delete_expense():
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
            categories = user.getUserCategories()
            for category in categories:
                if category.getName() == expense["expenseCategory"]:
                    category.removeExpense(expense)
                    break
            user.updateTotalExpenses(0 - expense["amount"])
            user_dict = user.as_dict()
            updates = {"categories": user_dict["categories"], "totalExpenses": user_dict["totalExpenses"]}
            did_update = db.updateUser(query, updates)
            if did_update:
                return make_response(jsonify({"success": True}), 200)
            else:
                return make_response(jsonify({"success": False, "error": "Failed to update User!"}), 304)
        else:
            return make_response(jsonify({"success": False, "error": "User not found!"}), 404)
