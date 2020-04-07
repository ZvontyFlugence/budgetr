class Income:

    def __init__(self, name, amount, date, isConsistent=False, isSavings=False):
        self.name = name
        self.amount = amount
        self.date = date,
        self.isConsistent = isConsistent
        self.isSavings

    def Name(self, name):
        self.name = name

    def setAmount(self, amount):
        self.amount = amount

    def setDate(self, date):
        self.date = date

    def setIsConsistent(self, isConsistent):
        self.isConsistent = isConsistent

    def setIsSavings(self, isSavings):
        self.isSavings = isSavings

    def getName(self):
        return self.name

    def getAmount(self):
        return self.amount

    def getDate(self):
        return self.date

    def getIsConsistent(self):
        return self.isConsistent

    def getIsSavings(self):
        return self.isSavings
