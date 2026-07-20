# Puzzle 1 - Explanations and Solutions

This document provides detailed explanations and solutions for all the puzzles extracted from `Puzzle 1.docx`. Where an answer was provided in the original document, it has been checked for accuracy.

---

### 1. Using two 8's and two 3's to get the answer as 24.
**Provided Answer:** None
**Explanation:** 
You can achieve 24 by using fractions.
Equation: `8 / (3 - (8 / 3))`
Step-by-step:
1. `8 / 3` = 2.666...
2. `3 - (8 / 3)` = `9/3 - 8/3` = `1/3`
3. `8 / (1/3)` = `8 * 3` = **24**

---

### 2. A farmer eats 100 apples for 5 days, every day he ate 6 apples more than the previous day. How many apples did he ate in the first day?
**Provided Answer:** 8
**Check:** ✅ **Correct**
**Explanation:** 
Let `x` be the number of apples eaten on the first day.
The sequence of apples eaten over the 5 days is: `x`, `x+6`, `x+12`, `x+18`, `x+24`.
Sum of all apples = `x + (x+6) + (x+12) + (x+18) + (x+24) = 100`
`5x + 60 = 100`
`5x = 40`
`x = 8`
The farmer ate 8 apples on the first day.

---

### 3. Consider there are 10 soldiers on the one side of the river...
*(Full puzzle: 10 soldiers need to cross a river. They have a small boat that can hold either two boys or one soldier. How can all soldiers cross?)*
**Provided Answer:** None
**Explanation:** 
To get one soldier across while returning the boat to the original side, follow this sequence:
1. Both boys row across the river.
2. One boy gets out, and the other boy rows the boat back.
3. The boy gets out, and one soldier gets in and rows across.
4. The soldier gets out, and the first boy (who was waiting on the other side) rows the boat back.
At the end of this cycle, exactly **one soldier** has crossed, and both boys are back on the starting side with the boat. Repeat this process **10 times** to get all 10 soldiers across.

---

### 4. There are two candles which can burn in one hour each. You don't have stop watch or scale to measure. How you measure 90 and 45 minutes?
**Provided Answer:** "Similar to the rope problem"
**Check:** ✅ **Correct (Conceptually)**
**Explanation:** 
The note correctly relates it to the classic "burning rope" logic. Here is the exact method:
* **To measure 45 minutes:** Light Candle A at **both ends** and Candle B at **one end**. Candle A will burn out completely in 30 minutes. At the exact moment Candle A burns out, light the other end of Candle B. Candle B (which had 30 minutes of wax left) will now burn out twice as fast, taking 15 minutes. `30 + 15 = 45 minutes`.
* **To measure 90 minutes:** Light Candle A at **one end**. When it completely burns out (60 minutes), immediately light Candle B at **both ends**. Candle B will burn out in 30 minutes. `60 + 30 = 90 minutes`.

---

### 5. The day before yesterday my age was 21, Next year my age will be 24. When is my birthday?
**Provided Answer:** None
**Explanation:** 
The person's birthday is **December 31st**, and today's date is **January 1st**.
* **The day before yesterday (Dec 30):** The person was 21.
* **Yesterday (Dec 31):** It was their birthday, so they turned 22.
* **This year (on Dec 31):** They will turn 23.
* **Next year (on Dec 31):** They will turn 24.

---

### 6. Using seven 7's to get the answer as 100.
**Provided Answer:** None
**Explanation:** 
There are a few variations, but one of the most elegant using exactly seven 7's is:
`77 + 7 + 7 + 7 + (7 + 7) / 7 = 100`
Step-by-step:
1. `7 + 7 = 14`
2. `14 / 7 = 2`
3. `77 + 7 + 7 + 7 = 98`
4. `98 + 2 = 100`

---

### 7. Using 5 zeroes to get the answer as 120.
**Provided Answer:** None
**Explanation:** 
You can solve this by using factorials. The factorial of 0 (written as `0!`) is mathematically equal to 1.
Equation: `(0! + 0! + 0! + 0! + 0!)! = 120`
Step-by-step:
1. Replace each `0!` with `1`: `(1 + 1 + 1 + 1 + 1)!`
2. Sum the inside: `5!`
3. Calculate 5 factorial: `5 * 4 * 3 * 2 * 1 = 120`

---

### 8. Prove that 62 - 63 = 1. (You can change the place of only one number).
**Provided Answer:** None
**Explanation:** 
Move the `6` in `62` slightly upward to make it an exponent (power), turning it into `2^6` (two to the power of six).
`2^6 - 63 = 1`
Since `2^6 = 64`, the equation becomes `64 - 63 = 1`, which is correct.

---

### 9. Using 8 straight lines to draw 2 squares and 4 equilateral triangle.
**Provided Answer:** None
**Explanation:** 
This is a trick question regarding geometry and dimensions. 
* **2D Interpretation (Typo in original):** If you draw a large square (4 lines) and connect the midpoints of its sides with 4 more lines, you create a smaller inner square (rotated like a diamond). This uses 8 lines and creates 2 squares and 4 triangles at the corners (though they are *right* triangles, not equilateral). 
* **3D Interpretation:** A **Square Pyramid** has 8 edges (lines). The base is 1 square, and the 4 sides are 4 equilateral triangles. The "2 squares" in the prompt might be a typo for 1 square, or it refers to viewing the pyramid from a 2D top-down perspective where the outer perimeter and the vertex projection conceptually form shapes. 

---

### 10. Prove that one half of 12 is 7.
**Provided Answer:** None
**Explanation:** 
Write the number 12 in Roman numerals: **XII**
If you draw a horizontal line cutting the numeral in half horizontally, the top half leaves **VII**, which is the Roman numeral for 7.

---

### 11. How many squares in a chess board?
**Provided Answer:** None
**Explanation:** 
A chessboard is an 8x8 grid. To find the total number of squares of all sizes (1x1, 2x2, 3x3, etc.), you sum the squares of the numbers from 1 to 8:
`1² + 2² + 3² + 4² + 5² + 6² + 7² + 8²`
`1 + 4 + 9 + 16 + 25 + 36 + 49 + 64 = 204`
There are **204 squares** in total.

---

### 12. Draw 10 straight lines using 9 dots. (Each line should touch exactly 3 dots).
**Provided Answer:** None
**Explanation:** 
This cannot be solved by placing the 9 dots in a standard 3x3 square grid (which only yields 8 lines of 3). Instead, the dots must be arranged in a specific geometric pattern. One common solution is placing the dots in the shape of a **triangle with a center point and intersecting altitudes**, or arranging them on the intersections of a geometric star. By spacing the dots strategically at these intersecting nodes, you can draw exactly 10 lines that each pass through 3 dots.

---

### 13. A set of football matches is to be organized in a "round-robin" fashion... If 21 matches are totally played, how many teams participated?
**Provided Answer:** None
**Explanation:** 
In a round-robin tournament, the formula for total matches is `n * (n - 1) / 2`, where `n` is the number of teams.
`n * (n - 1) / 2 = 21`
`n² - n = 42`
`n² - n - 42 = 0`
Factoring the quadratic equation: `(n - 7)(n + 6) = 0`
Since the number of teams must be positive, `n = 7`.
There were **7 teams** participating.

---

### 14. What number should replace the question mark?
*(Visual context is missing from the document text)*
**Provided Answer:** 55
**Check:** ✅ **Presumed Correct**
**Explanation:** 
The original document lacks the visual sequence or diagram needed to calculate the answer. However, based on the provided answer of **55**, it is likely a sequence-based logic puzzle (such as a Fibonacci sequence, arithmetic progression, or visual pattern sum) where the final missing element evaluates to 55.

---

### 15. You have a big barrel full of milk and you have two cups which measures two litres and 5litres... You have to measure exact four litres.
**Provided Answer:** None
**Explanation:** 
1. Fill the **2-liter cup** from the barrel and pour it into the empty 5-liter cup. (The 5-liter cup now has 2 liters).
2. Fill the **2-liter cup** again from the barrel and pour it into the 5-liter cup.
3. The 5-liter cup now contains exactly **4 liters** of milk (`2 + 2 = 4`). No additional vessels or complex pouring are needed!
