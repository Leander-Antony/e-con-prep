# Factorial Sum Puzzle

## Problem Statement
$k = 1! + 2! + 3! + 4! + 5! + 6! + 7! + 8!.......+29!$ 
What would be the last digit of $K$?

## Solution

To find the last digit of a sum, we only need to find the last digit of each individual term and add them together. The last digit of a number is its value modulo 10 (the remainder when divided by 10). 

Let's calculate the first few factorials and find their last digits:
*   **$1! = 1$** (last digit is 1)
*   **$2! = 2 \times 1 = 2$** (last digit is 2)
*   **$3! = 3 \times 2 \times 1 = 6$** (last digit is 6)
*   **$4! = 4 \times 3 \times 2 \times 1 = 24$** (last digit is 4)

Now, let's look at $5!$:
*   **$5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$** (last digit is 0)

Notice that for any $n \ge 5$, $n!$ will always include both 5 and 2 as factors. Since $5 \times 2 = 10$, every factorial from $5!$ onwards will be a multiple of 10 and therefore will end in 0. 

*   $6! = 720$ (last digit is 0)
*   $7! = 5040$ (last digit is 0)
*   ...and so on up to $29!$ (last digit is 0)

When we sum all these factorials, all the terms from $5!$ to $29!$ will contribute $0$ to the final last digit. 

Therefore, the last digit of $K$ is entirely determined by the sum of the first four terms:
$$\text{Sum of first four terms} = 1! + 2! + 3! + 4!$$
$$\text{Sum} = 1 + 2 + 6 + 24$$
$$\text{Sum} = 33$$

The last digit of 33 is 3. 

**Conclusion:**
The last digit of $K$ is **3**.
