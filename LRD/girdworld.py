import numpy as np

class Gridworld:
    def __init__(self, size=4):
        self.size, self.state, self.end_state = size, (0, 0), (size-1, size-1)

    def reset(self): self.state = (0, 0); return self.state

    def step(self, action):
        x, y = self.state
        if action == 0: x = max(0, x-1)
        elif action == 1: y = min(self.size-1, y+1)
        elif action == 2: x = min(self.size-1, x+1)
        elif action == 3: y = max(0, y-1)
        self.state = (x, y)
        return self.state, 1 if self.state == self.end_state else -1, self.state == self.end_state

env = Gridworld(); state = env.reset()
state, reward, done = env.step(1)
print("State:", state, "Reward:", reward, "Done:", done)
