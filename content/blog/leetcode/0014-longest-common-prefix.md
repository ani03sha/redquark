---
title: 'LeetCode #14 - Longest Common Prefix'
date: 2020-11-08 20:40:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! Today we will discuss another LeetCode problem.

- [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)

## Problem Statement
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

### Constraints
- 0 ≤ `strs.length` ≤ 200
- 0 ≤ `strs[i].length` ≤ 200
- `strs[i]` consists of only lower-case English letters.

### Examples

Example 1:

```
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

Example 2:

```
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

# Analysis
As per the question, we will be given an array of some strings which can be of varying lengths. We only have to find first `n` characters which appear in each string between the indices `0` and `n - 1`.

It is clear that the common characters cannot be more than the length of the shortest string of all the given strings. Therefore, we will first find the shortest string amongst all strings and check maximum characters of it are present in all the other strings. 

If not a single character is present in all the other string, we will return an empty string.

## Approach

The approach is pretty simple - 
1. First we will find the shortest string and its length.
2. Secondly, we will take the first string and match its each character one by one with all the other strings.
3. As soon as we encounter a character which does not match, we will break out of loop.

### Time Complexity
If `n` is the length of the array and `m` is the length of the shortest string, the worst case time complexity will be ***O(m × n)***.

### Space Complexity
Since we are not using any internal data structure for intermediate computations, the space complexity will be ***O(1)***.

## Code

### Java

```java
public class LongestCommonPrefix {

    public String longestCommonPrefix(String[] strs) {
        // Longest common prefix string
        StringBuilder longestCommonPrefix = new StringBuilder();
        // Base condition
        if (strs == null || strs.length == 0) {
            return longestCommonPrefix.toString();
        }
        // Find the minimum length string from the array
        int minimumLength = strs[0].length();
        for (int i = 1; i < strs.length; i++) {
            minimumLength = Math.min(minimumLength, strs[i].length());
        }
        // Loop for the minimum length
        for (int i = 0; i < minimumLength; i++) {
            // Get the current character from first string
            char current = strs[0].charAt(i);
            // Check if this character is found in all other strings or not
            for (String str : strs) {
                if (str.charAt(i) != current) {
                    return longestCommonPrefix.toString();
                }
            }
            longestCommonPrefix.append(current);
        }
        return longestCommonPrefix.toString();
    }
}
```

### Python

```python
def longestCommonPrefix(strs: List[str]) -> str:
    # Longest common prefix string
    lcp = ""
    # Base condition
    if strs is None or len(strs) == 0:
        return lcp
    # Find the minimum length string from the array
    minimumLength = len(strs[0])
    for i in range(1, len(strs)):
        minimumLength = min(minimumLength, len(strs[i]))
    # Loop until the minimum length
    for i in range(0, minimumLength):
        # Get the current character from the first string
        current = strs[0][i]
        # Check if this character is found in all other strings or not
        for j in range(0, len(strs)):
            if strs[j][i] != current:
                return lcp
        lcp += current
    return lcp
```

### JavaScript

```javascript
var longestCommonPrefix = function (strs) {
    // Longest common prefix string
    let longestCommonPrefix = "";
    // Base condition
    if (strs == null || strs.length == 0) {
        return longestCommonPrefix;
    }
    // Find the minimum length string from the array
    let minimumLength = strs[0].length;
    for (let i = 1; i < strs.length; i++) {
        minimumLength = Math.min(minimumLength, strs[i].length);
    }
    // Loop for the minimum length
    for (let i = 0; i < minimumLength; i++) {
        // Get the current character from first string
        let current = strs[0][i];
        // Check if this character is found in all other strings or not
        for (let j = 0; j < strs.length; j++) {
            if (strs[j][i] != current) {
                return longestCommonPrefix;
            }
        }
        longestCommonPrefix += current;
    }
    return longestCommonPrefix;
};
```

### Kotlin

```java
fun longestCommonPrefix(strs: Array<String>): String {
    // Longest common prefix string
    val longestCommonPrefix = StringBuilder()
    // Base condition
    if (strs.isEmpty()) {
        return longestCommonPrefix.toString()
    }
    // Find the minimum length string from the array
    var minimumLength = strs[0].length
    for (i in 1 until strs.size) {
        minimumLength = minimumLength.coerceAtMost(strs[i].length)
    }
    // Loop for the minimum length
    for (i in 0 until minimumLength) {
        // Get the current character from first string
        val current = strs[0][i]
        // Check if this character is found in all other strings or not
        for (str in strs) {
            if (str[i] != current) {
                return longestCommonPrefix.toString()
            }
        }
        longestCommonPrefix.append(current)
    }
    return longestCommonPrefix.toString()
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/LongestCommonPrefix.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Longest_Common_Prefix.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/longest_common_prefix.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/LongestCommonPrefix.kt)

## Conclusion

Congratulations :clap:! We have solved another problem from LeetCode.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!