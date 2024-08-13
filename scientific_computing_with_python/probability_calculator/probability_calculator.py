import random
from collections import Counter

class Hat:
    def __init__(self, **balls):
        self.contents = []
        for color, count in balls.items():
            self.contents.extend([color] * count)

    def draw(self, num_balls):
        # If the number of balls to draw exceeds the available quantity, return all the balls.
        if num_balls > len(self.contents):
            return self.contents[:]
        # Draw the specified number of balls randomly
        drawn_balls = random.sample(self.contents, num_balls)
        # Remove the drawn balls from the contents
        for ball in drawn_balls:
            self.contents.remove(ball)
        return drawn_balls

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    successful_experiments = 0

    for _ in range(num_experiments):
        # Create a new instance of Hat for each experiment
        temp_hat = Hat(**Counter(hat.contents))
        # Draw balls from the hat
        drawn_balls = temp_hat.draw(num_balls_drawn)
        # Count the drawn balls
        drawn_balls_counter = Counter(drawn_balls)

        # Check if the drawn balls meet or exceed the expected count for each color
        success = all(drawn_balls_counter[color] >= count for color, count in expected_balls.items())

        if success:
            successful_experiments += 1

    # Calculate the probability
    probability = successful_experiments / num_experiments
    return probability

# Example usage
if __name__ == "__main__":
    hat = Hat(blue=5, red=4, green=2)
    probability = experiment(hat=hat, expected_balls={'red': 1, 'green': 2}, num_balls_drawn=4, num_experiments=2000)
    print(f"Estimated Probability: {probability}")
