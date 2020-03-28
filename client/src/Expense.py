import datetime
from client.src.Category import Category

class Expense:
    Item = ""
    Amount = 0.00
    ExpenseCategory = Category
    Date = datetime(2000, 1, 1)

    def setItem(self, item):
        self.item = item

    def setAmount(self, amount):
        self.Amount = amount

    def setExpenseCategory(self, expenseCategory):
        self.ExpenseCategory = expenseCategory

    def setDate(self, date):
        self.Date = date

    def getitem(self):
        return self.item

    def getAmount(self):
        return self.Amount

    def getExpenseCategory(self):
        return self.ExpenseCategory

    def getDate(self):
        return self.Date


