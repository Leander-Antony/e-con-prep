# Probability Problem Solution

**Problem:** If the probability of seeing a car on a highway over a period of 30mins is 0.875, what is the probability of seeing a car in any 10minute interval? Assume uniform probability distribution.

## Solution

To solve this, it's easier to calculate the probability of **not** seeing a car.

1.  **Find the probability of NOT seeing a car in 30 minutes:**
    The probability of seeing at least one car in 30 minutes is 0.875.
    Therefore, the probability of NOT seeing a car in 30 minutes is:
    `1 - 0.875 = 0.125`

2.  **Break down the time interval:**
    A 30-minute period consists of three 10-minute intervals (30 / 10 = 3).
    Let `p` be the probability of seeing a car in a single 10-minute interval.
    The probability of NOT seeing a car in a 10-minute interval is `(1 - p)`.

3.  **Set up the equation:**
    Assuming the intervals are independent (which is standard for these types of uniform distribution/Poisson process problems), the probability of not seeing a car for the entire 30 minutes is the probability of not seeing a car in the first 10 mins, AND the second 10 mins, AND the third 10 mins.
    `(1 - p) * (1 - p) * (1 - p) = (1 - p)³`
    
    So, we have:
    `(1 - p)³ = 0.125`

4.  **Solve for p:**
    Take the cube root of both sides:
    `1 - p = ∛0.125`
    `1 - p = 0.5`
    
    `p = 1 - 0.5`
    `p = 0.5`

## Conclusion

The probability of seeing a car in any 10-minute interval is **0.5** (or 50%).

**Regarding your answer (0.175):**
Your answer is incorrect. Probabilities of events happening at least once over time do not scale linearly (you cannot just divide or multiply them directly). You always have to work with the probability of the event *not* happening to find the correct scale.
