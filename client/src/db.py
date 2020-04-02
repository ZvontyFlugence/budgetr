from pymongo import MongoClient
from mongoengine import *
import unittest

from user import User
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string


class db:

    URI = 'mongodb+srv://budgetr:budgetr@cluster0-eibsf.mongodb.net/test?retryWrites=true&w=majority'
    client = MongoClient(URI)
    userdb = client["userdatabase"]
    users = userdb.users

    def createUser(self, data):
        self.users.insert_one(data)

    def findUser(self, query):
        return self.users.find_one(query)

    def updateUser(self, userQuery, updates):
        user = self.findUser(userQuery)
        user.update_one(updates)

    def createDBUser(user):
        testuser = {
            "Username": user.getUserName(),
            "Email": user.getUserEmail(),
            "Password": user.getPassword(),
            "ReportLink": user.getReportLink(),
            "Categories": user.getUserCategories(),
            "Income": user.getIncome(),
            "Savings": user.getSavings(),
            "TotalExpenses": user.getUserTotalExpenses(),
            "TotalIncome": user.getUserTotalIncome(),
            "TotalSavings": user.getUserTotalSavings()
        }

    check = createUser(userdb, createDBUser())
        ##print(findUser(userdb, testuser));






