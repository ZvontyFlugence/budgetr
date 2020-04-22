# from category import Category


class Expense:

    def __init__(self, item, amount, date, expenseCategory="Miscellaneous"):
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

    def getItem(self):
        return self.item

    def getAmount(self):
        return self.amount

    def getExpenseCategory(self):
        return self.expenseCategory

    def getDate(self):
        return self.date

    @staticmethod
    def from_dict(dict):
        this = Expense(dict["item"], dict["amount"], dict["date"])
        for key in dict:
            setattr(this, key, dict[key])
        return this
