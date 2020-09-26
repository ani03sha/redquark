---
title: 'Kadane Algorithm'
date: 2020-5-30 23:19:11
category: 'Concept Of The Day'
draft: false
---

Today, we are going to discuss about one of the most popular coding problem - **Kadane's Algorithm** or **Maximum Contiguous Subarray Sum** problem. 

## Contiguous Subarray
But... wait... what the heck is a contiguous subarray :confused:? A contiguous subarray is an array within another array whose elements are adjacent to each other.

For e.g., in a 1D array ```A = [-2, 2, 5, -11, 6]```, examples of contiguous subarrays are 

```[2, 5, -11]```, 

```[-11, 6]```, 

```[-2]``` etc.

## Problem
In this problem, we need to find one such contiguous array whose sum is the maximum among all the other contiguous subarrays. Some properties of this problem are - 

1. If the array contains all non-negative numbers, then the problem is trivial; a maximum subarray is the entire array.
2. If the array contains all non-positive numbers, then a solution is any subarray of size 1 containing the maximal value of the array (or the empty subarray, if it is permitted).
3. Several different sub-arrays may have the same maximum sum. [[Wikipedia](https://en.wikipedia.org/wiki/Maximum_subarray_problem)].

## Approach
The naive way to solve this method is the brute force approach where we will go through every single possible subarray and finding their respective sums. At the end, we will compare all the sums obtained and return the maximum of those.

As you must have guessed, brute force is not an efficient method to solve this problem. The time complexity is ```O(n^2)```. Is there a way to solve this problem faster? Yes, of course, the name of this post - Kadane's Algorithm.

This goes as follows - 
1. Scan the given array from left to right.
2. Keep track of ```local_maximum``` and ```global_maximum```.
3. ```local_maximum``` is the maximum of the current element and the sum of current element and previous maximum.
4. If ```local_maximum > global_maximum```, then update the global_maximum.
5. Return the ```global_maximum```.

### Pseudo code
```
local_maximum = A[0]
global_maximum = A[0]

for each element i in array: 
    local_maximum = max(A[i], local_maximum + A[i])
    if global_maximum < local_maximum: 
        global_maximum = local_maximum

return global_maximum
```

### Example
Let us understand this by dry running an example - 

```
A = [-2, 2, 5, -11, 6]

i = 0: 
local_maximum = -2
global_maximum = -2

i = 1: 
local_maximum = max(2, -2 + 2) = 2
global_maximum = 2

i = 2: 
local_maximum = max(5, 2 + 5) = 7
global_maximum = 7

i = 3: 
local_maximum = max(-11, -11 + 7) = -4
global_maximum = 7

i = 4: 
local_maximum = max(6, -4 + 6) = 6
global_maximum = 7

return 7
```

Since we are scanning the array only once from left to right, the time complexity is linear ```O(n)```.

## Code

Enough theory, let's get our hands dirty with some code.

### Java 
```java
public class KadaneAlgorithm {

    private static int maximumSum(int[] a) {
        if (a == null || a.length == 0) {
            return 0;
        }
        int globalMaximum = a[0];
        int localMaximum = a[0];
        for (int i = 1; i < a.length; i++) {
            localMaximum = Math.max(a[i], a[i] + localMaximum);
            if (globalMaximum < localMaximum) {
                globalMaximum = localMaximum;
            }
        }
        return globalMaximum;
    }

    public static void main(String[] args) {
        int[] a = new int[]{-2, -3, 4, -1, -2, 1, 5, -3};
        System.out.println("Maximum sum: " + maximumSum(a));

        a = new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println("Maximum sum: " + maximumSum(a));

        a = new int[]{0, 1, 2, -2, 3, 2};
        System.out.println("Maximum sum: " + maximumSum(a));

        a = new int[]{-2, 2, 5, -11, 6};
        System.out.println("Maximum sum: " + maximumSum(a));
    }
}
```

### Python
```python
def maximum_sum(a):
    if a is None or len(a) == 0:
        return 0
    global_maximum = a[0]
    local_maximum = a[0]
    for i in range(1, len(a)):
        local_maximum = max(a[i], local_maximum + a[i])
        if global_maximum < local_maximum:
            global_maximum = local_maximum
    return global_maximum


a = [-2, -3, 4, -1, -2, 1, 5, -3]
print(maximum_sum(a))

a = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(maximum_sum(a))

a = [0, 1, 2, -2, 3, 2]
print(maximum_sum(a))

a = [-2, 2, 5, -11, 6]
print(maximum_sum(a))

```

### Kotlin
```java
import kotlin.math.max

fun maximumSum(a: IntArray): Int {
    if (a.isEmpty()) {
        return 0
    }
    var globalMaximum = a[0]
    var localMaximum = a[0]
    for (i in 1 until a.size) {
        localMaximum = max(a[i], localMaximum + a[i])
        if (globalMaximum < localMaximum) {
            globalMaximum = localMaximum
        }
    }
    return globalMaximum
}

fun main() {
    var a = intArrayOf(-2, -3, 4, -1, -2, 1, 5, -3)
    println("Maximum sum: " + maximumSum(a))

    a = intArrayOf(-2, 1, -3, 4, -1, 2, 1, -5, 4)
    println("Maximum sum: " + maximumSum(a))

    a = intArrayOf(0, 1, 2, -2, 3, 2)
    println("Maximum sum: " + maximumSum(a))

    a = intArrayOf(-2, 2, 5, -11, 6)
    println("Maximum sum: " + maximumSum(a))
}
```

### JavaScript
```javascript
function maximum_sum(a) {
    if (!a || a.length == 0) {
        return 0;
    }
    let localMaximum = a[0];
    let globalMaximum = a[0];
    for(let i = 0; i < a.length; i++) {
        localMaximum = Math.max(a[i], localMaximum + a[i]);
        if(globalMaximum < localMaximum) {
            globalMaximum = localMaximum;
        }
    }
    return globalMaximum;
}

a = [-2, -3, 4, -1, -2, 1, 5, -3];
console.log(maximum_sum(a));

a = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maximum_sum(a));

a = [0, 1, 2, -2, 3, 2];
console.log(maximum_sum(a));

a = [-2, 2, 5, -11, 6];
console.log(maximum_sum(a));
```


## Conclusion
Phew :tired_face:!!! that's all about **Kadane's Algorithm**. You can find the complete source code on [GitHub](https://github.com/ani03sha/ConceptOfTheDay). 

Feel free to share your thoughts about this post in comments' section. I'd love to hear your feedback. Cheers! 😄