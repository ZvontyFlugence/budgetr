# from category import Category


class Expense:

    def __init__(self, item, amount, date, expenseCategory=None):
        self.item = item
        self.amount = amount
        self.date = date
        self.expenseCategory = expenseCategory

    def setItem(self, item):
        self.item = item

    def setAmount(self, amount):
        self.amount = amount

    def setExpenseCategory(self, expenseCategory):
        self.expenseCategory = expenseCategory

    def setDate(self, date):
        self.date = date

    def getitem(self):
        return self.item

    def getAmount(self):
        return self.amount

    def getExpenseCategory(self):
        return self.expenseCategory

    def getDate(self):
        return self.date
