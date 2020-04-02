from income import Income

class User():
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

    def __init__(self, Username, Email, Password, ReportLink, Categories, Income, Savings, TotalExpenses, TotalIncome, TotalSavings):
        self.setUsername(Username)
        self.setEmail(Email)
        self.setPassword(Password)
        self.setLatestReport(ReportLink)
        self.addCategory(Categories)
        self.Income = []
        self.Savings = []
        self.TotalExpenses = 0
        self.TotalIncome = 0
        self.TotalSavings = 0

    def makeUser(Username, Email, Password, ReportLink, Categories, Income, Savings, TotalExpenses, TotalIncome, TotalSavings):
        user = User(Username, Email, Password, ReportLink, Categories, Income, Savings, TotalExpenses, TotalIncome, TotalSavings)
        return user

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

    def getUserName(self):
        return self.Username

    def getUserID(self):
        return self.ID

    def getUserEmail(self):
        return self.Email

    def getPassword(self):
        return self.Password

    def getReportLink(self):
        return self.ReportLink

    def getUserCategories(self):
        return self.Categories

    def getIncome(self):
        return self.Income

    def getSavings(self):
        return self.Savings

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