---
title: 'LeetCode #8 - String To Integer (atoi)'
date: 2020-10-28 07:50:00
category: 'LeetCode'
draft: false
---

Hey LeetCode enthusiasts :wave:! It's time to look at yet another problem from LeetCode

- [String To Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

## Problem Statement

Implement `atoi` which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

### Note:

Only the space character ' ' is considered a whitespace character.
Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−2<sup>31</sup>,  2<sup>31</sup> − 1]. If the numerical value is out of the range of representable values, INT_MAX (2<sup>31</sup> − 1) or INT_MIN (−2<sup>31<sup>) is returned.

### Constraints
- 0 <= s.length <= 200
- s consists of English letters (lower-case and upper-case), digits, ' ', '+', '-' and '.'.

### Examples

Example 1: 

```
Input: str = "42"
Output: 42
```

Example 2: 

```
Input: str = "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign. Then take as many numerical digits as possible, which gets 42.
```

Example 3: 

```
Input: str = "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
```

Example 4: 

```
Input: str = "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical digit or a +/- sign. Therefore no valid conversion could be performed.
```

Example 5: 

```
Input: str = "-91283472332"
Output: -2147483648
Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer. Therefore INT_MIN (−2^31) is returned.
```

## Analysis
From the problem statement and examples, it is clear that we only want to convert those strings which starts either from `<whitespace>`, `-`, `+` or numbers `0,1,2,3,4,5,6,7,8,9` and we also don't care about the non-number characters after the number characters.

## Approach
This is a very straightforward problem which can be easily solved with the following steps - 
1. Check if the string is `null` or empty string. If it is, return 0.
2. Remove all the leading whitespaces from the given string (if any).
3. If the string has `-` or `+` character at the start, we will keep it stored in a boolean flag.
4. Loop for each character in the remaining string ***if and only if*** they are from the set `[0,1,2,3,4,5,6,7,8,9]`.
5. Store the result after each iteration in a variable `number`.
6. Check if the resultant number is less than -2<sup>31</sup> or more than 2<sup>31</sup> - 1 and return the return the result accordingly.
7. Else return the calculated `number` as result.

And thattsss it!!! Easy peasy, right? :smile:

### Time Complexity

Since we are going through the entire number digit by digit, the time complexity should be ***O(log<sub>10</sub>n)***. The reason behind *log<sub>10</sub>* is because we are dealing with integers which are base 10.

### Space Complexity
We are not using any data structure for interim operations, therefore, the space complexity is ***O(1)***.


## Code

### Java

```java
public class StringToInteger {

    private static int myAtoi(String str) {
        // Base condition
        if (str == null || str.length() < 1) {
            return 0;
        }
        // MAX and MIN values for integers
        final int INT_MAX = 2147483647;
        final int INT_MIN = -2147483648;
        // Trimmed string
        str = str.replaceAll("^\\s+", "");
        // Counter
        int i = 0;
        // Flag to indicate if the number is negative
        boolean isNegative = str.startsWith("-");
        // Flag to indicate if the number is positive
        boolean isPositive = str.startsWith("+");
        if (isNegative) {
            i++;
        } else if (isPositive) {
            i++;
        }
        // This will store the converted number
        double number = 0;
        // Loop for each numeric character in the string iff numeric characters are leading
        // characters in the string
        while (i < str.length() && str.charAt(i) >= '0' && str.charAt(i) <= '9') {
            number = number * 10 + (str.charAt(i) - '0');
            i++;
        }
        // Give back the sign to the converted number
        number = isNegative ? -number : number;
        if (number < INT_MIN) {
            return INT_MIN;
        }
        if (number > INT_MAX) {
            return INT_MAX;
        }
        return (int) number;
    }
}
```

### Python

```python
def myAtoi(s: str) -> int:
    # Base condition
    if s is None or len(s) < 1:
        return 0
    # Max and Min values for the integers
    INT_MAX = 2147483647
    INT_MIN = -2147483648
    # Trimmed string
    s = s.lstrip()
    # Counter
    i = 0
    # Flag to indicate if the number is negative
    isNegative = len(s) > 1 and s[0] == '-'
    # Flag to indicate if the number is positive
    isPositive = len(s) > 1 and s[0] == '+'
    if isNegative:
        i += 1
    elif isPositive:
        i += 1
    # This will store the converted number
    number = 0
    # Loop for each numeric character in the string iff numeric characters are leading
    # characters in the string
    while i < len(s) and '0' <= s[i] <= '9':
        number = number * 10 + (ord(s[i]) - ord('0'))
        i += 1
    # Give back the sign to the number
    if isNegative:
        number = -number
    # Edge cases - integer overflow and underflow
    if number < INT_MIN:
        return INT_MIN
    if number > INT_MAX:
        return INT_MAX
    return number
```

### JavaScript

```javascript
var myAtoi = function (str) {
    // Base condition
    if (!str) {
        return 0;
    }
    // MAX and MIN values for integers
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;
    // Trimmed string
    str = str.trim();
    // Counter
    let i = 0;
    // Flag to indicate if the number is negative
    const isNegative = str[0] === '-';
    // Flag to indicate if the number is positive
    const isPositive = str[0] === '+';
    if (isNegative) {
        i++;
    } else if (isPositive) {
        i++;
    }
    // This will store the converted number
    let number = 0;
    // Loop for each numeric character in the string iff numeric characters are leading
    // characters in the string
    while (i < str.length && str[i] >= '0' && str[i] <= '9') {
        number = number * 10 + (str[i] - '0');
        i++;
    }
    // Give back the sign to the converted number
    number = isNegative ? -number : number;
    if (number < INT_MIN) {
        return INT_MIN;
    }
    if (number > INT_MAX) {
        return INT_MAX;
    }
    return number;
};
```

### Kotlin

```java
fun myAtoi(s: String): Int {
    var str = s
    // Base condition
    if (str.isEmpty()) {
        return 0
    }
    // MAX and MIN values for integers
    val max = 2147483647
    val min = -2147483648
    // Trimmed string
    str = str.replace("^\\s+".toRegex(), "")
    // Counter
    var i = 0
    // Flag to indicate if the number is negative
    val isNegative: Boolean = str.startsWith("-")
    // Flag to indicate if the number is positive
    val isPositive: Boolean = str.startsWith("+")
    if (isNegative) {
        i++
    } else if (isPositive) {
        i++
    }
    // This will store the converted number
    var number = 0.0
    // Loop for each numeric character in the string iff numeric characters are leading
    // characters in the string
    while (i < str.length && str[i] >= '0' && str[i] <= '9') {
        number = number * 10 + (str.get(i) - '0')
        i++
    }
    // Give back the sign to the converted number
    number = if (isNegative) -number else number
    if (number < min) {
        return min
    }
    return if (number > max) {
        max
    } else number.toInt()
}
```


## Conclusion
Congratulations :clap:!!! We've solved yet another problem from LeetCode and it didn't take too much of our sweat, did it?

I hope you have enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn. feel free to fork 🔪 and star ⭐ it.

- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/StringToInteger.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/String_To_Integer.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/string_to_integer.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/StringToInteger.kt)

Till next time… Happy coding 😄 and Namaste :pray:!