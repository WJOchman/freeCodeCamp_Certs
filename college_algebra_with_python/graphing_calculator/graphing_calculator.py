import numpy as np
import matplotlib.pyplot as plt
from sympy import symbols, Eq, solve, lambdify
from sympy.parsing.sympy_parser import parse_expr

# Function to plot one or more functions
def plot_functions(functions, x_range=(-10, 10)):
    x = np.linspace(x_range[0], x_range[1], 400)
    for func in functions:
        y = lambdify(symbols('x'), parse_expr(func), 'numpy')(x)
        plt.plot(x, y, label=f'y = {func}')
    plt.legend()
    plt.grid(True)
    plt.show()

# Function to create a table of (x, y) values
def create_table_of_values(function, x_values):
    x = symbols('x')
    expr = parse_expr(function)
    y_values = [expr.subs(x, val) for val in x_values]
    table = list(zip(x_values, y_values))
    return table

# Function to shade above or below the line
def shade_area(function, x_range=(-10, 10), above=True):
    x = np.linspace(x_range[0], x_range[1], 400)
    y = lambdify(symbols('x'), parse_expr(function), 'numpy')(x)
    plt.plot(x, y, label=f'y = {function}')
    
    if above:
        plt.fill_between(x, y, max(y), color='gray', alpha=0.5)
    else:
        plt.fill_between(x, y, min(y), color='gray', alpha=0.5)
        
    plt.legend()
    plt.grid(True)
    plt.show()

# Function to solve and graph a system of equations
def solve_and_graph_system(equations, x_range=(-10, 10)):
    x, y = symbols('x y')
    eqs = [Eq(parse_expr(eq.split('=')[0]), parse_expr(eq.split('=')[1])) for eq in equations]
    sol = solve(eqs, (x, y))
    
    x_vals = np.linspace(x_range[0], x_range[1], 400)
    
    for eq in equations:
        y_vals = lambdify(x, parse_expr(eq.split('=')[0]) - parse_expr(eq.split('=')[1]), 'numpy')(x_vals)
        plt.plot(x_vals, y_vals, label=eq)
    
    if sol:
        plt.plot(sol[x], sol[y], 'ro', label=f'Solution: {sol}')
    
    plt.legend()
    plt.grid(True)
    plt.show()

# Function to zoom in or out on a graph
def zoom_plot(function, x_center=0, zoom_level=1):
    x_range = (x_center - zoom_level, x_center + zoom_level)
    plot_functions([function], x_range=x_range)

# Function to solve quadratic equations
def solve_quadratic(function):
    x = symbols('x')
    expr = parse_expr(function)
    solutions = solve(expr, x)
    return solutions

# Main execution area to demonstrate functionality
if __name__ == "__main__":
    # Example 1: Plotting functions
    plot_functions(['x**2', 'x + 2'])

    # Example 2: Create table of values
    table = create_table_of_values('x**2 - 2*x + 1', x_values=[-2, -1, 0, 1, 2])
    print("Table of (x, y) values:", table)

    # Example 3: Shade above the function
    shade_area('x**2 - 4', above=True)

    # Example 4: Solve and graph a system of equations
    solve_and_graph_system(['2*x + y = 4', 'x - y = 1'])

    # Example 5: Zoom in on the plot
    zoom_plot('x**2 - 4', x_center=0, zoom_level=2)

    # Example 6: Solve a quadratic equation
    solutions = solve_quadratic('x**2 - 5*x + 6')
    print("Solutions to the quadratic equation:", solutions)
