---
title: 'LeetCode #20 - Valid Parentheses'
date: 2020-11-15 12:17:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! It's a brand-new day and it's time to solve another problem from LeetCode.

- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses)

## Problem Statement
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.

### Constraints
- 1 ≤ `s.length` ≤ 10<sup>4</sup>
- `s` consists of parentheses only `'()[]{}'`.

### Examples

Example 1:

```
Input: s = "()"
Output: true
```

Example 2:

```
Input: s = "()[]{}"
Output: true
```

Example 3:

```
Input: s = "(]"
Output: false
```

Example 4:

```
Input: s = "([)]"
Output: false
```

Example 5:

```
Input: s = "{[]}"
Output: true
```

## Analysis
In this question, we need to deal with only 6 symbols — `(`, `)`, `{`, `}`, `[`, `]`. We will be given a string containing only these symbols. A string is valid if all the symbols are present in pairs and left parenthesis comes before the corresponding right.

## Approach
This is a simple question :smiley:. We will traverse the string `s` from left to right and see if left and right parentheses are matching with their corresponding counterpart.

1. Traverse the string from left to right.
2. If we encounter the open/left parenthesis, then we will push it to the ***Stack*** data structure due to its `Last In First Out (LIFO)` property.
3. If we encounter any of the close/right parentheses, we will check it with the `top` of the stack. If it is the correct corresponding open/left parenthesis, we will move further, else we will return false.
4. At last, for valid string, the stack should be empty because all the left parentheses should have matched with the right ones.

### Time Complexity
We are traversing the string once, hence the time complexity will be ***O(n)***.

### Space Complexity
We are using **Stack** to store characters of the string, hence the space complexity will be ***O(n)***.

## Code

### Java

```java
public class ValidParentheses {

    public boolean isValid(String s) {
        // Stack to store left symbols
        Stack<Character> leftSymbols = new Stack<>();
        // Loop for each character of the string
        for (char c : s.toCharArray()) {
            // If left symbol is encountered
            if (c == '(' || c == '{' || c == '[') {
                leftSymbols.push(c);
            }
            // If right symbol is encountered
            else if (c == ')' && !leftSymbols.isEmpty() && leftSymbols.peek() == '(') {
                leftSymbols.pop();
            } else if (c == '}' && !leftSymbols.isEmpty() && leftSymbols.peek() == '{') {
                leftSymbols.pop();
            } else if (c == ']' && !leftSymbols.isEmpty() && leftSymbols.peek() == '[') {
                leftSymbols.pop();
            }
            // If none of the valid symbols is encountered
            else {
                return false;
            }
        }
        return leftSymbols.isEmpty();
    }
}
```

### Python

```python
def isValid(s: str) -> bool:
    # Stack for left symbols
    leftSymbols = []
    # Loop for each character of the string
    for c in s:
        # If left symbol is encountered
        if c in ['(', '{', '[']:
            leftSymbols.append(c)
        # If right symbol is encountered
        elif c == ')' and len(leftSymbols) != 0 and leftSymbols[-1] == '(':
            leftSymbols.pop()
        elif c == '}' and len(leftSymbols) != 0 and leftSymbols[-1] == '{':
            leftSymbols.pop()
        elif c == ']' and len(leftSymbols) != 0 and leftSymbols[-1] == '[':
            leftSymbols.pop()
        # If none of the valid symbols is encountered
        else:
            return False
    return leftSymbols == []
```

### JavaScript

```javascript
var isValid = function (s) {
    // Stack to store left symbols
    const leftSymbols = [];
    // Loop for each character of the string
    for (let i = 0; i < s.length; i++) {
        // If left symbol is encountered
        if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
            leftSymbols.push(s[i]);
        }
        // If right symbol is encountered
        else if (s[i] === ')' && leftSymbols.length !== 0 && leftSymbols[leftSymbols.length - 1] === '(') {
            leftSymbols.pop();
        } else if (s[i] === '}' && leftSymbols.length !== 0 && leftSymbols[leftSymbols.length - 1] === '{') {
            leftSymbols.pop();
        } else if (s[i] === ']' && leftSymbols.length !== 0 && leftSymbols[leftSymbols.length - 1] === '[') {
            leftSymbols.pop();
        }
        // If none of the valid symbols is encountered
        else {
            return false;
        }
    }
    return leftSymbols.length === 0;
};
```

### Kotlin

```java
fun isValid(s: String): Boolean {
    // Stack to store left symbols
    val leftSymbols = Stack<Char>()
    // Loop for each character of the string
    for (c in s.toCharArray()) {
        // If left symbol is encountered
        if (c == '(' || c == '{' || c == '[') {
            leftSymbols.push(c)
        }
        // If right symbol is encountered
        else if (c == ')' && !leftSymbols.isEmpty() && leftSymbols.peek() == '(') {
            leftSymbols.pop()
        } else if (c == '}' && !leftSymbols.isEmpty() && leftSymbols.peek() == '{') {
            leftSymbols.pop()
        } else if (c == ']' && !leftSymbols.isEmpty() && leftSymbols.peek() == '[') {
            leftSymbols.pop()
        }
        // If none of the valid symbols is encountered
        else {
            return false
        }
    }
    return leftSymbols.isEmpty()
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/ValidParentheses.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Valid_Parentheses.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/valid_parentheses.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/ValidParentheses.kt)

## Conclusion

Congratulations :clap:! We have solved the problem using ***two pointer technique*** which is very handy in solving a variety of linked list problems.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!