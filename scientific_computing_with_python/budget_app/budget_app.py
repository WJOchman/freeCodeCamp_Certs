class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": amount, "description": description})

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -amount, "description": description})
            return True
        return False

    def get_balance(self):
        total_balance = sum(item['amount'] for item in self.ledger)
        return total_balance

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        return amount <= self.get_balance()

    def __str__(self):
        title = f"{self.name:*^30}\n"
        items = ""
        for item in self.ledger:
            amount = f"{item['amount']:.2f}"
            items += f"{item['description'][:23]:23}" + f"{amount:>7}\n"
        total = f"Total: {self.get_balance():.2f}"
        return title + items + total


def create_spend_chart(categories):
    # Calculate the total spent and percentage spent per category
    total_spent = 0
    spent_per_category = []

    for category in categories:
        spent = sum(-item['amount'] for item in category.ledger if item['amount'] < 0)
        spent_per_category.append(spent)
        total_spent += spent

    percentages = [(spent / total_spent) * 100 for spent in spent_per_category]

    # Create the bar chart
    chart = "Percentage spent by category\n"
    for i in range(100, -1, -10):
        chart += f"{i:>3}|"
        for percentage in percentages:
            if percentage >= i:
                chart += " o "
            else:
                chart += "   "
        chart += " \n"

    # Bottom line
    chart += "    -" + "---" * len(categories) + "\n"

    # Category names, written vertically
    max_len = max(len(category.name) for category in categories)
    for i in range(max_len):
        chart += "     "
        for category in categories:
            if i < len(category.name):
                chart += f" {category.name[i]} "
            else:
                chart += "   "
        chart += " \n"

    return chart.rstrip("\n")


# Example usage:
food = Category('Food')
food.deposit(1000, 'initial deposit')
food.withdraw(10.15, 'groceries')
food.withdraw(15.89, 'restaurant and more food for dessert')
clothing = Category('Clothing')
food.transfer(50, clothing)
entertainment = Category('Entertainment')
entertainment.deposit(500, 'initial deposit')
entertainment.withdraw(200, 'movie and snacks')

print(food)
print(clothing)
print(entertainment)
print(create_spend_chart([food, clothing, entertainment]))
