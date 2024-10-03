import numpy as np

# Define states and rewards
states = 4
rewards = np.array([[0, -1], [-1, 0], [0, 1], [1, 0]])
policy = np.zeros(states, dtype=int)  # Initialize policy
gamma, theta = 0.9, 0.0001  # Discount factor and threshold
V = np.zeros(states)  # Value function

while True:
    # Policy Evaluation
    while True:
        delta = 0  # Change in value
        for s in range(states):
            v = rewards[s][policy[s]] + gamma * V[s]  # Calculate value
            delta, V[s] = max(delta, abs(v - V[s])), v  # Update value
        if delta < theta: break  # Check for convergence

    # Policy Improvement
    stable = True
    for s in range(states):
        old_action = policy[s]
        policy[s] = np.argmax(rewards[s] + gamma * V[s])  # Update policy
        stable &= (old_action == policy[s])  # Check if policy is stable
    if stable: break  # Exit if policy is stable

print("Optimal Policy:", policy)
