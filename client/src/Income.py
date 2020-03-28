import datetime

class Income:
    Name = ""
    Amount = 0.00
    Date = datetime.date(2000, 1, 1)
    IsConsistent = False
    IsSavings = False

    def Name(self, name):
        self.Name = name

    def setAmount(self, amount):
        self.Amount = amount

    def setDate(self, date):
        self.Date = date

    def setIsConsistent(self, isConsistent):
        self.IsConsistent = isConsistent

    def setIsSavings(self, isSavings):
        self.IsSavings = isSavings

    def getName(self):
        return self.Name

    def getAmount(self):
        return self.Amount

    def getDate(self):
        return self.Date

    def getIsConsistent(self):
        return self.IsConsistent

    def getIsSavings(self):
        return self.IsSavings
