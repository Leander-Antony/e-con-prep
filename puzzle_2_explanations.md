# Puzzle 2 - Explanations and Solutions

This document provides detailed explanations and solutions for all the puzzles extracted from `Puzzle 2.docx`.

---

### 1. You have 10 boxes of balls (each ball weighing exactly 10 gm) with one box with defective balls (each one of the defective balls weighs 9 gm). You are given an electronic weighing machine and only one chance at it. How will you find out which box has the defective balls?
**Explanation:** 
You can find the defective box by weighing a specific combination of balls. 
Take 1 ball from the 1st box, 2 balls from the 2nd box, 3 balls from the 3rd box, and so on, up to 10 balls from the 10th box.
Place all these 55 balls on the weighing scale. 
* If all balls were normal (10 gm each), the total weight would be exactly `55 * 10 = 550 gm`. 
* Since one box has defective balls (weighing 1 gm less each), the total weight will be less than 550 gm. 
To find the defective box, simply subtract the actual weight shown on the scale from 550. The difference will exactly match the number of the defective box. 
(For example, if the scale shows 543 gm, `550 - 543 = 7`, meaning the 7th box is defective).

---

### 2. [Blank in original text]
**Explanation:** The original document skips puzzle 2 or leaves it blank.

---

### 3. You have three jars that are all mislabelled. One contains apples, another has grapes, and the third has a mix of both. Now you are allowed to open any one jar and you can able to see one fruit... How could you fix the labels on the jars?
**Explanation:** 
Open the jar labelled **"Mix"**. 
Since you know *all* jars are mislabelled, the jar labelled "Mix" cannot actually contain the mix. It must contain either only apples or only grapes. 
* If you pull out an **Apple**, you know this jar contains only Apples. Now you have two jars left, labelled "Apples" and "Grapes". The one labelled "Grapes" cannot be Grapes (since it's mislabelled), and it cannot be Apples (since you just found the Apples). Therefore, the jar labelled "Grapes" must be the **Mix**. That leaves the jar labelled "Apples" to be the **Grapes**.
* The same logic applies inversely if you pull out a Grape from the "Mix" jar.

---

### 4. You have a set of 3 light switches outside a closed door. One of them controls the light inside the room... How would you determine which of the three light switches controls the light inside the room?
**Explanation:** 
1. Turn **Switch 1** ON and leave it on for about 5–10 minutes.
2. Turn **Switch 1** OFF and immediately turn **Switch 2** ON.
3. Leave **Switch 3** OFF.
4. Now, enter the room.
* If the light is **ON**, it is controlled by **Switch 2**.
* If the light is **OFF** but the bulb is **WARM** to the touch, it is controlled by **Switch 1** (which was on long enough to heat it up).
* If the light is **OFF** and the bulb is **COLD**, it is controlled by **Switch 3**.

---

### 5. Postman Pat delivers the mail in the small village Ten houses... Which two houses did he not deliver to?
*(The prompt details delivery sums for the week: Mon=18, Tue=12, Wed=23, Thu=19, Fri=32, Sat=25)*
**Explanation:** 
The total sum of all deliveries for the week is `18 + 12 + 23 + 19 + 32 + 25 = 129`. 
Since Pat visited 4 houses a day for 6 days, he made 24 deliveries. The prompt states that 8 houses received mail 3 times each, which perfectly accounts for all 24 deliveries (`8 * 3 = 24`). 
Because each of those 8 houses was visited exactly 3 times, the sum of those 8 unique house numbers must be `129 / 3 = 43`.
The sum of all 10 houses in the village is `1 + 2 + 3 + ... + 10 = 55`.
Therefore, the sum of the two houses he *did not* visit is `55 - 43 = 12`. 
The possible pairs summing to 12 are (2,10), (3,9), (4,8), and (5,7). 
On Friday, the sum of 4 visited houses was 32. The only possible combinations of 4 houses under 10 that sum to 32 are `(10, 9, 8, 5)` and `(10, 9, 7, 6)`. This means houses 10 and 9 *must* have been visited. This eliminates (2,10) and (3,9). 
On Tuesday, the sum of 4 visited houses was 12. The only combinations summing to 12 are `(1, 2, 3, 6)` and `(1, 2, 4, 5)`.
If the missing houses were (5,7), then Friday's required sum of 32 would be impossible (since both combinations for 32 require either a 5 or a 7). 
Therefore, the two houses that did not receive mail must be **4 and 8**.

---

### 6. There is a Six digit number and the sum of the digits is 43. Conditions: It may be a square number, It may be a cube number, the value under 500000. Exactly two are true. Find the number?
**Explanation:** 
Any number's digital root is the same as its remainder when divided by 9. The sum of the digits is 43, so `4 + 3 = 7`. This means the number modulo 9 is 7. 
Mathematically, a perfect cube modulo 9 can only ever equal 0, 1, or 8. Therefore, the condition "It may be a cube number" **must be the false condition**. 
This means the number is definitely a perfect square and is definitely under 500,000. 
We need to find a perfect square under 500,000 whose digits sum to 43. Checking perfect squares in the high 400,000s range (to get large digits), we look at `707^2`, which equals **499,849**. 
The sum of its digits is `4 + 9 + 9 + 8 + 4 + 9 = 43`. 
The number is **499,849**.

---

### 7. A three digit number consists of 9, 5 and one more number. When these digits are reversed and then subtracted from the original number the answer yielded will be consisting of the same digits arranged yet in a different order. What is the other digit?
**Explanation:** 
Let the 3-digit number be $N_1 = 100a + 10b + c$, and the reversed number be $N_2 = 100c + 10b + a$. 
When you subtract a reversed 3-digit number from the original, the result is always a multiple of 99: $N_1 - N_2 = 99(a - c)$. 
We know the result must be a 3-digit number containing the digits 9, 5, and the unknown digit `x`. 
Looking at the multiples of 99: 198, 297, 396, **495**, 594, 693, 792, 891. 
The only multiple of 99 that contains a 9 and a 5 is **495**. 
Since 495 is made of the digits 4, 9, and 5, the missing digit must be **4**. 
(Verification: The original number is 954. Reversed is 459. `954 - 459 = 495`).

---

### 8. You are shipwrecked on an island... There are twin brothers... one is honest, and the other always lies. You may ask one of them a single question. What should it be?
**Explanation:** 
You should ask either brother: **"If I were to ask your brother which path leads to the safe village, what would he say?"** 
Once they answer, you must take the **opposite** path. 
* If you ask the honest brother, he will truthfully tell you the liar's answer (which is a lie pointing to the cannibals). 
* If you ask the liar brother, he will lie about the honest brother's answer (who would point to the village), so the liar will also point to the cannibals. 
In both cases, they will point to the dangerous path, so you take the other one!

*(Follow-up: What if there is just one person?)*
Ask: **"If I asked you which path leads to the safe village, which way would you point?"**
* An honest person will point to the safe village.
* A liar *would* normally point to the cannibals, but since they have to lie about what they *would* do, they are forced by double negation to point to the safe village instead.

---

### 9. Use the numbers between 0 to 9... ABCDE * 4 = EDCBA. Find A, B, C, D, E?
**Explanation:** 
1. `A` must be 2. If it were 3 or higher, `30,000 * 4 = 120,000` (which is 6 digits). It cannot be 1 because `4 * E` will always result in an even number, so the last digit `A` must be even. So, `A = 2`.
2. Since `A = 2`, `E` must be 8 (because `4 * 8 = 32`, ending in 2). 
3. Now we have `2BCD8 * 4 = 8DCB2`. Since `4 * 2 = 8` exactly, there is no carryover from the thousands place, meaning `B` must be small enough that `4 * B` is less than 10. `B` could be 0, 1, or 2, but since digits are unique, `B = 1` or `0`.
4. Working through the multiplication (`4 * D + 3 ends in B`) and testing `B = 1`, we find `D = 7`.
5. Testing the remaining digits yields `C = 9`. 
Result: **A = 2, B = 1, C = 9, D = 7, E = 8**. (21978 * 4 = 87912).

---

### 10. Using five 9 make it 1000?
**Explanation:** 
`999 + (9 / 9) = 1000`

---

### 11. Using five 5 have to make 37?
**Explanation:** 
You can use factorials (where `5! = 5 * 4 * 3 * 2 * 1 = 120`).
Equation: `(5! + 5! - 55) / 5 = 37`
Step-by-step:
1. `120 + 120 = 240`
2. `240 - 55 = 185`
3. `185 / 5 = 37`
This uses exactly five 5's: two factorials, one 55, and one divided by 5.

---

### 12. Using four 7 you have to make 100.
**Explanation:** 
You can achieve this using decimals. 
Equation: `77 / .77 = 100`

---

### 13. By Using seven 7 can you get 98?
**Explanation:** 
You can easily make 98 with five 7s (`77 + 7 + 7 + 7 = 98`). To satisfy the requirement of exactly seven 7s without changing the value, you can multiply the entire equation by `(7 / 7)` which equals 1.
Equation: `(77 + 7 + 7 + 7) * (7 / 7) = 98`

---

### 14. Using eight 8 you have to make 1000.
**Explanation:** 
`888 + 88 + 8 + 8 + 8 = 1000`

---

### 15. 2 fathers and 2 sons go fishing. Each of them catches one fish, So, why do they bring home only 3 fish?
**Explanation:** 
Because there are only 3 people on the trip: A grandfather, a father, and a son. 
* The grandfather is a father. 
* The father is both a father (to his son) and a son (to the grandfather). 
* The son is a son. 
This yields exactly 2 fathers and 2 sons, but only 3 individuals in total. 
