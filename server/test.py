import unittest
import bcrypt;
from user import User
from category import Category
from income import Income


class TestUserModel(unittest.TestCase):
    
    def test_init(self):
        hashedpw = bcrypt.hashpw('test'.encode('ascii'), bcrypt.gensalt())
        user = User(1, 'UnitTest', 'unittest@budgetr.com', hashedpw)
        self.assertEqual(user.getUserID(), 1)
        self.assertEqual(user.getUserUserName(), 'UnitTest')
        self.assertEqual(user.getUserEmail(), 'unittest@budgetr.com')
        self.assertTrue(bcrypt.checkpw('test'.encode('ascii'), user.password))

    def test_set(self):
        hashedpw = bcrypt.hashpw('test'.encode('ascii'), bcrypt.gensalt())
        user = User(1, 'UnitTest', 'unittest@budgetr.com', hashedpw)
        user.setUsername('username')
        user.setEmail('email@budgetr.com')
        user.setPassword('password')
        user.setLatestReport('link')
        self.assertEqual(user.getUserUserName(), 'username')
        self.assertEqual(user.getUserEmail(), 'email@budgetr.com')
        self.assertEqual(user.password, 'password')
        self.assertEqual(user.reportLink, 'link')

    def test_updates(self):
        hashedpw = bcrypt.hashpw('test'.encode('ascii'), bcrypt.gensalt())
        user = User(1, 'UnitTest', 'unittest@budgetr.com', hashedpw)
        user.updateTotalExpenses(1.01)
        user.updateTotalIncome(1.01)
        user.updateTotalSavings(1.01)
        self.assertAlmostEqual(user.getUserTotalExpenses(), 1.01)
        self.assertAlmostEqual(user.getUserTotalIncome(), 1.01)
        self.assertAlmostEqual(user.getUserTotalSavings(), 1.01)

    def test_categories(self):
        hashedpw = bcrypt.hashpw('test'.encode('ascii'), bcrypt.gensalt())
        user = User(1, 'UnitTest', 'unittest@budgetr.com', hashedpw)
        user.addCategory(Category('cat', 50.00))
        self.assertEqual(len(user.getUserCategories()), 2)
        user.removeCategory(1)
        self.assertEqual(len(user.getUserCategories()), 1)

    def test_income(self):
        hashedpw = bcrypt.hashpw('test'.encode('ascii'), bcrypt.gensalt())
        user = User(1, 'UnitTest', 'unittest@budgetr.com', hashedpw)
        user.addIncome(Income('income', 5.00, "2020-04-01"))
        self.assertEqual(len(user.income), 1)
        self.assertAlmostEqual(user.getUserTotalIncome(), 5.00)
        user.removeIncome(0, False)
        self.assertEqual(len(user.income), 0)
        self.assertAlmostEqual(user.getUserTotalIncome(), 0)
        
    def test_user_updates(self):
        hashedpw = bcrypt.hashpw('test'.encode('ascii'), bcrypt.gensalt())
        user = User(1, 'UnitTest', 'unittest@budgetr.com', hashedpw)
        user.setUsername('UnitTestUpdate')
        user.setEmail('unittestupdate@budgetr.com')
        user.setPassword('testupdatepw')
        self.assertEqual(user.getUserUserName(), 'UnitTestUpdate')
        self.assertAlmostEqual(user.getUserEmail(), 'unittestupdate@budgetr.com')
        self.assertTrue(bcrypt.checkpw('testupdatepw'.encode('ascii'), user.password))

    
   
    
if __name__ == '__main__':
    unittest.main()



