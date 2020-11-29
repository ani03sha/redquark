---
title: 'LeetCode #22 - Generate Parentheses'
date: 2020-11-29 07:43:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! It's a brand-new day and we have a brand new LeetCode problem to solve.

- [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)

## Problem Statement
Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

### Constraints:
- 1 ≤ `n` ≤ 8

### Examples

Example 1:
```
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

Example 2:
```
Input: n = 1
Output: ["()"]
```

## Analysis
The problem description is fairly straight forward (however the solution may not be :stuck_out_tongue:). We will be given a number `n` which represents the pairs of parentheses, and we need to find out all  of their valid permutations. A valid permutation is one where every opening parenthesis `(` has its corresponding closing parenthesis `)`.

Also, these parentheses can be arranged in any order as long as they are valid. For `n = 2`, the valid pairs are — `(())` and `()()`. Also, note `n = 2` means two `(`s and two `)`s. The maximum number of pairs can be eight.

## Approach
This problem description and the analysis above scream ***Recursion*** and yes it's the right way to solve this problem. The naive approach is to generate all the permutations. All sequence of length `n` is `(` plus all sequences of length `n - 1`. The time complexity of this will be ***O(2<sup>2n</sup>)*** which is quite large.

What if we generate only those permutations which we know for sure will be valid? It should reduce the time considerably. We can use **[backtracking](https://www.geeksforgeeks.org/backtracking-introduction/#:~:text=Backtracking%20is%20an%20algorithmic%2Dtechnique,reaching%20any%20level%20of%20the)** for this purpose. There will be three constraints we need to consider here — 
- Base case when number of opening and closing parentheses is equal to `n`.
- Number of opening parentheses should be less than `n`.
- A closing parenthesis cannot occur before the open parenthesis.

To solve this problem, we will follow the below steps -
1. Create a list that will store the result.
2. Call our backtracking function with empty string and initial number of opening and closing parentheses. 
3. Check the base case. If number of opening and closing parentheses are equal to `n` then we will add the string to the list and return.
4. If the base case does not meet then we will check if number of opening parentheses is less than `n`, If true, then we will add `(` to the current string and increment the count of opening parenthesis.
5. Check if number of closing parentheses is less than open parentheses then we will add `)` to the current string and increment the count of closing parentheses.

### Time Complexity
The time complexity is not easy to understand for this problem. It rests on understanding how many elements are there in the function. This indicates the **n<sup>th</sup> Catalan** number which is bounded asymptotically by **C<sub>n</sub> = 4<sup>n</sup>/(n$\sqrt(n)$)**. Since each valid sequence has maximum `n` steps, therefore, the time complexity will be ***O(4<sup>n</sup>/$\sqrt(n)$)***.

### Space Complexity
Similar as above logic the total space complexity ***O(4<sup>n</sup>/$\sqrt(n)$)*** for recursive calls and ***O(n)*** for storing the sequence.

## Code

To better visualize the solution, I'd advise you to go copy-paste the code and execute it at [Python Tutor](http://www.pythontutor.com).

### Java

```java
public class GenerateParentheses {

    public List<String> generateParenthesis(int n) {
        // Resultant list
        List<String> result = new ArrayList<>();
        /// Recursively generate parentheses
        generateParenthesis(result, "", 0, 0, n);
        return result;
    }

    private void generateParenthesis(List<String> result, String s, int open, int close, int n) {
        // Base case
        if (open == n && close == n) {
            result.add(s);
            return;
        }
        // If the number of open parentheses is less than the given n
        if (open < n) {
            generateParenthesis(result, s + "(", open + 1, close, n);
        }
        // If we need more close parentheses to balance
        if (close < open) {
            generateParenthesis(result, s + ")", open, close + 1, n);
        }
    }
}
```

### Python

```python
def generate(result: List[str], s: str, _open: int, close: int, n: int):
    # Base condition
    if _open == n and close == n:
        result.append(s)
        return
    # If the number of _open parentheses is less than the given n
    if _open < n:
        generate(result, s + "(", _open + 1, close, n)
    # If we need more close parentheses to balance
    if close < _open:
        generate(result, s + ")", _open, close + 1, n)


def generateParenthesis(n: int) -> List[str]:
    # Resultant list
    result = []
    # Recursively generate parentheses
    generate(result, "", 0, 0, n)
    return result
```

### JavaScript

```javascript
var generateParenthesis = function (n) {
    // Resultant list
    const result = [];
    // Recursively generate parentheses
    generate(result, "", 0, 0, n);
    return result;
};

function generate(result, s, open, close, n) {
    // Base condition
    if (open === n && close === n) {
        result.push(s);
        return;
    }
    // If the number of _open parentheses is less than the given n
    if (open < n) {
        generate(result, s + "(", open + 1, close, n);
    }
    // If we need more close parentheses to balance
    if (close < open) {
        generate(result, s + ")", open, close + 1, n);
    }
};
```

### Kotlin

```java
fun generateParenthesis(n: Int): List<String> {
    // Resultant list
    val result: MutableList<String> = ArrayList()
    /// Recursively generate parentheses
    generateParenthesis(result, "", 0, 0, n)
    return result
}

fun generateParenthesis(result: MutableList<String>, s: String, open: Int, close: Int, n: Int) {
    // Base case
    if (open == n && close == n) {
        result.add(s)
        return
    }
    // If the number of open parentheses is less than the given n
    if (open < n) {
        generateParenthesis(result, "$s(", open + 1, close, n)
    }
    // If we need more close parentheses to balance
    if (close < open) {
        generateParenthesis(result, "$s)", open, close + 1, n)
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/GenerateParentheses.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Generate_Parentheses.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/generate_parentheses.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/GenerateParentheses.kt)

## Conclusion

Congratulations :clap:! We have solved this problem using backtracking.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!