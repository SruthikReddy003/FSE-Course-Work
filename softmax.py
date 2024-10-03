import random
import numpy as np

class Agent:
    def __init__(self, n_actions, temperature=1.0):
        self.n_actions = n_actions
        self.q_table = [0] * n_actions
        self.temperature = temperature

    def choose(self):
        scores = [score / self.temperature for score in self.q_table]
        probs = np.exp(scores) / np.sum(np.exp(scores))
        return random.choices(range(self.n_actions), weights=probs)[0]

agent = Agent(4)
for ep in range(10):
    print(f"Episode {ep+1}: Action = {agent.choose()}")