---
title: 'LeetCode #28 - Implement StrStr'
date: 2020-12-14 21:12:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! We have a new LeetCode problem today involving string.

- [Implement StrStr](https://leetcode.com/problems/implement-strstr/)

## Problem Statement
Return the index of the first occurrence of `needle` in `haystack`, or -1 if `needle` is not part of `haystack`.

### Clarification:
What should we return when `needle` is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's `strstr()` and Java's `indexOf()`.

### Constraints:
- 0 ≤ `haystack.length`, `needle.length` ≤ 5 × 10<sup>4</sup>
- `haystack` and `needle` consist of only lower-case English characters.

### Examples

Example 1:

```
Input: haystack = "hello", needle = "ll"
Output: 2
```

Example 2:

```
Input: haystack = "aaaaa", needle = "bba"
Output: -1
```

Example 3:

```
Input: haystack = "", needle = ""
Output: 0
```

## Analysis
This problem can be rephrased in simple words as, given two strings `haystack` and `needle`. Find if `needle` is present in the `haystack`. We can easily do it by using library methods but since this is an algorithmic problem, we should not do it.

Plus, `Implement StrStr` is a stupid name for this problem (sorry C lovers :stuck_out_tongue:). If I were the mighty owner of the LeetCode, I would name it `Find Needle In A Haystack` :smile:.

If the `needle` is present in the `haystack`, return its starting index, else return -1.

## Approach
We will follow the below steps — 

!. Take the length of the `needle` as `needleLength`.
2. Scan the `haystack` from left to right.
3. Check if substrings of length `needleLength` are present in it.

### Time Complexity
The string is traversed once so the time complexity will be ***O(n)***.

### Space Complexity
We may have to create `n` substrings of length 1 each, therefore, the space complexity will also be ***O(n)***.


## Code

### Java

```java
public class ImplementStrStr {

    public int strStr(String haystack, String needle) {
        // Base condition
        if (haystack == null || needle == null) {
            return -1;
        }
        // Special case
        if (haystack.equals(needle)) {
            return 0;
        }
        // length of the needle
        int needleLength = needle.length();
        // Loop through the haystack and slide the window
        for (int i = 0; i < haystack.length() - needleLength + 1; i++) {
            // Check if the substring equals to the needle
            if (haystack.substring(i, i + needleLength).equals(needle)) {
                return i;
            }
        }
        return -1;
    }
}
```

### Python

```python
class ImplementStrStr:
    def strStr(haystack: str, needle: str) -> int:
        # Base conditions
        if haystack is None or needle is None:
            return -1
        # Special case
        if haystack == needle:
            return 0
        # Length of the needle
        needleLength = len(needle)
        # Loop through the haystack and slide the window
        for i in range(len(haystack) - needleLength + 1):
            if haystack[i:i + needleLength] == needle:
                return i
        return -1
```

### JavaScript

```javascript
var strStr = function (haystack, needle) {
    // Base condition
    if (haystack == null || needle == null) {
        return -1;
    }
    // Special case
    if (haystack === needle) {
        return 0;
    }
    // length of the needle
    const needleLength = needle.length;
    // Loop through the haystack and slide the window
    for (let i = 0; i < haystack.length - needleLength + 1; i++) {
        // Check if the substring equals to the needle
        if (haystack.substring(i, i + needleLength) === needle) {
            return i;
        }
    }
    return -1;
};
```

### Kotlin

```java
class ImplementStrStr {
    fun strStr(haystack: String, needle: String): Int {
        // Special case
        if (haystack == needle) {
            return 0
        }
        // length of the needle
        val needleLength = needle.length
        // Loop through the haystack and slide the window
        for (i in 0 until haystack.length - needleLength + 1) {
            // Check if the substring equals to the needle
            if (haystack.substring(i, i + needleLength) == needle) {
                return i
            }
        }
        return -1
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/ImplementStrStr.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Implement_StrStr.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/implement_strstr.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/ImplementStrStr.kt)

## Conclusion

Congratulations :clap:! We have solved yet another problem from LeetCode involving string.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!