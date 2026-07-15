# Carousel Puzzle

## Problem Statement
While enjoying a giddy ride at the carousel Sammy propounded a puzzle which reflects much credit to his mental abilities. "One third of the number of kids riding ahead of me, added to three-quarter of those riding behind me gives the correct number of children on this Merry-Go-Round" is the way he puts it; how many riders were there were at this whirling circus?

## Solution

Let **$N$** be the total number of children riding on the Merry-Go-Round.

Since a carousel is circular, if Sammy looks ahead of him around the circle, he will see all the other children. Similarly, if he looks behind him around the circle, he will also see all the other children. 

Therefore, the number of kids riding "ahead" of him is all the other kids, which is **$N - 1$**.
The number of kids riding "behind" him is also all the other kids, **$N - 1$**.

According to Sammy's statement:
*(One third of kids ahead)* + *(Three-quarters of kids behind)* = *(Total number of children)*

We can write this as an equation:
$$\frac{1}{3}(N - 1) + \frac{3}{4}(N - 1) = N$$

Now, let's solve for $N$:

1. Factor out $(N - 1)$:
   $$\left(\frac{1}{3} + \frac{3}{4}\right)(N - 1) = N$$

2. Find a common denominator to add the fractions:
   $$\left(\frac{4}{12} + \frac{9}{12}\right)(N - 1) = N$$
   $$\frac{13}{12}(N - 1) = N$$

3. Multiply both sides by 12 to eliminate the denominator:
   $$13(N - 1) = 12N$$
   $$13N - 13 = 12N$$

4. Subtract $12N$ from both sides and add 13 to both sides:
   $$13N - 12N = 13$$
   $$N = 13$$

**Conclusion:**
There were **13** riders at the whirling circus.
