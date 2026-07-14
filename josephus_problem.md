# 100 People in a Circle Problem (The Josephus Problem)

## Problem Statement
> There are 100 people standing in a circle. We can number them as 1 to 100. The first person (No1) has a sword. He kills the next person (i.e. No2) and gives the sword to next person (i.e. No3) and this continues until only one survives. Which number survives at the last?

## Correct Solution

This is a classic mathematical puzzle known as the **Josephus Problem**. 

While you could theoretically write out all 100 numbers and cross them out one by one, there is a reliable mathematical formula for this exact scenario (where every second person is eliminated):

1. Find the highest power of 2 that is less than or equal to the total number of people ($N$). Let's call this power of two $2^a$.
2. Subtract this power of two from the total number of people to find the remainder, which we'll call $L$. So, $L = N - 2^a$.
3. The position of the sole survivor is given by the formula: **$2L + 1$**.

Let's apply this to our problem where $N = 100$:
* The powers of 2 are: 1, 2, 4, 8, 16, 32, 64, 128...
* The highest power of 2 that is less than or equal to 100 is **64** (which is $2^6$).
* Now we find the remainder ($L$): 100 - 64 = **36**.
* Finally, we plug $L$ into our survivor formula: 2(36) + 1 = 72 + 1 = **73**.

The person standing at position **73** is the sole survivor.

## Is the handwritten answer (99) correct?

**No, 99 is incorrect.**

It is very easy to see why the person who wrote the answer guessed 99. They likely only thought about the **first round** of eliminations around the circle and stopped there.

Let's look at how the first round plays out:
* 1 kills 2, gives the sword to 3.
* 3 kills 4, gives the sword to 5.
* ...
* 97 kills 98, gives the sword to 99.
* 99 kills 100.

At this exact moment, one full loop of the circle has been completed. The person who wrote "99" likely stopped here, thinking "99 struck the last blow of the 100 people, so 99 wins." 

However, the game doesn't stop after one loop! After 99 kills 100, they must pass the sword to the next surviving person in the circle, which is person number 1. Then round 2 begins (1 kills 3, gives the sword to 5, and so on) and this process loops multiple times until only person **73** remains.
