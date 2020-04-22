from pymongo import MongoClient
# from mongoengine import *
# import unittest
from user import User


class Database:
    URI = 'mongodb+srv://budgetrAdmin:budgetrpass@budgetrdbcluster-agyaz.mongodb.net/test'
    client = MongoClient(URI)
    userdb = client["test"]
    users = userdb.users

    def createUser(self, data):
        next_id = self.users.estimated_document_count() + 1
        user = User(next_id, data["username"], data["email"], data["hashedpw"])
        insert_result = self.users.insert_one(user.as_dict())
        if insert_result.acknowledged:
            return insert_result.inserted_id
        else:
            return None

    def findUser(self, query):
        return self.users.find_one(query)

    def updateUser(self, userQuery, updates):
        result = self.users.update_one(userQuery, {"$set": updates})
        return result.modified_count == 1
