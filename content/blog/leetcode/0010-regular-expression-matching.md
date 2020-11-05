---
title: 'LeetCode #10 - Regular Expression Matching'
date: 2020-11-05 09:43:00
category: 'LeetCode'
draft: false
---

Hello happy people :wave:! It's a new day, and we have a new problem at hand -

- [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/)

## Problem Statement
Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*` where: 

- `.` Matches any single character.​​​​
- `*` Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).

### Constraints:

- 0 <= s.length <= 20
- 0 <= p.length <= 30
- `s` contains only lowercase English letters.
- `p` contains only lowercase English letters, `.`, and `*`.
- It is guaranteed for each appearance of the character `*`, there will be a previous valid character to match.

### Examples

Example 1: 

```
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
```

Example 2: 

```
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
```

Example 3: 

```
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
```

Example 4: 

```
Input: s = "aab", p = "c*a*b"
Output: true
Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore, it matches "aab".
```

Example 5: 

```
Input: s = "mississippi", p = "mis*is*p*."
Output: false
```

## Analysis
We are given two strings — 

- `s` → which we need to match
- `p` → which has the pattern

There can be two special characters — 
- `*` → This can match 0 or more characters right before it. For e.g. if `s = aa` and `p = a*`, then `*` in `p` can match 0 or more `a` (because `a` is right before `*`). Thus, we can have one `a` in place of `*`, and we are left with only one `a` in both `s` and `p`, which is same. Hence, `s` and `p` are a match.

- `.` → This can match any single character. For e.g., if `s = ab` and `p = .*`, then since, `.` is right before `*` which means `*` can be replaced by `.`. This makes `p = ..` which means there can be any two characters. These “any two characters” can be `a` and `b`, hence, it's a match.

I know this is slightly complicated :weary: but as we look at some more examples, it would be easier to understand.

## Approach

To understand the approach, let's take some examples —  

`s = "aa"` and `p = "aa"`, since all the character in both `s` and `p` are same, hence it's a match.

Now, what about `s = "aabb"` and `p = "aab*"` :thinking:? We know that substrings `bb` and `b*` are match because `*` can be replaced by one `b`. Since, we already know that remaining substrings `aa` and `aa` are match, hence the whole strings also a match.

What can we infer from this? Right, if we have solution of part of a problem, we can use that partial result and can go forward. Also, we can use the already calculated result without calculating it again.

Does this ring a bell :bell:? Yes, this problem satisfies the following two properties - 

- **Optimal Substructure —** Any problem has optimal substructure property if its overall optimal solution can be constructed from the optimal solutions of its subproblems.

- **Overlapping Subproblems —** Any problem has overlapping sub-problems if finding its solution involves solving the same subproblem multiple times.

It is now evident that we can use good old **Dynamic Programming** to solve this problem. Below are the steps —

1. Create a boolean 2D `dp` array with sizes as `boolean[][] dp = new boolean[s.length() + 1][p.length() + 1]`. We are adding extra ***1*** to incorporate the case in case either or both of the strings are empty.

2. If both strings are empty, then it's a match, thus, `dp[0][0] = true`.

3. Let's take an example `s = "aab"` and `p = "c*a*b"` and create a DP table. <br /><br />

|   |   |       | c     | \*    | a     | \*    | b     |
|---|---|-------|-------|-------|-------|-------|-------|
|   |   | 0     | 1     | 2     | 3     | 4     | 5     |
|   | 0 | TRUE  | FALSE | TRUE  | FALSE | TRUE  | FALSE |
| a | 1 | FALSE | FALSE | FALSE | TRUE  | TRUE  | FALSE |
| a | 2 | FALSE | FALSE | FALSE | FALSE | TRUE  | FALSE |
| b | 3 | FALSE | FALSE | FALSE | FALSE | FALSE | TRUE  |

<br />

4. **First column —** it means `p` is empty and it will match to `s` only if `s` is also empty which we have stored in `dp[0][0]`. Thus, remaining values of dp[0][i] will be `false`.

5. **First row —** this is not so easy. It means which `p` matches empty `s`. The answer is either an empty pattern or a pattern that represents an empty string such as `"a*"`, `"x*y*"`, `"l*m*n*"` and so on. In the above example, if `s = ""` and `p = "c*"`, then due to `*`, `c` can be replaced by 0 `c`s which gives us an empty string. Hence, `dp[0][2] = true`.

6. For non-empty strings, let's say that `s[i - 1] == p[j - 1]` this means the *(i - 1)*th and *(j - 1)*th characters are same. This means, we have to check if the remaining strings are a match or not. If they are a match, then the current substrings will be a match, otherwise they won't be a match i.e., `dp[i][j] = dp[i - 1][j - 1]`. We're taking *(i - 1)*th and *(j - 1)`*th characters to offset empty strings as we're assuming our strings start from index 1.

7. If `p[j - 1] == "."`, then it means any single character can be matched. Therefore, here also, we will have to check if the remaining string is a match or not. Thus, `dp[i][j] = dp[i - 1][j - 1]`.

8. If `p[j - 1] == "*" `, then it means either it's represents an empty string (0 characters), thus `dp[i][j] = dp[i][j - 2]` or `s[i - 1] == p[j - 2] || p[j - 2] == "."`, then current character of string equals the char preceding `*` in pattern so the result is `dp[i-1][j]`.

<br />
:bulb: Try to evaluate the table by yourself to make it more clear.<br />

### Time Complexity
Since we are dealing with each character of both `s` and `p` the time complexity will be ***O(m × n)***
where `m` and `n` are the lengths of `s` and `p` respectively.

### Space Complexity
We need a DP array for our intermediate operations of dimensions `m × n`, hence the space complexity will also be ***O(m × n)***.

<br />
Let's look at the code now :arrow_down:.

## Code

### Java

```java
public class RegularExpressionMatching {

    public boolean isMatch(String s, String p) {
        int rows = s.length();
        int columns = p.length();
        /// Base conditions
        if (rows == 0 && columns == 0) {
            return true;
        }
        if (columns == 0) {
            return false;
        }
        // DP array
        boolean[][] dp = new boolean[rows + 1][columns + 1];
        // Empty string and empty pattern are a match
        dp[0][0] = true;
        // Deals with patterns with *
        for (int i = 2; i < columns + 1; i++) {
            if (p.charAt(i - 1) == '*') {
                dp[0][i] = dp[0][i - 2];
            }
        }
        // For remaining characters
        for (int i = 1; i < rows + 1; i++) {
            for (int j = 1; j < columns + 1; j++) {
                if (s.charAt(i - 1) == p.charAt(j - 1) || p.charAt(j - 1) == '.') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else if (j > 1 && p.charAt(j - 1) == '*') {
                    dp[i][j] = dp[i][j - 2];
                    if (p.charAt(j - 2) == '.' || p.charAt(j - 2) == s.charAt(i - 1)) {
                        dp[i][j] = dp[i][j] | dp[i - 1][j];
                    }
                }
            }
        }
        return dp[rows][columns];
    }
}
```

### Python

```python
def isMatch(s: str, p: str) -> bool:
    rows, columns = (len(s), len(p))
    # Base conditions
    if rows == 0 and columns == 0:
        return True
    if columns == 0:
        return False
    # DP array
    dp = [[False for j in range(columns + 1)] for i in range(rows + 1)]
    # Since empty string and empty pattern are a match
    dp[0][0] = True
    # Deals with patterns containing *
    for i in range(2, columns + 1):
        if p[i - 1] == '*':
            dp[0][i] = dp[0][i - 2]
    # For remaining characters
    for i in range(1, rows + 1):
        for j in range(1, columns + 1):
            if s[i - 1] == p[j - 1] or p[j - 1] == '.':
                dp[i][j] = dp[i - 1][j - 1]
            elif j > 1 and p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2]
                if p[j - 2] == '.' or p[j - 2] == s[i - 1]:
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
    return dp[rows][columns]
```

### JavaScript

```javascript
var isMatch = function (s, p) {
    const rows = s.length;
    const columns = p.length;
    /// Base conditions
    if (rows == 0 && columns == 0) {
        return true;
    }
    if (columns == 0) {
        return false;
    }
    // DP array
    const dp = Array.from({ length: s.length + 1 }, () => [false]);
    // Empty string and empty pattern are a match
    dp[0][0] = true;
    // Deals with patterns with *
    for (let i = 1; i < columns + 1; i++) {
        if (p[i - 1] === '*') {
            dp[0][i] = dp[0][i - 2];
        }
        else {
            dp[0][i] = false;
        };
    }
    // For remaining characters
    for (let i = 1; i < rows + 1; i++) {
        for (let j = 1; j < columns + 1; j++) {
            if (p[j - 1] === '*') {
                if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
                    dp[i][j] = dp[i][j - 2] || dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i][j - 2];
                }
            } else if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = false;
            }
        }
    }
    return dp[rows][columns];
};
```

### Kotlin

```java
fun isMatch(s: String, p: String): Boolean {
    val rows = s.length
    val columns = p.length
    /// Base conditions
    if (rows == 0 && columns == 0) {
        return true
    }
    if (columns == 0) {
        return false
    }
    // DP array
    val dp = Array(rows + 1) { BooleanArray(columns + 1) }
    // Empty string and empty pattern are a match
    dp[0][0] = true
    // Deals with patterns with *
    for (i in 2 until columns + 1) {
        if (p[i - 1] == '*') {
            dp[0][i] = dp[0][i - 2]
        }
    }
    // For remaining characters
    for (i in 1 until rows + 1) {
        for (j in 1 until columns + 1) {
            if (s[i - 1] == p[j - 1] || p[j - 1] == '.') {
                dp[i][j] = dp[i - 1][j - 1]
            } else if (j > 1 && p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 2]
                if (p[j - 2] == '.' || p[j - 2] == s[i - 1]) {
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
                }
            }
        }
    }
    return dp[rows][columns]
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/RegularExpressionMatching.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Regular_Expression_Matching.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/regular_expression_matching.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/RegularExpressionMatching.kt)

## Conclusion

Congratulations :clap:! We have solved another hard problem from LeetCode.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!