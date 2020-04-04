import bcrypt
import jwt
import datetime
import json
from bson.json_util import dumps
from db import Database


class AuthSystem():
    # __tablename__ = "users"

    # id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # email = db.Column(db.String(255), unique=True, nullable=False)
    # password = db.Column(db.String(255), nullable=False)
    # registered_on = db.Column(db.DateTime, nullable=True)
    # admin = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, email, password, admin=False):
        self.db = Database()
        self.email = email
        self.password = bytes(password, encoding='utf-8')
        self.registered_on = datetime.datetime.now()
        self.admin = admin

    def login(self):
        query = {"email": self.email}
        user = self.db.findUser(query)
        if user:
            if bcrypt.checkpw(self.password, user.password):
                return self.encode_auth_token(user._id)
            else:
                return {"error": "Invalid Credentials!"}
        else:
            return {"error": "No Account Found!"}

    def register(self, username):
        data = {
            "username": username,
            "email": self.email,
            "hashedpw": bcrypt.hashpw(self.password, bcrypt.gensalt())
        }
        inserted_id = self.db.createUser(data)
        if inserted_id is not None:
            user = self.db.findUser({"_id": inserted_id})
            user_json = dumps(user)
            return self.encode_auth_token(user_json)
        else:
            return {"error": "Registration Failed!"}

    def encode_auth_token(self, user_json):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
                'iat': datetime.datetime.utcnow(),
                'sub': user_json
            }
            return jwt.encode(
                payload,
                'BUDGETR_SECRET_KEY',
                algorithm='HS256'
            )
        except Exception as e:
            return {"error": str(e)}

    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, 'BUDGETR_SECRET_KEY')
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'
