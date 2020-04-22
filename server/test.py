import unittest

from user import User
from db import db
from authsystem import AuthSystem
from pymongo import MongoClient



class TestUserModel():
    URI = 'mongodb+srv://budgetr:budgetr@cluster0-eibsf.mongodb.net/test?retryWrites=true&w=majority'
    client = MongoClient(URI)
    userdb = client["userdatabase"]
    users = userdb.users
    user = {
        "ID": 1,
        "Username": "",
        "Email": "",
        "Password": "",
        "ReportLink": "",
        "Categories": [],
        "Income": [],
        "Savings": [],
        "TotalExpenses": 0,
        "TotalIncome": 0,
        "TotalSavings": 0
    }

    db.createUser(userdb, user)
    auth_token = AuthSystem.encode_auth_token(user.id)



