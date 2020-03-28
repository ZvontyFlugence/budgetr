from pymongo import MongoClient
from mongoengine import *
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string


class Database():
    URI = 'mongodb+srv://budgetr:budgetr@cluster0-eibsf.mongodb.net/test?retryWrites=true&w=majority'
    client = MongoClient(URI)
    userdb = client["userdatabase"]
    users = userdb["users"]

    Email = StringField(required=True)
    Password = StringField(required=True)
    First_name = StringField(max_length=30)
    Last_name = StringField(max_length=30)

    def createUser(self, email, password, first_name, last_name):
        newUser = {"email": email,
                   "password": password,
                   "first name": first_name,
                   "last name": last_name}

        self.users.insert_one(newUser)

    def findUser(self, email):
        query = {"email": email}
        self.users.find_one(query)

    def updateUser(self, email, password, first_name, last_name):
        user = self.findUser(email)
        newvalues = {"$set": {"password": password,
                   "first name": first_name,
                   "last name": last_name}}
        user.update_one(newvalues)


