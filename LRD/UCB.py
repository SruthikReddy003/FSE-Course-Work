import numpy as np

class UCB:
    def __init__(self, n_arms):
        self.n_arms = n_arms
        self.counts = np.zeros(n_arms)
        self.values = np.zeros(n_arms)
        self.total_count = 0

    def select_arm(self):
        ucb_values = self.values + np.sqrt(2 * np.log(self.total_count + 1) / (self.counts + 1e-5))
        return np.argmax(ucb_values)

    def update(self, chosen_arm, reward):
        self.counts[chosen_arm] += 1
        n = self.counts[chosen_arm]
        value = self.values[chosen_arm]
        self.values[chosen_arm] = ((n - 1) / n) * value + (1 / n) * reward
        self.total_count += 1

# Example usage
ucb = UCB(n_arms=4)
for t in range(1000):
    arm = ucb.select_arm()
    reward = np.random.rand()  # Simulated reward
    ucb.update(arm, reward)
    print(f"Step {t+1}: Chose arm {arm}, received reward {reward:.2f}")