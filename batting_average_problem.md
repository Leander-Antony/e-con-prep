# Cricket Batting Average Problem

## Problem Statement
> In a particular cricket match today, a batsman was out for 26 runs. After this match, his batting average for this year has increased from 15 runs to 16 runs. How much runs he must have scored in this match to increase his batting average to 20 runs?

## Correct Solution

To solve this, we need to determine how many matches (innings) the batsman had played before today's match. 

**Step 1: Set up the equations**
*   Let $n$ be the number of innings played before today.
*   Let $R$ be the total runs scored before today.
*   Before today, his average was 15:  
    $$R / n = 15$$  (which means $$R = 15n$$)
*   Today, he scored 26 runs and got out. This increases his total innings to $n + 1$ and his total runs to $R + 26$. His new average is 16:
    $$(R + 26) / (n + 1) = 16$$

**Step 2: Solve for $n$ (past innings)**
Substitute the first equation ($$R = 15n$$) into the second equation:
*   $$(15n + 26) / (n + 1) = 16$$
*   $$15n + 26 = 16(n + 1)$$
*   $$15n + 26 = 16n + 16$$
*   $$26 - 16 = 16n - 15n$$
*   **$$10 = n$$**

So, the batsman had played **10 innings** prior to today's match.
This means his total runs before today were $$15 \times 10 = 150$$ runs.

**Step 3: Calculate the required runs for a 20 average**
The question asks what score ($X$) he would have needed in today's match (which is his 11th inning) to bring his new average up to 20.
*   Total innings = 10 past + 1 current = 11 innings.
*   Desired Average = 20.
*   Required Total Runs = 11 innings $\times$ 20 average = **220 total runs**.

Since he already had 150 runs before this match, the hypothetical runs ($X$) he needed to score today is:
*   $$X = 220 \text{ (required total)} - 150 \text{ (past total)}$$
*   $$X = 70$$

## Final Answer
The batsman must have scored **70 runs** in this match to increase his batting average to 20 runs.
