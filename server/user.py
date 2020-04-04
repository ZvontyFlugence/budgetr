from income import Income

class User():
    ID = 0
    Username = ""
    Email = ""
    Password = ""
    ReportLink = ""
    Categories = []
    Income = []
    Savings = []
    TotalExpenses = 0
    TotalIncome = 0
    TotalSavings = 0

    def __init__(self, ID, Username, Email, Password, ReportLink, Categories, Income, Savings, TotalExpenses, TotalIncome, TotalSavings):
        self.ID = 0
        self.Username = ""
        self.Email = ""
        self.Password = ""
        self.ReportLink = ""
        self.Categories = []
        self.Income = []
        self.Savings = []
        self.TotalExpenses = 0
        self.TotalIncome = 0
        self.TotalSavings = 0

    def setUsername(self, username):
        self.Username = username

    def setEmail(self, email):
        self.Email = email

    def setPassword(self, password):
        self.Password = password

    def addCategory(self, category):
        self.Categories.append(category)

    def removeCategory(self, category):
        for i in range(0, len(self.Categories) - 1):
            if(category == self.Categories[i]):
                while((i < len(self.Categories) - 1) and (self.Categories[i+1] != None)):
                    self.Categories[i] = self.Categories[i+1]
    def setLatestReport(self, reportLink):
        self.ReportLink = reportLink

    def getUserID(self):
        return self.ID

    def getUserUserName(self):
        return self.Username

    def getUserID(self):
        return self.ID

    def getUserEmail(self):
        return self.Email

    def getUserCategories(self):
        return self.Categories

    def getUserTotalExpenses(self):
        return self.TotalExpenses

    def getUserTotalIncome(self):
        return self.TotalIncome

    def getUserTotalSavings(self):
        return self.TotalSavings

    def updateTotalIncome(self, income):
        self.TotalIncome = income

    def updateTotalSavings(self, savings):
        self.TotalSavings = savings