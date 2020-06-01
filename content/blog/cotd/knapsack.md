---
title: '0/1 Knapsack Problem'
date: 2020-6-02 00:47:00
category: 'Concept Of The Day'
draft: false
---

The **Knapsack Problem** is a problem in combinatorial optimization which means one has to find optimal object from a set of finite objects. And it is another one of the most popular problem in computer science.

![knapsack](../media/knapsack.svg)

Let's first understand what is the ask in this problem? What do we need to find out?

> **We will be given a bunch of items with certain weights w and values v along with maximum weight W a Knapsack can hold. Our task is to choose the items whose combined weights is less than or equal to W with the maximum value. Any item can either be selected or not selected (0 or 1).**

Wait... what? 😕 confused? You're supposed to be. But don't worry, we can understand this together in simpler terms. What's better than a real world example to understand something.

## Knapsack problem in simpler terms
Suppose your neighborhood store is giving an offer where they will give you a shopping cart and will ask you to go inside the store to fill the cart with any item (with a certain value) of your choice. You can choose as many items as you can :heart_eyes:. But there's a catch... the only condition is that the items you choose cannot overfill the cart. Also, you cannot pick an item more than once.

What will you do? Of course, you will try to choose the values so that your selection will have the maximum values keeping in mind that your cart doesn't get overfilled. Does this ring a bell :bell:? Yes, this is exactly we are trying to accomplish in Knapsack problem.

You are given a fixed weight W (shopping cart's capacity) and items with a certain weight w and value v. Your task is to maximize the combined value keeping total weight of items <= W. The **0/1** comes from the fact that we can either select an item or not select an item. We cannot take a part of it.

## Approach
Let's take an example to understand more about this problem. You are given the following - 

1. Value array containing values of each item ```value[] = {60, 100, 120}```.
2. Weight array containing weights of individual items ```weight[] = {10, 20, 30}```.
3. Total weight of the Knapsack ```W = 50```.

Thus, we want to make sure we choose items whose combined weights is less than or equal to 50 as well as they are of combined maximum value.

Now, a naive solution is to consider all subsets of items and calculate their combined weights and values. Now, choose only subsets whose combined weight is less than 50. Among those subsets, choose the one with maximum value.

**Case 1**
Select item with weight 10 alone ```V = 60```. Since ```10 < 50```, there's room for more.

**Case 2**
Select item with weight 20 alone ```V = 100```. Since ```20 < 50```, there's room for more.

**Case 3**
Select item with weight 30 alone ```V = 120```. Since ```30 < 50```, there's room for more.

**Case 4**
Select items with weight 10 and 20 ```V = 60 + 100 = 160```. Since ```10 + 20 = 30 < 50```, there's room for more.

**Case 5**
Select items with weight 10 and 30 ```V = 60 + 120 = 180```. Since ```10 + 30 = 40 < 50```, there's room for more.

**Case 6**
Select items with weight 20 and 30 ```V = 100 + 120 = 220```. Since ```20 + 30 = 50 == 50```, this can be the solution.

**Case 7**
Select all items ```V = 60 + 100 + 120 = 280```. Since ```10 + 20 + 30 = 60 > 50```, this cannot be the solution.

From above, we can easily deduce that items with weight 20 and 30 are the correct combination to choose.

But come on, do we really want to do this :unamused:? Don't we have a better solution? In fact, we do! The answer is good old **dynamic programming**.

### Understanding the usage of DP
Let us randomly select an item from the list of items. For e.g., let me choose item with weight 20. I put this in the Knapsack, now, what is the capacity left of the Knapsack? The answer is, 50(total weight W) - 20(weight of the selected item) = 30. At this point, we only have to solve the problem for ```W = 30```. If we don't select 20, then we will still have ```W = 50``` and remaining list of items. Do you see the pattern? Yes, at each step the problem is reduced to a smaller problem.

We need to define a function that will give us the maximum value. Let this function be defined as - 

```
int getMaximumValue(W, n, w[], v[])

where, 
W => Maximum capacity of the Knapsack
n => Number of items to choose from
w[] => Array of weights of each item
v[]  => Array of values of each item
```

Now, we can solve this problem by using the following steps -
- Either we choose the ```i```th item with weight ```wi``` and value ```vi```. In this case, number of items remaining to choose from will be ```n-1```. The function call will look like - 
```
int getMaximumValue(W-wi, n-1, w[], v[])
```
- Or, we don't choose the item. In this case, the function call will look like -
```
int getMaximumValue(W, n-1, w[], v[])
```

Since we have to maximize the value, we will have to consider the maximum of the output of the above two conditions as - 
```
max(getMaximumValue(W-wi, n-1, w[], v[]) + vi, getMaximumValue(W, n-1, w[], v[]))
```

In the first argument, we added vi because we included the item in the Knapsack while we didn't in the second case. Therefore, to solve this problem, we only have to call this function recursively until either W or n becomes zero.

> Have you noticed something? Yes, we have identified just encountered **Optimal Substructure** property of DP. Good job! 😎

But, if you percolate the function calls, you will find that we are solving a subproblem more than once. This is not ideal, right?

> What have we encountered now? Yes, **Overlapping Subproblems**. 

To tackle above, we will have to generate a lookup table of already calculated results. This will make our solution faster.

## Code

So much for the theory, eh? Now, let's dive into the interesting part. Coding!!!

### Java
```java
public class Knapsack {

    public static int getMaximumValue(int W, int n, int[] weights, int[] values) {
        // Create the lookup table
        int[][] lookup = new int[n + 1][W + 1];
        // Solve for each case
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= W; j++) {
                // Base condition - no item, no capacity
                if (i == 0 || j == 0) {
                    lookup[i][j] = 0;
                }
                // If we include the i-th item
                else if (weights[i - 1] <= j) {
                    lookup[i][j] = Math.max(values[i - 1] + lookup[i - 1][j - weights[i - 1]], lookup[i - 1][j]);
                }
                // If we have out of the capacity
                else {
                    lookup[i][j] = lookup[i - 1][j];
                }
            }
        }
        return lookup[n][W];
    }

    public static void main(String[] args) {
        int[] weights = new int[]{10, 20, 30};
        int[] values = new int[]{60, 100, 120};
        int W = 50;
        int n = weights.length;
        System.out.println("Maximum value: " + getMaximumValue(W, n, weights, values));
    }
}
```

### Python
```python
def get_maximum_value(W, n, weights, values):
    # Lookup table for memoization
    lookup = [[0 for i in range(W + 1)] for j in range(n + 1)]
    # Loop for items
    for i in range(n + 1):
        for j in range(W + 1):
            # Base condition - no item, no capacity
            if i == 0 or j == 0:
                lookup[i][j] = 0
            # For the i-th item
            elif weights[i - 1] <= j:
                lookup[i][j] = max(values[i - 1] + lookup[i - 1][j - weights[i - 1]], lookup[i - 1][j])
            # Take the values from the previous row
            else:
                lookup[i][j] = lookup[i - 1][j]
    return lookup[n][W]


weights = [10, 20, 30]
values = [60, 100, 120]
W = 50
n = len(weights)

print("Maximum value: ", get_maximum_value(W, n, weights, values))
```

### Kotlin
```kotlin
import kotlin.math.max

fun getMaximumValue(W: Int, n: Int, weights: IntArray, values: IntArray): Int {
    // Lookup table
    val lookup = Array(n + 1) { i -> Array(W + 1) { j -> 0 } }
    // Loop for each case
    for (i in 0..n) {
        for (j in 0..W) {
            // Base condition - no item, no capacity
            if (i == 0 || j == 0) {
                lookup[i][j] = 0
            }
            // For the i-th element
            else if (weights[i - 1] <= j) {
                lookup[i][j] = max(values[i - 1] + lookup[i - 1][j - weights[i - 1]], lookup[i - 1][j])
            }
            // For all other cases take value from the previous row
            else {
                lookup[i][j] = lookup[i - 1][j]
            }
        }
    }
    return lookup[n][W]
}

fun main() {
    val weights = intArrayOf(10, 20, 30)
    val values = intArrayOf(60, 100, 120)
    val W = 50
    val n = weights.size
    println("Maximum sum: " + getMaximumValue(W, n, weights, values))
}
```

### JavaScript
```javascript
function getMaximumValue(W, n, weights, values) {
    // Lookup table
    let lookup = Array.from(Array(n + 1), () => new Array(W + 1))
    // Check for each case
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= W; j++) {
            // Base condition - no item, no capacity
            if (i == 0 || j == 0) {
                lookup[i][j] = 0;
            }
            // If we consider the i-th element
            else if (weights[i - 1] <= j) {
                lookup[i][j] = Math.max(values[i - 1] + lookup[i - 1][j - weights[i - 1]], lookup[i - 1][j]);
            }
            // For all other cases, get the values from previous row
            else {
                lookup[i][j] = lookup[i - 1][j];
            }
        }
    }
    return lookup[n][W];
}

function create2DArray(rows, columns) {
    let lookup = [];
}

const weights = [10, 20, 30];
const values = [60, 100, 120];
const W = 50;
const n = weights.length;

console.log("Maximum value: " + getMaximumValue(W, n, weights, values));
```

**The time and space complexity of this approach is ```O(n)(W)```**.


## Conclusion

So, in this post, we learned about yet another problem that sounds tricky but actually pretty simple. I hope you enjoyed this post.

You can find the code on my [GitHub]() repository. If you like it, please share your thoughts in the comment.

See ya 🙂.