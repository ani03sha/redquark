---
title: 'LeetCode #32 - Longest Valid Parentheses'
date: 2021-01-31 19:12:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! Today we have a hard LeetCode problem to solve (It's not that hard by the way :smiley:).

- [Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses)

## Problem Statement
Given a string containing just the characters `(` and `)`, find the length of the longest valid (well-formed) parentheses substring.

### Constraints:
- 0 ≤ `s.length` ≤ 3 × 10<sup>4</sup>
- `s[i]` is `(`, or `)`.

### Examples

Example 1:

```
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
```

Example 2:

```
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
```

Example 3:

```
Input: s = ""
Output: 0
```

## Analysis
The problem is very straight forward. We will be given a string containing only two symbols — `(` and `)`. We need to find the length of the longest valid substring. A valid substring is a substring which has  an equal number of left parentheses `(` and right parentheses `)`.

## Approach
The naive approach is creating all the possible substrings and then choose the longest substring among the valid substrings. A valid substring can be found using the approach discussed in the post — [LeetCode #20 — Valid Parentheses](https://redquark.org/leetcode/0020-valid-parentheses/). But this approach takes ***O(n<sup>2</sup>)*** time which is not acceptable. 

Can we do better :thinking:? The important thing here is we only have to find the **length** of the valid substring. What if we keep track of counts of left parenthesis `(` and right parenthesis `)`? As long as the counts of both are same, we can conclude that they form a valid substring. We can thus take the longest such substring.

The algorithm is simple — 

1. Loop through the string from left to right and store the counts of both type of parentheses in two variables `left` and `right`.
2. If `left == right`, it means we have valid substring.
3. We can then find if the length of current valid substring (`left + right`) is the maximum or not.
4. If `right > left`, it means we have invalid string, and we will reset `left` and `right` to zero.
5. Repeat the steps 1-4 looping string from right to left and reset the counters as soon as `left > right`.

### Time Complexity
Since we are looping the string twice, the time complexity will be ***O(n)***.

### Space Complexity
We are not using any data structures to store intermediate computations, hence the space complexity will be ***O(1)***.

## Code

### Java

```java
public class LongestValidParentheses {

    public int longestValidParentheses(String s) {
        // Variable to store the longest valid parentheses
        int count = 0;
        // Left counter will count the number of '('
        int left = 0;
        // Right counter will count the number of ')'
        int right = 0;
        // Loop through the string from left to right.
        // This will take care of extra right parentheses
        for (int i = 0; i < s.length(); i++) {
            // Current character
            char c = s.charAt(i);
            if (c == '(') {
                left++;
            }
            if (c == ')') {
                right++;
            }
            // If both left and right are equal,
            // it means we have a valid substring
            if (left == right) {
                count = Math.max(count, left + right);
            }
            // If right is greater than left,
            // it means we need to set both
            // counters to zero
            if (right > left) {
                left = right = 0;
            }
        }
        // Reset left and right
        left = right = 0;
        // Follow the same approach but now loop the string
        // from right to left. This will take care of extra
        // left parentheses
        for (int i = s.length() - 1; i >= 0; i--) {
            // Current character
            char c = s.charAt(i);
            if (c == '(') {
                left++;
            }
            if (c == ')') {
                right++;
            }
            // If both left and right are equal,
            // it means we have a valid substring
            if (left == right) {
                count = Math.max(count, left + right);
            }
            // If right is greater than left,
            // it means we need to set both
            // counters to zero
            if (left > right) {
                left = right = 0;
            }
        }
        return count;
    }
}
```

### Python

```python
def longestValidParentheses(s: str) -> int:
    # Variable to store the longest valid parentheses
    count = 0
    # Left counter will count the number of '('
    left = 0
    # Right counter will count the number of ')'
    right = 0
    # Loop through the string from left to right.
    # This will take care of extra right parentheses
    for i in range(len(s)):
        # Current character
        c = s[i]
        if c == '(':
            left += 1
        if c == ')':
            right += 1
        # If both left and right are equal,
        # it means we have a valid substring
        if left == right:
            count = max(count, left + right)
        # If right is greater than left,
        # it means we need to set both
        # counters to zero
        if right > left:
            left = right = 0
    # Reset left and right
    left = right = 0
    # Follow the same approach but now loop the string
    # from right to left. This will take care of extra
    # left parentheses
    for i in range(len(s) - 1, -1, -1):
        # Current character
        c = s[i]
        if c == '(':
            left += 1
        if c == ')':
            right += 1
        # If both left and right are equal,
        # it means we have a valid substring
        if left == right:
            count = max(count, left + right)
        # If right is greater than left,
        # it means we need to set both
        # counters to zero
        if left > right:
            left = right = 0
    return count
```

### JavaScript

```javascript
var longestValidParentheses = function (s) {
    // Variable to store the longest valid parentheses
    let count = 0;
    // Left counter will count the number of '('
    let left = 0;
    // Right counter will count the number of ')'
    let right = 0;
    // Loop through the string from left to right.
    // This will take care of extra right parentheses
    for (let i = 0; i < s.length; i++) {
        // Current character
        let c = s[i];
        if (c === '(') {
            left++;
        }
        if (c === ')') {
            right++;
        }
        // If both left and right are equal,
        // it means we have a valid substring
        if (left === right) {
            count = Math.max(count, left + right);
        }
        // If right is greater than left,
        // it means we need to set both
        // counters to zero
        if (right > left) {
            left = right = 0;
        }
    }
    // Reset left and right
    left = right = 0;
    // Follow the same approach but now loop the string
    // from right to left. This will take care of extra
    // left parentheses
    for (let i = s.length - 1; i >= 0; i--) {
        // Current character
        let c = s[i];
        if (c === '(') {
            left++;
        }
        if (c === ')') {
            right++;
        }
        // If both left and right are equal,
        // it means we have a valid substring
        if (left === right) {
            count = Math.max(count, left + right);
        }
        // If right is greater than left,
        // it means we need to set both
        // counters to zero
        if (left > right) {
            left = right = 0;
        }
    }
    return count;
};
```

### Kotlin

```java
fun longestValidParentheses(s: String): Int {
    // Variable to store the longest valid parentheses
    var count = 0
    // Left counter will count the number of '('
    var left = 0
    // Right counter will count the number of ')'
    var right = 0
    // Loop through the string from left to right.
    // This will take care of extra right parentheses
    for (element in s) {
        // Current character
        if (element == '(') {
            left++
        }
        if (element == ')') {
            right++
        }
        // If both left and right are equal,
        // it means we have a valid substring
        if (left == right) {
            count = count.coerceAtLeast(left + right)
        }
        // If right is greater than left,
        // it means we need to set both
        // counters to zero
        if (right > left) {
            right = 0
            left = right
        }
    }
    // Reset left and right
    right = 0
    left = right
    // Follow the same approach but now loop the string
    // from right to left. This will take care of extra
    // left parentheses
    for (i in s.length - 1 downTo 0) {
        // Current character
        val c = s[i]
        if (c == '(') {
            left++
        }
        if (c == ')') {
            right++
        }
        // If both left and right are equal,
        // it means we have a valid substring
        if (left == right) {
            count = count.coerceAtLeast(left + right)
        }
        // If right is greater than left,
        // it means we need to set both
        // counters to zero
        if (left > right) {
            right = 0
            left = right
        }
    }
    return count
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/LongestValidParentheses.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Longest_Valid_Parentheses.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/longest_valid_parentheses.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/LongestValidParentheses.kt)

## Conclusion

Congratulations :clap:! Today we solved another **hard** LeetCode problem to determine the length of the longest valid parentheses.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!
