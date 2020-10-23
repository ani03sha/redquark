---
title: 'LeetCode #6 - ZigZag Conversion'
date: 2020-10-22 10:36:00
category: 'LeetCode'
draft: false
---

Hello happy people :wave:! It's time for us to look into a new LeetCode problem.

[ZigZag Conversion](https://leetcode.com/problems/zigzag-conversion/).

## Problem Statement
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows: `string convert(string s, int numRows);`

### Constraints
- 1 <= s.length <= 1000
- s consists of English letters (lower-case and upper-case), ',' and '.'.
- 1 <= numRows <= 1000

## Examples

Example 1:
```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

Example 2: 
```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

Example 3: 
```
Input: s = "A", numRows = 1
Output: "A"
```

## Analysis

Here, we are given a string `s` and number of rows `numRows`. The ask is to take one character of the string at a time and write it in a new row until we reach to the given `numRows`. Once we reach to the end, we continue writing the next character in the next column and row - 1 until we reach the first row.
Repeat this process until we have anymore characters left.

Once we are done creating the rows, we will return the string made by appending each row one after the another.

## Approach

Let's say we have string `s = PAYPALISHIRING` and `numRows = 4`, then the zigzag pattern would look like below (I've added indices of each character against it for better understanding) - 

```
[00]P                               [06]I                               [12]N
[01]A                   [05]L       [07]s                   [11]I       [13]G
[02]Y       [04]A                   [08]H       [10]R
[03]P                               [09]I
```

If you look closely to the above pattern, you will find that the difference between each character in the first and last row is ***`2 * numRows - 2`***. We will call it **step** i.e., `step = 2 * numRows - 2`. 

In our case - `step = 2 * numRows - 2 = 2 * 4 - 2 = 6` and you can confirm that this condition holds true for first (0 --> 6 --> 12) and last rows (3 --> 9).

And for the middle rows, we will run another loop which starts from the current row and jumps `step` size after each iteration. Thus, we will get following values

```
For i = 0 => j = 0, 6, 12
For i = 1 => j = 1, 7, 13
For i = 2 => j = 2, 8
For i = 3 => j = 3, 9
```

So, what's the pattern here :thinking:? Yes, the pattern is `j + step - 2 * i` where `i` represents the rows. The values in column can be calculated by the above formula.

Easy peasy, right :smile:?

### Time Complexity
Since we are iterating each character in the String only once, the time complexity will be ***O(n)***.

### Space Complexity
We are not using any extra space here, therefore, the space complexity would be ***O(1)***.

## Code

### Java

```java
public class ZigZagConversion {

    public String convert(String s, int numRows) {
        // Base conditions
        if (s == null || s.isEmpty() || numRows <= 0) {
            return "";
        }
        if (numRows == 1) {
            return s;
        }
        // Resultant string
        StringBuilder result = new StringBuilder();
        // Step size
        int step = 2 * numRows - 2;
        // Loop for each row
        for (int i = 0; i < numRows; i++) {
            // Loop for each character in the row
            for (int j = i; j < s.length(); j += step) {
                result.append(s.charAt(j));
                if (i != 0 && i != numRows - 1 && (j + step - 2 * i) < s.length()) {
                    result.append(s.charAt(j + step - 2 * i));
                }
            }
        }
        return result.toString();
    }
}
```

### Python

```python
def convert(s: str, numRows: int) -> str:
    # Base condition
    if s is None and numRows <= 0:
        return ""
    if numRows == 1:
        return s
    # Resultant string
    result = ""
    # Step size
    step = 2 * numRows - 2
    # Loop for each row
    for i in range(0, numRows):
        # Loop for each character in the row
        for j in range(i, len(s), step):
            result += s[j]
            if i != 0 and i != numRows - 1 and (j + step - 2 * i) < len(s):
                result += s[j + step - 2 * i]
    return result
```

### JavaScript

```javascript
var convert = function (s, numRows) {
    // Base conditions
    if (s === null || numRows <= 0) {
        return "";
    }
    if (numRows === 1) {
        return s;
    }
    // Resultant String
    let result = ""
    // Step size
    const step = 2 * numRows - 2;
    // Loop for each row
    for (let i = 0; i < numRows; i++) {
        // Loop for each character in the row
        for (let j = i; j < s.length; j += step) {
            result += s[j];
            if (i != 0 && i != numRows - 1 && (j + step - 2 * i) < s.length) {
                result += s[j + step - 2 * i];
            }
        }
    }
    return result;
};
```

### Kotlin

```java
fun convert(s: String?, numRows: Int): String {
    // Base conditions
    if (s == null || s.isEmpty() || numRows <= 0) {
        return ""
    }
    if (numRows == 1) {
        return s
    }
    // Resultant string
    val result = StringBuilder()
    // Step size
    val step = 2 * numRows - 2
    // Loop for each row
    for (i in 0 until numRows) {
        // Loop for each character in the row
        var j = i
        while (j < s.length) {
            result.append(s[j])
            if (i != 0 && i != numRows - 1 && j + step - 2 * i < s.length) {
                result.append(s[j + step - 2 * i])
            }
            j += step
        }
    }
    return result.toString()
}
```

## Conclusion

Today we discussed how to solve LeetCode problem - **ZigZag Conversion** of a string.

I hope you have enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn. feel free to fork 🔪 and star ⭐ it.

- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/ZigZagConversion.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/ZigZag_Conversion.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/zigzag_conversion.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/ZigZagConversion.kt)

Till next time… Happy coding 😄 and Namaste :pray:!