import unittest

from client.src.User import User
from server.db import db


class TestUserModel():

    def test_encode_auth_token(self):
        user = User(
        ID=0,
        Username = "",
        Email = "",
        Password = "",
        ReportLink = "",
        Categories = [],
        Income = [],
        Savings = [],
        TotalExpenses = 0,
        TotalIncome = 0,
        TotalSavings = 0
        )
        db.users.add(user)
        db.users.commit()
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))


if __name__ == '__main__':
    unittest.main()