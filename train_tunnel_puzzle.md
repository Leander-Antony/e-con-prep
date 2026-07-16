# Train Tunnel Puzzle

## Problem Statement
A man needs to go through a train tunnel to reach the other side. He starts running through the tunnel in an effort to reach his destination as soon as possible. When he is 1/4th of the way through the tunnel, he hears the train whistle behind him. Assuming the tunnel is not big enough for him and the train, he has to get out of the tunnel in order to survive. We know that the following conditions are true:
a. If he runs back, he will make it out of the tunnel by a whisker.
b. If he continues running forward, he will still make it out through the other end by a whisker.
What is the speed of the train compared to that of the man?

## Solution

Let the length of the tunnel be $L$. 
When the man hears the whistle, he is at distance **$L/4$** from the entrance of the tunnel. 
Let the man's speed be $v$ and the train's speed be $V$.

**Scenario A: Running Back**
If the man runs back to the entrance, he covers a distance of $L/4$. 
The problem states he makes it out "by a whisker," meaning the train arrives exactly at the tunnel entrance at the exact moment the man reaches it.
Therefore, the time it takes the man to run $L/4$ is the exact same time it takes the train to reach the entrance from its current position.

**Scenario B: Running Forward**
Now, imagine what happens if he runs forward instead. 
He starts at $L/4$ and runs forward. Let's look at the moment he has run another distance of $L/4$, bringing him to the halfway point ($L/2$) of the tunnel.

Because he just ran a distance of $L/4$, the time that has passed is identical to the time in Scenario A. 
We already established that in this amount of time, the train reaches the entrance of the tunnel.
So, when the man is exactly in the **middle** of the tunnel ($L/2$), the train is exactly at the **entrance**.

From this point, they both continue to the exit (the other end of the tunnel):
*   The man needs to run a distance of **$L/2$** (the remaining half of the tunnel).
*   The train needs to travel a distance of **$L$** (the full length of the tunnel).

The problem states that if he runs forward, he makes it out the other end "by a whisker." This means they both arrive at the exit at the exact same time.

Since they arrive simultaneously, and the train has to cover exactly twice the distance ($L$) compared to the man ($L/2$) in the same amount of time, the train must be moving twice as fast.

**Conclusion:**
The speed of the train is **twice** the speed of the man ($V = 2v$).
