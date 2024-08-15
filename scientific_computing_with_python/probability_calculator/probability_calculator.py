import random

class Hat:
    def __init__(self, **balls):
        self.contents = []
        for color, count in balls.items():
            self.contents.extend([color] * count)

    def draw(self, num_balls):
        if num_balls > len(self.contents):
            return self.contents
        drawn_balls = random.sample(self.contents, num_balls)
        for ball in drawn_balls:
            self.contents.remove(ball)
        return drawn_balls

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    success_count = 0

    for _ in range(num_experiments):
        # Create a new instance of Hat for each experiment
        experiment_hat = Hat(**{color: hat.contents.count(color) for color in set(hat.contents)})
        drawn_balls = experiment_hat.draw(num_balls_drawn)

        # Count the drawn balls
        drawn_count = {}
        for ball in drawn_balls:
            drawn_count[ball] = drawn_count.get(ball, 0) + 1

        # Check if the drawn balls match the expected balls
        success = True
        for color, count in expected_balls.items():
            if drawn_count.get(color, 0) < count:
                success = False
                break

        if success:
            success_count += 1

    # Calculate the probability
    probability = success_count / num_experiments
    return probability

# Example usage
hat = Hat(blue=5, red=4, green=2)
probability = experiment(
    hat=hat,
    expected_balls={"red": 1, "green": 2},
    num_balls_drawn=4,
    num_experiments=1000
)
print(probability)
