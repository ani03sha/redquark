---
title: 'LeetCode #12 - Integer To Roman'
date: 2020-11-07 19:43:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! I am present in front of you with another problem from LeetCode.

- [Integer To Roman](https://leetcode.com/problems/integer-to-roman/submissions/)

## Problem Statement

Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given an integer, convert it to a Roman numeral.

### Constraints:
- 1 ≤ num ≤ 3999

### Examples

Example 1:

```
Input: num = 3
Output: "III"
```

Example 2:

```
Input: num = 4
Output: "IV"
```

Example 3:

```
Input: num = 9
Output: "IX"
```

Example 4:

```
Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
```

Example 5:

```
Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

## Analysis

It is clear from the problem description and examples that we will be given a number between 1 and 3999, and we will have to convert it into corresponding Roman equivalent.

Some Roman symbols and their equivalent integer values are already given. Only thing we need to notice is the cases where subtraction is used.

## Approach
This problem should be very simple to solve. Since the maximum number can be 3999, we can have only four places — **Ones**, **Tens**, **Hundreds** and **Thousands**.

Thus, we will create four arrays with all the possible combination of places. Since 0 doesn't make any impact, we will put 0th place of every as an empty string.

The four arrays will be like below - 

```
M = ["", "M", "MM", "MMM"]
C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
```

Let's understand this with an example `num = 2467`.

- Thousands place ⇨ 2
- Hundreds place ⇨ 4
- Tens place ⇨ 6
- Ones place ⇨ 7

If we get the corresponding values from the arrays, then we will get `M[2]`, `C[4]`, `X[6]` and `I[7]`. The output will be — ***MMCDLXVII***.

### Time Complexity
We are scanning each digit of the number one by one therefore, the time complexity will be ***O(log<sub>10</sub>n)***.

### Space Complexity
We are using four arrays whose sizes don't depend on the input size hence the space complexity will be ***O(n)***.

## Code

### Java

```java
public class IntegerToRoman {

    public String intToRoman(int num) {
        String[] M = {"", "M", "MM", "MMM"};
        String[] C = {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"};
        String[] X = {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"};
        String[] I = {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"};

        return M[num / 1000] + C[(num % 1000) / 100] + X[(num % 100) / 10] + I[num % 10];
    }
}
```

### Python

```python
def intToRoman(num: int) -> str:
    M = ["", "M", "MM", "MMM"]
    C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
    X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
    I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
    return M[num // 1000] + C[(num % 1000) // 100] + X[(num % 100) // 10] + I[num % 10]
```

### JavaScript

```javascript
var intToRoman = function (num) {
    const M = ["", "M", "MM", "MMM"];
    const C = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    const X = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const I = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    return M[Math.floor(num / 1000)] + C[Math.floor((num % 1000) / 100)] + X[Math.floor((num % 100) / 10)] + I[num % 10];
};
```

### Kotlin

```java
fun intToRoman(num: Int): String? {
    val M = arrayOf("", "M", "MM", "MMM")
    val C = arrayOf("", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM")
    val X = arrayOf("", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC")
    val I = arrayOf("", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX")
    return M[num / 1000] + C[num % 1000 / 100] + X[num % 100 / 10] + I[num % 10]
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/IntegerToRoman.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Integer_To_Roman.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/integer_to_roman.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/IntegerToRoman.kt)

## Conclusion

Congratulations :clap:! We have solved another problem from LeetCode.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!