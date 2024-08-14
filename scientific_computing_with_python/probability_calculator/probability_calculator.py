import random
from collections import Counter

class Hat:
    def __init__(self, **balls):
        self.contents = []
        for color, count in balls.items():
            self.contents.extend([color] * count)

    def draw(self, num_balls):
        if num_balls >= len(self.contents):
            return self.contents[:]  # Return all balls if num_balls >= total balls
        drawn_balls = random.sample(self.contents, num_balls)
        for ball in drawn_balls:
            self.contents.remove(ball)
        return drawn_balls

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    success_count = 0

    for _ in range(num_experiments):
        hat_copy = Hat(**Counter(hat.contents))  # Create a fresh copy of the hat
        drawn_balls = hat_copy.draw(num_balls_drawn)
        drawn_counter = Counter(drawn_balls)
        
        success = True
        for color, count in expected_balls.items():
            if drawn_counter[color] < count:
                success = False
                break
                
        if success:
            success_count += 1

    return success_count / num_experiments

# Example usage:
hat = Hat(blue=5, red=4, green=2)
probability = experiment(hat=hat, expected_balls={'red': 1, 'green': 2}, num_balls_drawn=4, num_experiments=2000)
print(probability)
