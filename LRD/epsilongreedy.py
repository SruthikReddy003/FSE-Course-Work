import random

class EpsilonGreedyAgent:
    def __init__(self, n_actions, epsilon=1):
        self.n_actions, self.epsilon = n_actions, epsilon
        self.q_table = [0] * n_actions

    def select_action(self):
        if random.random() < self.epsilon:
            return random.randint(0, self.n_actions - 1)
        else:
            return self.q_table.index(max(self.q_table))

    def update(self):
        self.epsilon *= 0.9

agent = EpsilonGreedyAgent(4)
for _ in range(10):
    print(f"Action: {agent.select_action()} with epsilon: {agent.epsilon}")
    agent.update()