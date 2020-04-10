import bcrypt
import jwt
import datetime
from db import Database


class AuthSystem():

    def __init__(self, email, password, admin=False):
        self.db = Database()
        self.email = email
        self.password = password.encode('ascii')
        self.registered_on = datetime.datetime.now()
        self.admin = admin

    def login(self):
        query = {"email": self.email}
        user = self.db.findUser(query)
        if user:
            if bcrypt.checkpw(self.password, user["password"].encode('ascii')):
                token = self.encode_auth_token(user)
                return token.decode('ascii')
            else:
                return {"error": "Invalid Credentials!"}
        else:
            return {"error": "No Account Found!"}

    def register(self, username):
        data = {
            "username": username,
            "email": self.email,
            "hashedpw": bcrypt.hashpw(self.password, bcrypt.gensalt()).decode('ascii')
        }
        inserted_id = self.db.createUser(data)
        if inserted_id is not None:
            user = self.db.findUser({"_id": inserted_id})
            token = self.encode_auth_token(user)
            return token.decode('ascii')
        else:
            return {"error": "Registration Failed!"}

    def encode_auth_token(self, user):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
                'iat': datetime.datetime.utcnow(),
                'sub': user["_id"]
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
