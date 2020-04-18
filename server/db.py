from pymongo import MongoClient
# from mongoengine import *
# import unittest

# from user import User
# pprint library is used to make the output look more pretty
# from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >>
# to reflect your own connection string


class Database:
    URI = 'mongodb+srv://budgetrAdmin:budgetrpass@budgetrdbcluster-agyaz.mongodb.net/test'
    client = MongoClient(URI)
    userdb = client["test"]
    users = userdb.users

    def createUser(self, data):
        # Replace with User class and use __dict__ function to send to mongo
        user = {
            "_id": self.users.estimated_document_count() + 1,
            "username": data["username"],
            "email": data["email"],
            "password": data["hashedpw"],
            "reportLink": "",
            "categories": [],
            "income": [],
            "savings": [],
            "totalExpenses": 0.00,
            "totalIncome": 0.00,
            "totalSavings": 0.00
        }
        insert_result = self.users.insert_one(user)
        if insert_result.acknowledged:
            return insert_result.inserted_id
        else:
            return None

    def findUser(self, query):
        return self.users.find_one(query)

    def updateUser(self, userQuery, updates):
        result = self.users.update_one(userQuery, {"$set": updates})
        return result.modified_count == 1
