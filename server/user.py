from income import Income
from category import Category


class User():

    def __init__(self, user_id, username, email, hashedpw, reportLink="", categories=[Category("Miscellaneous", -1.00)], income=[], savings=[], totalExpenses=0.00, totalIncome=0.00, totalSavings=0.00):
        self._id = user_id
        self.username = username
        self.email = email
        self.password = hashedpw
        self.reportLink = reportLink
        self.categories = categories
        self.income = income
        self.savings = savings
        self.totalExpenses = totalExpenses
        self.totalIncome = totalIncome
        self.totalSavings = totalSavings

    def setUsername(self, username):
        self.username = username

    def setEmail(self, email):
        self.email = email

    def setPassword(self, password):
        self.password = password

    def addCategory(self, category):
        self.categories.append(category)

    def removeCategory(self, category):
        for i in range(0, len(self.categories) - 1):
            if(category == self.categories[i]):
                while((i < len(self.categories) - 1) and (self.categories[i+1] is not None)):
                    self.categories[i] = self.categories[i+1]

    def addIncome(self, income):
        if income.isSavings:
            self.savings.append(income)
            self.updateTotalSavings(income.amount)
        else:
            self.income.append(income)
            self.updateTotalIncome(income.amount)

    def setLatestReport(self, reportLink):
        self.reportLink = reportLink

    def getUserID(self):
        return self._id

    def getUserUserName(self):
        return self.username

    def getUserEmail(self):
        return self.email

    def getUserCategories(self):
        return self.categories

    def getUserTotalExpenses(self):
        return self.totalExpenses

    def getUserTotalIncome(self):
        return self.totalIncome

    def getUserTotalSavings(self):
        return self.totalSavings

    def updateTotalExpenses(self, amount):
        self.totalExpenses += amount

    def updateTotalIncome(self, income):
        self.totalIncome += income

    def updateTotalSavings(self, savings):
        self.totalSavings += savings

    def as_dict(self):        
        return {
            '_id': self._id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'reportLink': self.reportLink,
            'categories': list(map(lambda cat: cat.as_dict(), self.categories)),
            'income': list(map(lambda income: income.__dict__, self.income)),
            'savings': list(map(lambda savings: savings.__dict__, self.savings)),
            'totalExpenses': self.totalExpenses,
            'totalIncome': self.totalIncome,
            'totalSavings': self.totalSavings,
        }

    @staticmethod
    def from_dict(dict):
        this = User(dict["_id"], dict["username"], dict["username"], dict["password"])
        for key in dict:
            if key == "categories":
                setattr(this, key, list(map(lambda cat: Category.from_dict(cat), dict[key])))
            elif key == "income":
                setattr(this, key, list(map(lambda inc: Income.from_dict(inc), dict[key])))
            elif key == "savings":
                setattr(this, key, list(map(lambda sav: Income.from_dict(sav), dict[key])))
            else:
                setattr(this, key, dict[key])
        return this
