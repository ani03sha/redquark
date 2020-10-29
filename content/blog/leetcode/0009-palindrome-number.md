---
title: 'LeetCode #9 - Palindrome Number'
date: 2020-10-29 16:14:00
category: 'LeetCode'
draft: false
---

Hello happy people :wave:! Today we will look into a fairly easy LeetCode problem

- [Palindrome Number](https://leetcode.com/problems/palindrome-number/)

## Problem Statement

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

**Follow up:** Could you solve it without converting the integer to a string?

### Constraints:

-2<sup>31</sup> <= x <= 2<sup>31</sup> - 1

### Examples

Example 1: 

```
Input: x = 121
Output: true
```

Example 2: 

```
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

Example 3: 

```
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

Example 4: 

```
Input: x = -101
Output: false
```

## Analysis

We need to find if a give number is palindrome or not. A palindrome number is one which when reversed gives the same number. For e.g, 747 is Palindrome number and 526 is not because when reversed it gives 625 which is not equal to 526.

Also, as it is evident from the examples that negative numbers are not palindromes because they start with `-` and when reversed the `-` sign will come at the end which is invalid. Therefore, we only have to check for positive numbers

## Approach

We can easily solve this problem by reversing the given number and comparing the reversed number with the given number.

1. If the number is negative, return `false`, else proceed to #2.
2. Store the given number `x` in a variable `number`. We are doing it because we will perform our operations on `number` and due to that, it's value will change. We will use `x` at the end of the program to compare with the reversed number.
3. Reverse the number (Just like [LeetCode #7 - Reverse Integer](https://redquark.org/leetcode/0007-reverse-integer/)).
4. Return `true` if the reverse number and given number are equal, `false` otherwise.

### Time Complexity
Since we are going through the entire number digit by digit, the time complexity should be ***O(log<sub>10</sub>n)***. The reason behind *log<sub>10</sub>* is because we are dealing with integers which are base 10.

### Space Complexity
We are not using any data structure for interim operations, therefore, the space complexity is ***O(1)***.

Let's get our hands dirty with code :heart_eyes:.


## Code

### Java

```java
public class PalindromeNumber {

    public boolean isPalindrome(int x) {
        // Base condition
        if (x < 0) {
            return false;
        }
        // Store the number in a variable
        int number = x;
        // This will store the reverse of the number
        int reverse = 0;
        while (number > 0) {
            reverse = reverse * 10 + number % 10;
            number /= 10;
        }
        return x == reverse;
    }
}
```

### Python

```python
def isPalindrome(x: int) -> bool:
    # Base condition
    if x < 0:
        return False
    # Store the number in a variable
    number = x
    # This will store the reverse of the number
    reverse = 0
    while number:
        reverse = reverse * 10 + number % 10
        number //= 10
    return x == reverse
```

### JavaScript

```javascript
var isPalindrome = function(x) {
    // Base condition
    if (x < 0) {
        return false;
    }
    // Store the number in a variable
    let number = x;
    // This will store the reverse of the number
    let reverse = 0;
    while (number > 0) {
        reverse = reverse * 10 + number % 10;
        number = parseInt(number / 10);
    }
    return x === reverse;
};
```

### Kotlin

```java
fun isPalindrome(x: Int): Boolean {
    // Base condition
    if (x < 0) {
        return false
    }
    // Store the number in a variable
    var number = x
    // This will store the reverse of the number
    var reverse = 0
    while (number > 0) {
        reverse = reverse * 10 + number % 10
        number /= 10
    }
    return x == reverse
}
```


## Conclusion

Congratulations :clap:!!! We've solved yet another problem from LeetCode and it didn't take too much of our sweat, did it?

I hope you have enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn. feel free to fork 🔪 and star ⭐ it.

- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/PalindromeNumber.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Palindrome_Number.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/palindrome_number.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/PalindromeNumber.kt)

Till next time… Happy coding 😄 and Namaste :pray:!