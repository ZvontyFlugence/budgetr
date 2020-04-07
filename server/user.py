from income import Income


class User():

    def __init__(self, user_id, username, email, password, reportLink, categories, income, savings, totalExpenses, totalIncome, totalSavings):
        self.id = 0
        self.username = ""
        self.email = ""
        self.password = ""
        self.reportLink = ""
        self.categories = []
        self.income = []
        self.savings = []
        self.totalExpenses = 0
        self.totalIncome = 0
        self.totalSavings = 0

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

    def setLatestReport(self, reportLink):
        self.reportLink = reportLink

    def getUserID(self):
        return self.ID

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

    def updateTotalIncome(self, income):
        self.totalIncome = income

    def updateTotalSavings(self, savings):
        self.totalSavings = savings