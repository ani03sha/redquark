---
title: 'LeetCode #13 - Roman To Integer'
date: 2020-11-08 19:43:00
category: 'LeetCode'
draft: false
---

Howdy happy people :wave:! In the [last problem](https://redquark.org/leetcode/0012-integer-to-roman) we solved, we had to convert the given Integer into its Roman equivalent. In this problem, we are going to do just opposite i.e, we will convert given Roman string into its Integer equivalent.

- [Roman To Integer](https://leetcode.com/problems/roman-to-integer/)

## Problem Statement
Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

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

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV, because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

- I can be placed before V (5) and X (10) to make 4 and 9. 
- X can be placed before L (50) and C (100) to make 40 and 90. 
- C can be placed before D (500) and M (1000) to make 400 and 900.

Given a Roman numeral, convert it to an integer.

### Constraints

- 1 ≤ s.length ≤ 15
- `s` contains only the characters (`I`, `V`, `X`, `L`, `C`, `D`, `M`).
- It is guaranteed that `s` is a valid Roman numeral in the range [1, 3999].

### Examples

Example 1:

```
Input: s = "III"
Output: 3
```

Example 2:

```
Input: s = "IV"
Output: 4
```

Example 3:

```
Input: s = "IX"
Output: 9
```

Example 4:

```
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
```

Example 5:

```
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

## Analysis
This problem is pretty straight forward. We will be given a string representing Roman numeral, and we need to return its corresponding integer.

The length of string cannot be more than 15 and the value of result will not be more than 3999. Some Roman symbols and their equivalent integer values are already given. Only thing we need to notice is the cases where subtraction is used.

## Approach

1. Maintain a map/dictionary with Roman symbols and their corresponding integer equivalent.
2. Scan the string from right to left. Get the value corresponding to the current character from the map/dictionary and add it to the result. 
3. The special case is where there is a character at left of current character whose value is less than the value corresponding to the current character. For e.g. `X` represents 10 but `IX` represents 9. In this case, we will subtract the value of the character in the left from the result.

Let's take an example where `s = MCMXCIV`.

```
result = 0;

i = 'V'
result = 0 + 5 = 5

i = 'I', it is smaller than the character at right
result = 5 - 1 = 4;

i = 'C'
result = 4 + 100 = 104

i = 'X', it is smaller than the character at right
result = 104 - 10 = 94

i = 'M'
result = 94 + 1000 = 1094

i = 'C', it is less than the character at right
result = 1094 - 100 = 994

i = 'M'
result = 994 + 1000 = 1994
```

And 1994 is the Roman equivalent of `MCMXCIV`.

### Time Complexity
The maximum length of the string can be 15, therefore, the worst case time complexity can be ***O(15)*** or ***O(1)***.

### Space Complexity
We are using map/dictionary to store the Roman symbols and their corresponding integer values but there are only 7 symbols hence the worst case space complexity can be ***O{7}*** which is equivalent to ***O(1)***.

## Code

### Java

```java
public class RomanToInteger {

    public int romanToInt(String s) {
        // Map to store romans numerals
        Map<Character, Integer> romanMap = new HashMap<>();
        // Fill the map
        romanMap.put('I', 1);
        romanMap.put('V', 5);
        romanMap.put('X', 10);
        romanMap.put('L', 50);
        romanMap.put('C', 100);
        romanMap.put('D', 500);
        romanMap.put('M', 1000);
        // Length of the given string
        int n = s.length();
        // Variable to store result
        int num = romanMap.get(s.charAt(n - 1));
        // Loop for each character from right to left
        for (int i = n - 2; i >= 0; i--) {
            // Check if the character at right of current character is
            // bigger or smaller
            if (romanMap.get(s.charAt(i)) >= romanMap.get(s.charAt(i + 1))) {
                num += romanMap.get(s.charAt(i));
            } else {
                num -= romanMap.get(s.charAt(i));
            }
        }
        return num;
    }
}
```

### Python

```python
def romanToInt(s: str) -> int:
    # Dictionary of roman numerals
    roman_map = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    # Length of the given string
    n = len(s)
    # This variable will store result
    num = roman_map[s[n - 1]]
    # Loop for each character from right to left
    for i in range(n - 2, -1, -1):
        # Check if the character at right of current character is bigger or smaller
        if roman_map[s[i]] >= roman_map[s[i + 1]]:
            num += roman_map[s[i]]
        else:
            num -= roman_map[s[i]]
    return num
```

### JavaScript

```javascript
var romanToInt = function (s) {
    // Map to store romans numerals
    const romanMap = new Map();
    // Fill the map
    romanMap.set('I', 1);
    romanMap.set('V', 5);
    romanMap.set('X', 10);
    romanMap.set('L', 50);
    romanMap.set('C', 100);
    romanMap.set('D', 500);
    romanMap.set('M', 1000);
    // Length of the given string
    const n = s.length;
    // Variable to store result
    let num = romanMap.get(s[n - 1]);
    // Loop for each character from right to left
    for (let i = n - 2; i >= 0; i--) {
        // Check if the character at right of current character is
        // bigger or smaller
        if (romanMap.get(s[i]) >= romanMap.get(s[i + 1])) {
            num += romanMap.get(s[i]);
        } else {
            num -= romanMap.get(s[i]);
        }
    }
    return num;
};
```

### Kotlin

```java
fun romanToInt(s: String): Int {
    // Map to store romans numerals
    val romanMap: MutableMap<Char, Int> = HashMap()
    // Fill the map
    romanMap['I'] = 1
    romanMap['V'] = 5
    romanMap['X'] = 10
    romanMap['L'] = 50
    romanMap['C'] = 100
    romanMap['D'] = 500
    romanMap['M'] = 1000
    // Length of the given string
    val n = s.length
    // Variable to store result
    var num = romanMap[s[n - 1]]!!
    // Loop for each character from right to left
    for (i in n - 2 downTo 0) {
        // Check if the character at right of current character is
        // bigger or smaller
        if (romanMap[s[i]]!! >= romanMap[s[i + 1]]!!) {
            num += romanMap[s[i]]!!
        } else {
            num -= romanMap[s[i]]!!
        }
    }
    return num
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/RomanToInteger.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Roman_To_Integer.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/roman_to_integer.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/RomanToInteger.kt)

## Conclusion

Congratulations :clap:! We have solved another problem from LeetCode.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!