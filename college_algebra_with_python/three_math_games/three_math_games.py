import numpy as np
import matplotlib.pyplot as plt
import random
import tkinter as tk
from sympy import symbols, Eq, solve

# Scatter Plot Game
def scatter_plot_game(num_points=5, x_range=(-10, 10), y_range=(-10, 10)):
    x_points = np.random.randint(x_range[0], x_range[1], num_points)
    y_points = np.random.randint(y_range[0], y_range[1], num_points)
    plt.scatter(x_points, y_points)
    plt.xlim(x_range)
    plt.ylim(y_range)
    plt.title("Scatter Plot Game")
    plt.show()

    print("Identify the coordinates of the points.")
    for i, (x, y) in enumerate(zip(x_points, y_points)):
        guess_x = int(input(f"Enter x coordinate of point {i + 1}: "))
        guess_y = int(input(f"Enter y coordinate of point {i + 1}: "))
        if guess_x == x and guess_y == y:
            print("Correct!")
        else:
            print(f"Wrong. The correct coordinates were ({x}, {y})")

# Algebra Practice Game
def algebra_practice_game(num_problems=5):
    x = symbols('x')
    for _ in range(num_problems):
        a, b = random.randint(-10, 10), random.randint(-10, 10)
        equation = Eq(a * x + b, 0)
        solution = solve(equation, x)[0]
        print(f"Solve for x: {a}x + {b} = 0")
        guess = int(input("Enter your solution for x: "))
        if guess == solution:
            print("Correct!")
        else:
            print(f"Wrong. The correct answer was x = {solution}")

# Projectile Game
def projectile_game():
    def plot_trajectory(a, b, c):
        x_vals = np.linspace(0, 10, 400)
        y_vals = a * x_vals**2 + b * x_vals + c
        plt.plot(x_vals, y_vals)
        plt.axhline(y=wall_height, color='r', linestyle='--')
        plt.axvline(x=wall_location, color='r', linestyle='--')
        plt.ylim(0, 10)
        plt.xlim(0, 10)
        plt.title("Projectile Game")
        plt.show()

    wall_height = random.uniform(2, 8)
    wall_location = random.uniform(2, 8)

    def level_one():
        root = tk.Tk()
        root.title("Projectile Game - Level 1")

        def update_plot(event=None):
            a = a_slider.get()
            b = b_slider.get()
            c = c_slider.get()
            plt.clf()
            plot_trajectory(a, b, c)

        a_slider = tk.Scale(root, from_=0.1, to=1.0, resolution=0.1, label='a', orient='horizontal', command=update_plot)
        b_slider = tk.Scale(root, from_=-5, to=5, resolution=0.5, label='b', orient='horizontal', command=update_plot)
        c_slider = tk.Scale(root, from_=0, to=10, resolution=0.5, label='c', orient='horizontal', command=update_plot)

        a_slider.pack()
        b_slider.pack()
        c_slider.pack()

        tk.Button(root, text="Submit", command=lambda: root.quit()).pack()
        plot_trajectory(a_slider.get(), b_slider.get(), c_slider.get())
        root.mainloop()

    def level_two():
        print("Enter the values of a, b, and c for the quadratic equation ax^2 + bx + c = 0")
        a = float(input("Enter value for a: "))
        b = float(input("Enter value for b: "))
        c = float(input("Enter value for c: "))
        plot_trajectory(a, b, c)

    print("Level 1: Adjust the sliders to clear the wall.")
    level_one()

    print("\nLevel 2: Enter the coefficients a, b, and c manually.")
    level_two()

# Main execution area to demonstrate functionality
if __name__ == "__main__":
    print("Welcome to the Math Games!")
    
    while True:
        print("\nChoose a game to play:")
        print("1. Scatter Plot Game")
        print("2. Algebra Practice Game")
        print("3. Projectile Game")
        print("4. Exit")
        
        choice = input("Enter the number of the game you want to play: ")
        
        if choice == '1':
            scatter_plot_game()
        elif choice == '2':
            algebra_practice_game()
        elif choice == '3':
            projectile_game()
        elif choice == '4':
            print("Thanks for playing!")
            break
        else:
            print("Invalid choice. Please try again.")
