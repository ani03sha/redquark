---
title: 'LeetCode #7 - Reverse Integer'
date: 2020-10-26 12:17:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! It's a new day and it's time for looking into another LeetCode problem.

- [Reverse Integer](https://leetcode.com/problems/reverse-integer/)

## Problem Statement
Given a 32-bit signed integer, reverse digits of an integer.

### Note:
Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−2<sup>31</sup>,  2<sup>31</sup> − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

### Constraints:
-2<sup>31</sup> <= x <= 2<sup>31</sup> - 1

## Examples

Example 1: 
```
Input: x = 123
Output: 321
```

Example 2: 
```
Input: x = -123
Output: -321
```

Example 3: 
```
Input: x = 120
Output: 21
```

Example 4: 
```
Input: x = 0
Output: 0
```

## Analysis
This problem is pretty straightforward :smile:. To reverse an integer, we only have to make most significant digit as the least significant digit and vice versa, the second most significant digit to the second least significant digit and vice versa and so on.

There are couple of things we need to keep in mind - 
1. If the input is negative, the output will also be negative
2. If the input is greater than the given range (−2<sup>31</sup>,  2<sup>31</sup> − 1), return 0.


## Approach
The approach is simple - 
1. First we find out if the number is negative then we will store this information.
2. First store the result in a data type which is bigger than an integer (for e.g., `long` in case of Java/Kotlin)/
3. Divide the number repeatedly by 10 until the number becomes zero.
4. After the loop check if the output is greater than the range (−2<sup>31</sup>,  2<sup>31</sup> − 1).
5. At last, return the output with the correct sign (positive or negative).

### Time Complexity
Since we are going through the entire number digit by digit, the time complexity should be ***O(log<sub>10</sub>n)***. The reason behind *log<sub>10</sub>* is because we are dealing with integers which are base 10.

### Space Complexity
We are not using any data structure for interim operations, therefore, the space complexity is ***O(1)***.


## Code

### Java

```java
public class ReverseInteger {

    public int reverse(int x) {
        boolean isNegative = false;
        if (x < 0) {
            isNegative = true;
            x = -x;
        }
        long reverse = 0;
        while (x > 0) {
            reverse = reverse * 10 + x % 10;
            x /= 10;
        }
        if (reverse > Integer.MAX_VALUE) {
            return 0;
        }
        return (int) (isNegative ? -reverse : reverse);
    }
}
```

### Python

```python
def reverse(x: int) -> int:
    isNegative = False
    if x < 0:
        isNegative = True
        x = -x
    reversedNumber = 0
    while x:
        reversedNumber = reversedNumber * 10 + x % 10
        x //= 10
    if reversedNumber >= 2 ** 31 - 1 or reversedNumber <= -2 ** 31:
        return 0
    return -reversedNumber if isNegative else reversedNumber
```

### JavaScript

```javascript
var reverse = function(x) {
    let isNegative = false;
    if (x < 0) {
        isNegative = true;
        x = -x;
    }
    let reverse = 0;
    while (x > 0) {
        reverse = reverse * 10 + x % 10;
        x = parseInt(x / 10);
    }
    if (reverse >= Math.pow(2, 31) - 1 || reverse <= Math.pow(-2, 31)) {
        return 0;
    }
    return isNegative ? -reverse : reverse;
};
```

### Kotlin

```java
fun reverse(x: Int): Int {
    var num = x
    var isNegative = false
    if (num < 0) {
        isNegative = true
        num = -num
    }
    var reverse: Long = 0
    while (num > 0) {
        reverse = reverse * 10 + num % 10
        num /= 10
    }
    return if (reverse > Int.MAX_VALUE) {
        0
    } else (if (isNegative) -reverse else reverse).toInt()
}
```


## Conclusion

Today we discussed how to solve LeetCode problem - **Reverse integer**.

I hope you have enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn. feel free to fork 🔪 and star ⭐ it.

- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/ReverseInteger.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Reverse_Integer.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/reverse_integer.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/ReverseInteger.kt)

Till next time… Happy coding 😄 and Namaste :pray:!
