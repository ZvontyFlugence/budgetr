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
                return {"token": f"Bearer {token.decode('ascii')}", "status_code": 200}
            else:
                return {"error": "Invalid Credentials!", "status_code": 401}
        else:
            return {"error": "No Account Found!", "status_code": 404}

    def register(self, username):
        user = self.db.findUser({"email": self.email})
        if user is None:
            data = {
                "username": username,
                "email": self.email,
                "hashedpw": bcrypt.hashpw(self.password, bcrypt.gensalt()).decode('ascii')
            }
            inserted_id = self.db.createUser(data)
            if inserted_id is not None:
                user = self.db.findUser({"_id": inserted_id})
                token = self.encode_auth_token(user)
                return {"token": f"Bearer {token.decode('ascii')}", "status_code": 201}
            else:
                return {"error": "Registration Failed!", "status_code": 400}
        else:
            return {"error": "Account Already Exists With This Email!", "status_code": 400}

    def encode_auth_token(self, user):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=3),
                'iat': datetime.datetime.utcnow(),
                'sub': user["_id"]
            }
            return jwt.encode(
                payload,
                'BUDGETR_SECRET_KEY',
                algorithm='HS256'
            )
        except Exception as e:
            print("Error Encoding Auth Token!")
            return {"error": str(e)}

    @staticmethod
    def validate_token(token):
        """
        Decodes the auth token
        :param token:
        :return: integer|string
        """
        auth_token = token.replace("Bearer ", "")
        try:
            payload = jwt.decode(auth_token, 'BUDGETR_SECRET_KEY')
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return {'error': 'Signature expired. Please log in again.', "status_code": 403}
        except jwt.InvalidTokenError:
            return {'error': 'Invalid token. Please log in again.', "status_code": 401}
