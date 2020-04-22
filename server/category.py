from expense import Expense


class Category():

    def __init__(self, name, limit, spent=0.0, expenses=[]):
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
        self.spent += expense.amount

    def removeExpense(self, expense):
        try:
            for i in range(0, len(self.expenses)):
                if expense['oldItem'] == self.expenses[i].getItem():
                    self.expenses.pop(i)
                    self.spent -= expense['oldAmount']
                    break
        except KeyError:
            for i in range(0, len(self.expenses)):
                if expense['item'] == self.expenses[i].getItem():
                    self.expenses.pop(i)
                    self.spent -= expense['amount']
                    break

    def getName(self):
        return self.name

    def getLimit(self):
        return self.limit

    def getSpent(self):
        return self.spent

    def getExpenses(self):
        return self.expenses

    def as_dict(self):
        return {
            'name': self.name,
            'limit': self.limit,
            'spent': self.spent,
            'expenses': list(map(lambda expense: expense.__dict__, self.expenses))
        }

    @staticmethod
    def from_dict(dict):
        this = Category(dict["name"], dict["limit"])
        for key in dict:
            if key == "expenses":
                setattr(this, key, list(map(lambda exp: Expense.from_dict(exp), dict[key])))
            else:
                setattr(this, key, dict[key])
        return this
