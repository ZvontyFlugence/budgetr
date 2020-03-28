

class Category:
    Name = ""
    Limit = 0
    Spent = 0
    Expenses = []

    def setName(self, name):
        self.Name = name

    def setLimit(self, limit):
        self.Limit = limit

    def addExpense(self, expense):
        self.Expenses.append(expense)

    def removeExpense(self, expense):
        for i in range(0, len(self.Expenses) - 1):
            if (expense == self.Expenses[i]):
                while ((i < len(self.Expenses) - 1) and (self.Categories[i+1] != None)):
                    self.Expenses[i] = self.Expenses[i + 1]

    def getName(self):
        return self.Name

    def getLimit(self):
        return self.Limit

    def getSpent(self):
        return self.Spent

    def getExpenses(self):
        return self.Expenses