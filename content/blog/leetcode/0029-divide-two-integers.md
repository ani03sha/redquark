---
title: 'LeetCode #29 - Divide Two Integers'
date: 2020-12-17 12:57:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! It's a new day, and we have a new LeetCode problem in front of us.

- [Divide Two Integers](https://leetcode.com/problems/divide-two-integers/)

## Problem Statement
Given two integers `dividend` and `divisor`, divide two integers without using multiplication, division, and mod operator.

Return the quotient after dividing `dividend` by `divisor`.

The integer division should truncate toward zero, which means losing its fractional part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.

### Note:
Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−2<sup>31</sup>,  2<sup>31</sup> − 1]. For this problem, assume that your function returns 2<sup>31</sup> − 1 when the division result overflows.

### Constraints
- -2<sup>31</sup> ≤ `dividend`, `divisor` ≤ 2<sup>31</sup> - 1
- `divisor` != 0

### Examples

Example 1:
```
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = truncate(3.33333..) = 3.
```

Example 2:

```
Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = truncate(-2.33333..) = -2.
```

Example 3:

```
Input: dividend = 0, divisor = 1
Output: 0
```

Example 4:

```
Input: dividend = 1, divisor = 1
Output: 1
```

## Analysis
If we read the description of the problem, it looks like that this is a simple division problem. However, if we read further, we find a constraint that we cannot use **multiplication (x)**, **division (/)** and **modulo (%)** operations. This makes this problem a little tricky.

Also, one more constraint is that the result cannot be greater than 32-bit signed integer (from -2<sup>31</sup> to 2<sup>31</sup> - 1). If the result is outside this range, then we will return the minimum or maximum value of this range.

## Approach
The biggest dilemma in front of us is that we cannot use **multiplication (x)**, **division (/)** and **modulo (%)** operations. Then how the heck are we going to do this :thinking:?

The first approach that comes to mind is that we start from `quotient = 0` and loop until the `dividend` is greater than `divisor` and in each iteration, we subtract `divisor` from `dividend`. This seems to work fine and it also passes all the test cases but *it is slow*. Why? Let's take an example — say, we have `dividend = 2147483647` and `divisor = 1`. In that case, the loop will run 2147483647 iterations which is obviously very slow.

How can we improve this :thinking:? What if instead of decreasing the `dividend` linearly, we decrease it exponentially? This will definitely improve the performance drastically.



We can follow the below steps —

1. A variable `quotient` will keep the track of answer.
2. A `while` loop will check the condition `dividend >= divisor`
3. Inside this `while` loop, we will have one variable `shift` which will left shift the divisor by one bit and check if the result is less than the `dividend`. This will repeat until the condition is false.
4. Once, we are out of inner loop, then we will add the number of times we shifted to the `quotient`.
5. Also, we will now subtract the result of shifting to `divisor` from the `dividend` for the next iteration. Remember that since in the `while` loop the value of shifting had gone beyond the `dividend`, the value we need to subtract is one bit less shifted.
6. We will repeat the process unless we reach to the point where `divisor` is greater than `dividend`.

You must be wondering that why are we shifting the bits? The answer is, one left shift bit means the number is doubled. And since we cannot use **multiplication**, we are using left shifting.

### Time Complexity
Since the `divisor` is increasing exponentially, the time complexity will be ***O(log n)***.

### Space Complexity
No internal data structure has been used in the intermediate computations, the space complexity will be ***O(1)***.


## Code

### Java

```java
public class DivideTwoIntegers {

    public int divide(int dividend, int divisor) {
        // Check for overflow
        if (divisor == 0 || (dividend == Integer.MIN_VALUE && divisor == -1)) {
            return Integer.MAX_VALUE;
        }
        // Sign of result
        int sign = (dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0) ? -1 : 1;
        // Quotient
        int quotient = 0;
        // Take the absolute value
        long absoluteDividend = Math.abs((long) dividend);
        long absoluteDivisor = Math.abs((long) divisor);
        // Loop until the  dividend is greater than divisor
        while (absoluteDividend >= absoluteDivisor) {
            // This represents the number of bits shifted or
            // how many times we can double the number
            int shift = 0;
            while (absoluteDividend >= (absoluteDivisor << shift)) {
                shift++;
            }
            // Add the number of times we shifted to the quotient
            quotient += (1 << (shift - 1));
            // Update the dividend for the next iteration
            absoluteDividend -= absoluteDivisor << (shift - 1);
        }
        return sign == -1 ? -quotient : quotient;
    }
}
```

### Python

```python
class DivideTwoIntegers:
    def divide(dividend: int, divisor: int) -> int:
        # MAX and MIN values for integer
        MAX = 2147483647
        MIN = -2147483648
        # Check for overflow
        if divisor == 0 or (dividend == MIN and divisor == -1):
            return MAX
        # Sign of result`
        sign = -1 if (dividend > 0 and divisor < 0) or (dividend < 0 and divisor > 0) else 1
        # Quotient
        quotient = 0
        # Take the absolute value
        absoluteDividend = abs(dividend)
        absoluteDivisor = abs(divisor)
        # Loop until the  dividend is greater than divisor
        while absoluteDividend >= absoluteDivisor:
            # This represents the number of bits shifted or
            # how many times we can double the number
            shift = 0
            while absoluteDividend >= (absoluteDivisor << shift):
                shift += 1
            # Add the number of times we shifted to the quotient
            quotient += (1 << (shift - 1))
            # Update the dividend for the next iteration
            absoluteDividend -= absoluteDivisor << (shift - 1)
        return -quotient if sign == -1 else quotient
```

### JavaScript

```javascript
var divide = function (dividend, divisor) {
    const MAX = 2147483647;
    const MIN = -2147483648;
    // Check for overflow
    if (divisor === 0 || (dividend === MIN && divisor === -1)) {
        return MAX;
    }
    if (divisor === dividend) {
        return 1;
    }
    // Sign of result
    const sign = (dividend > 0 && divisor < 0) || (dividend < 0 && divisor > 0) ? -1 : 1;
    // Quotient
    let quotient = 0;
    // Take the absolute value
    let absoluteDividend = Math.abs(dividend);
    let absoluteDivisor = Math.abs(divisor);
    // Loop until the  dividend is greater than divisor
    while (absoluteDividend >= absoluteDivisor) {
        // This represents the number of bits shifted or
        // how many times we can double the number
        let shift = 0;
        let shiftedDivisor = absoluteDivisor;
        while (absoluteDividend >= shiftedDivisor) {
            shift++;
            shiftedDivisor = absoluteDivisor << shift;
            // To handle overflow using left shift operator in JS
            if (shiftedDivisor < 0) {
                break;
            }
        }
        // Add the number of times we shifted to the quotient
        quotient += (1 << (shift - 1));
        // Update the dividend for the next iteration
        absoluteDividend -= absoluteDivisor << (shift - 1);
    }
    return sign === -1 ? -quotient : quotient;
};
```

### Kotlin

```java
class DivideTwoIntegers {

    fun divide(dividend: Int, divisor: Int): Int {
        // Check for overflow
        if (divisor == 0 || dividend == Int.MIN_VALUE && divisor == -1) {
            return Int.MAX_VALUE
        }
        // Sign of result
        val sign = if (dividend > 0 && divisor < 0 || dividend < 0 && divisor > 0) -1 else 1
        // Quotient
        var quotient = 0
        // Take the absolute value
        var absoluteDividend = Math.abs(dividend.toLong())
        val absoluteDivisor = Math.abs(divisor.toLong())
        // Loop until the  dividend is greater than divisor
        while (absoluteDividend >= absoluteDivisor) {
            // This represents the number of bits shifted or
            // how many times we can double the number
            var shift = 0
            while (absoluteDividend >= absoluteDivisor shl shift) {
                shift++
            }
            // Add the number of times we shifted to the quotient
            quotient += 1 shl shift - 1
            // Update the dividend for the next iteration
            absoluteDividend -= absoluteDivisor shl shift - 1
        }
        return if (sign == -1) -quotient else quotient
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/DivideTwoIntegers.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Divide_Two_Integers.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/divide_two_integers.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/DivideTwoIntegers.kt)

## Conclusion

Congratulations :clap:! Today we solved a new problem which uses bit manipulations.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!