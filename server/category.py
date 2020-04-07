class Category:

    def __init__(self, name, limit, spent, expenses=[]):
        self.name = name
        self.limit = limit
        self.spent = spent
        self.expenses = expenses

    def setName(self, name):
        self.name = name

    def setLimit(self, limit):
        self.limit = limit

    def addExpense(self, expense):
        self.expenses.append(expense)

    def removeExpense(self, expense):
        for i in range(0, len(self.expenses) - 1):
            if (expense == self.expenses[i]):
                while ((i < len(self.expenses) - 1) and (self.categories[i+1] is not None)):
                    self.expenses[i] = self.expenses[i + 1]

    def getName(self):
        return self.name

    def getLimit(self):
        return self.limit

    def getSpent(self):
        return self.spent

    def getExpenses(self):
        return self.expenses
