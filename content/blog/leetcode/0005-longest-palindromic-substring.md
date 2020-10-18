---
title: 'LeetCode #5 - Longest Palindromic Substring'
date: 2020-10-18 11:01:00
category: 'LeetCode'
draft: false
---

Hello LeetCode enthusiasts :wave:! It's a brand new day and it's time for solving a new LeetCode problem - **Longest Palindromic Substring**.

[0005 - Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/).

## Problem Statement
Given a string s, return the longest palindromic substring in s.

### Constraints
- 1 <= s.length <= 1000
- s consist of only digits and English letters (lower-case and/or upper-case).

## Examples

Example 1: 
```
Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.
```

Example 2: 
```
Input: s = "cbbd"
Output: "bb"
```

Example 3: 
```
Input: s = "a"
Output: "a"
```

Example 4: 
```
Input: s = "ac"
Output: "a"
```

## Analysis
This problem is pretty simple. We are given a string and we have to find a substring which is the longest palindrome. 

> ***A palindrome is the one which is equal if read from left to right and from right to left.***

For e.g., in the string `abbaa`, palindromes are - `abba`, `bb`, `aa`. Our output should be `abba` as it is the longest.

## Approach
There are many ways to solve this problem. Most common way is to treat each character of the string as the center and expand left and right. Keep track of their lengths and return the string with maximum length.

So, what's the problem :thinking:? The problem is the time complexity - it will be ***O(n<sup>2</sup>)***. Not so good, right? 

Let's see what's hurting us. We are expanding left and right treating each character as the center. What if we only expand only at the necessary characters instead of expanding at each character? 

Can we do that :thinking:? Yes, we can using the **[Manacher's Algorithm](https://en.wikipedia.org/wiki/Longest_palindromic_substring#Manacher's_algorithm)**. This algorithm intelligently uses characteristics of a palindrome to solve the problem in linear ***O(n)*** time - 

1. The left side of a palindrome is a mirror image of its right side.
2. Odd length palindrome will be centered on a letter and even length palindrome will be centered in between the two letters (thus there will be total `2n + 1` centers).

Manacher's Algorithm deals with the problem of finding the new center. Below are the steps -

1. Initialize the lengths array to the number of possible centers.

2. Set the current center to the first center.

3. Loop while the current center is valid:
    
    (a) Expand to the left and right simultaneously until we find the largest palindrome around this center.
    
    (b) Fill in the appropriate entry in the longest palindrome lengths array.
    
    (c) Iterate through the longest palindrome lengths array backwards and fill in the corresponding values to the right of the entry for the current center until an unknown value (as described above) is encountered.
    
    (d) set the new center to the index of this unknown value.

4. Return the longest substring.

### Time Complexity

Note that at each step of the algorithm we're either incrementing our current position in the input string or filling in an entry in the lengths array. Since the lengths array has size linear in the size of the input array, the algorithm has worst-case linear ***O(n)*** running time.

### Space Complexity
Since we are using the palindrome array to store the length of palindromes centered at each character, the space complexity will also be ***O(n)***.


## Code

### Java

```java
public class LongestPalindromicSubstring {

    public String longestPalindrome(String s) {
        // Update the string to put hash "#" at the beginning, end and in between each character
        String updatedString = getUpdatedString(s);
        // Length of the array that will store the window of palindromic substring
        int length = 2 * s.length() + 1;
        // Array to store the length of each palindrome centered at each element
        int[] p = new int[length];
        // Current center of the longest palindromic string
        int c = 0;
        // Right boundary of the longest palindromic string
        int r = 0;
        // Maximum length of the substring
        int maxLength = 0;
        // Position index
        int position = -1;
        for (int i = 0; i < length; i++) {
            // Mirror of the current index
            int mirror = 2 * c - i;
            // Check if the mirror is outside the left boundary of current longest palindrome
            if (i < r) {
                p[i] = Math.min(r - i, p[mirror]);
            }
            // Indices of the characters to be compared
            int a = i + (1 + p[i]);
            int b = i - (1 + p[i]);
            // Expand the window
            while (a < length && b >= 0 && updatedString.charAt(a) == updatedString.charAt(b)) {
                p[i]++;
                a++;
                b--;
            }
            // If the expanded palindrome is expanding beyond the right boundary of
            // the current longest palindrome, then update c and r
            if (i + p[i] > r) {
                c = i;
                r = i + p[i];
            }
            if (maxLength < p[i]) {
                maxLength = p[i];
                position = i;
            }
        }
        int offset = p[position];
        StringBuilder result = new StringBuilder();
        for (int i = position - offset + 1; i <= position + offset - 1; i++) {
            if (updatedString.charAt(i) != '#') {
                result.append(updatedString.charAt(i));
            }
        }
        return result.toString();
    }

    private String getUpdatedString(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            sb.append("#").append(s.charAt(i));
        }
        sb.append("#");
        return sb.toString();
    }
}
```

### Python

```python
def get_updated_string(s):
    sb = ''
    for i in range(0, len(s)):
        sb += '#' + s[i]
    sb += '#'
    return sb


def longestPalindrome(s: str) -> str:
    # Update the string to put hash "#" at the beginning, end and in between each character
    updated_string = get_updated_string(s)
    # Length of the array that will store the window of palindromic substring
    length = 2 * len(s) + 1
    # List to store the length of each palindrome centered at each element
    p = [0] * length
    # Current center of the longest palindromic string
    c = 0
    # Right boundary of the longest palindromic string
    r = 0
    # Maximum length of the substring
    maxLength = 0
    # Position index
    position = -1
    for i in range(0, length):
        # Mirror of the current index
        mirror = 2 * c - i
        # Check if the mirror is outside the left boundary of current longest palindrome
        if i < r:
            p[i] = min(r - i, p[mirror])
        # Indices of the characters to be compared
        a = i + (1 + p[i])
        b = i - (1 + p[i])
        # Expand the window
        while a < length and b >= 0 and updated_string[a] == updated_string[b]:
            p[i] += 1
            a += 1
            b -= 1
        # If the expanded palindrome is expanding beyond the right boundary of
        # the current longest palindrome, then update c and r
        if i + p[i] > r:
            c = i
            r = i + p[i]
        if maxLength < p[i]:
            maxLength = p[i]
            position = i
    offset = p[position]
    result = ''
    for i in range(position - offset + 1, position + offset):
        if updated_string[i] != '#':
            result += updated_string[i]
    return result
```

### JavaScript

```javascript
var longestPalindrome = function (s) {
    // Update the string to put hash "#" at the beginning, end and in between each character
    let updatedString = getUpdatedString(s);
    // Length of the array that will store the window of palindromic substring
    const length = 2 * s.length + 1;
    // Array to store the length of each palindrome centered at each element
    let p = new Array(length);
    p.fill(0);
    // Current center of the longest palindromic string
    let c = 0;
    // Right boundary of the longest palindromic string
    let r = 0;
    // Maximum length of the substring
    let maxLength = 0;
    // Position index
    let position = -1;
    for (let i = 0; i < length; i++) {
        // Mirror of the current index
        let mirror = 2 * c - i;
        // Check if the mirror is outside the left boundary of current longest palindrome
        if (i < r) {
            p[i] = Math.min(r - i, p[mirror]);
        }
        // Indices of the characters to be compared
        let a = i + (1 + p[i]);
        let b = i - (1 + p[i]);
        // Expand the window
        while (a < length && b >= 0 && updatedString[a] === updatedString[b]) {
            p[i]++;
            a++;
            b--;
        }
        // If the expanded palindrome is expanding beyond the right boundary of
        // the current longest palindrome, then update c and r
        if (i + p[i] > r) {
            c = i;
            r = i + p[i];
        }
        if (maxLength < p[i]) {
            maxLength = p[i];
            position = i;
        }
    }
    let offset = p[position];
    let result = "";
    for (let i = position - offset + 1; i <= position + offset - 1; i++) {
        if (updatedString[i] !== '#') {
            result += updatedString[i];
        }
    }
    return result;
};

function getUpdatedString(s) {
    let sb = "";
    for (let i = 0; i < s.length; i++) {
        sb += "#" + s[i];
    }
    sb += "#";
    return sb;
}
```

### Kotlin

```java
fun longestPalindrome(s: String): String {
    // Update the string to put hash "#" at the beginning, end and in between each character
    val updatedString = getUpdatedString(s)
    // Length of the array that will store the window of palindromic substring
    val length = 2 * s.length + 1
    // Array to store the length of each palindrome centered at each element
    val p = IntArray(length)
    // Current center of the longest palindromic string
    var c = 0
    // Right boundary of the longest palindromic string
    var r = 0
    // Maximum length of the substring
    var maxLength = 0
    // Position index
    var position = -1
    for (i in 0 until length) {
        // Mirror of the current index
        val mirror = 2 * c - i
        // Check if the mirror is outside the left boundary of current longest palindrome
        if (i < r) {
            p[i] = (r - i).coerceAtMost(p[mirror])
        }
        // Indices of the characters to be compared
        var a = i + (1 + p[i])
        var b = i - (1 + p[i])
        // Expand the window
        while (a < length && b >= 0 && updatedString[a] == updatedString[b]) {
            p[i]++
            a++
            b--
        }
        // If the expanded palindrome is expanding beyond the right boundary of
        // the current longest palindrome, then update c and r
        if (i + p[i] > r) {
            c = i
            r = i + p[i]
        }
        if (maxLength < p[i]) {
            maxLength = p[i]
            position = i
        }
    }
    val offset = p[position]
    val result = StringBuilder()
    for (i in position - offset + 1 until position + offset) {
        if (updatedString[i] != '#') {
            result.append(updatedString[i])
        }
    }
    return result.toString()
}

fun getUpdatedString(s: String): String {
    val sb = StringBuilder()
    for (element in s) {
        sb.append("#").append(element)
    }
    sb.append("#")
    return sb.toString()
}
```

## Conclusion

Congratulation! we have found the longest palindromic substring in linear time using ***Manacher's Algorithm*** :clap:.

I hope you have enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn. feel free to fork 🔪 and star ⭐ it.

- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/LongestPalindromicSubstring.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Longest_Palindromic_Substring.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/longest_palindromic_substring.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/LongestPalindromeSubstring.kt)

Till next time… Happy coding 😄 and Namaste :pray:!

## References
- [IDeserve](https://www.youtube.com/watch?v=nbTSfrEfo6M)
- [Fred Akalin's Blog](https://www.youtube.com/watch?v=nbTSfrEfo6M)