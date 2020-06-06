---
title: 'Sliding Window Algorithm'
date: 2020-6-06 00:47:00
category: 'Concept Of The Day'
draft: false
---

The **Sliding Window Algorithm** is primarily used for the problems dealing with linear data structures like Arrays, Lists, Strings etc. These problems can easily be solved using Brute Force techniques which result in quadratic or exponential time complexity. Sliding window technique reduces the required time to linear ```O(n)```.

## What on earth is Sliding Window Algorithm? :confused:

The answer is hidden in its name **SLIDING WINDOW** :star_struck:. Let's take an example - suppose you are sitting in a car with all glasses up. When you try to open the glass window, it doesn't open fully at once. You have to use Power Window buttons so that the glass comes down gradually. It actually **slides**.

What does this have to do with computer science, you ask? Consider below array - 

**```[a, b, c, d, e, f]```**.

Suppose you have a window of size **```k = 2```**.

If we slide this window by k then we will get the following subarrays - 

```
[a, b]
        [b, c]
                [c, d]
                        [d, e]
                                [e,f]
```

As you can see, each time we are considering two elements. 
- First time we consider first two elements.
- Then we slide our window by one element every time from left to right.
- At each slide, the left element is discarded and the next element (outside of window) is included.

Fairly simple, yeah? :smile:

## How to know if Sliding Window technique is applicable? :thinking:

It's not that hard! There are a some common giveaways which let you decide if sliding window technique is applicable - 
1. The problem will involve a data structure which is ordered and iterable, like arrays, lists, strings etc.
2. The ask is to find a part of the given data structure e.g. longest/shortest subarray.
3. The naive solution is either quadratic ```O(N^2)``` or exponential ```O(2^N)```.

## Common problems on Sliding Window technique - 

**1. Calculate maximum sum of k consecutive elements in an array**

Given an array of n integers and size k, where k < n, find the maximum sum of k consecutive elements in the array.

What do we get from the above statement -

- Data structure in question is an array - a linear data structure which is ordered and iterable
- We need to find a part of the array having maximum sum
- Brute force solution is to get every combination of subarrays and find the one with maximum sum. Time complexity will be ```O(k * n)```. 

Clearly, the above three giveaways are enough to tell us to apply Sliding Window algorithm.

### Approach

The approach is simple - 
1. Since the window should be of size k, let us first find the sum of first k elements in the array.
```
currentSum = A[0] + A[1] + ... + A[k - 1]
```
2. At this point, the maximum sum will be equal to the current sum.
```
maximumSum = currentSum
```
3. Slide the window by one element and update the value of current sum (discard the left most element and include the next element to the right most element). Compare the current sum with maximum sum and if maximumSum < currentSum, update maximum sum to current sum.
```
i = k:
currentSum = A[1] + A[2] + ... + A[k]
is => maximumSum < currentSum => False => do nothing
i = k + 1:
currentSum = A[2] + A[3] + ... + A[k + 1]
is => maximumSum < currentSum => True => maximumSum = currentSum
```

Let's write some code - 

### Java
```java
public class MaximumSumOfKElements {

    private static int findMaximumSum(int[] a, int k) {
        int n = a.length;
        // Current sum - sum of the current window
        int currentSum = 0;
        // Maximum sum - maximum sum of k consecutive elements in an array
        int maximumSum = 0;
        // Find the sum of first k elements
        for (int i = 0; i < k; i++) {
            currentSum += a[i];
        }
        // At this point, maximum and current sum will be same
        maximumSum = currentSum;
        // Loop for the remaining elements by sliding the window
        for (int i = k; i < n; i++) {
            // Discard the left most element
            currentSum -= a[i - k];
            // Included the current element
            currentSum += a[i];
            if (maximumSum < currentSum) {
                maximumSum = currentSum;
            }
        }
        return maximumSum;
    }

    public static void main(String[] args) {
        int[] a = {1, 4, 2, 10, 2, 3, 1, 0, 20};
        int k = 4;
        System.out.println("Maximum sum: " + findMaximumSum(a, k));
    }
}
```

### Python
```python
def find_maximum_sum(a, k):
    n = len(a)
    # Current sum - sum of the current window
    current_sum = 0
    # Maximum sum - maximum sum of k consecutive elements in an array
    maximum_sum = 0
    # Find the sum of first k elements
    for i in range(0, k):
        current_sum += a[i]
    # At this point, maximum and current sum will be same
    maximum_sum = current_sum
    # Loop for the remaining elements by sliding the window
    for i in range(k, n):
        # Discard the left most element
        current_sum -= a[i - k]
        # Include the current element
        current_sum += a[i]
        if maximum_sum < current_sum:
            maximum_sum = current_sum
    return maximum_sum


a = [1, 4, 2, 10, 2, 3, 1, 0, 20]
k = 4
print("Maximum sum:", find_maximum_sum(a, k))
```

### Kotlin
```kotlin
fun findMaximumSum(a: IntArray, k: Int): Int {
    val n = a.size
    // Current sum - sum of the current window
    var currentSum = 0
    // Maximum sum - maximum sum of k consecutive elements in an array
    var maximumSum: Int
    // Find the sum of first k elements
    for (i in 0 until k) {
        currentSum += a[i]
    }
    // At this point, maximum and current sum will be same
    maximumSum = currentSum
    // Loop for the remaining elements by sliding the window
    for (i in k until n) {
        // Discard the left most element
        currentSum -= a[i - k]
        // Included the current element
        currentSum += a[i]
        if (maximumSum < currentSum) {
            maximumSum = currentSum
        }
    }
    return maximumSum
}

fun main() {
    val a = intArrayOf(1, 4, 2, 10, 2, 3, 1, 0, 20)
    val k = 4
    println("Maximum sum: " + findMaximumSum(a, k))
}
```

### JavaScript
```javascript
function find_maximum_sum(a, k) {
    const n = a.length;
    // Current sum - sum of the current window
    let current_sum = 0;
    // Maximum sum - maximum sum of k consecutive elements in an array
    let maximum_sum = 0;
    // Find the sum of first k elements
    for (let i = 0; i < k; i++) {
        current_sum += a[i];
    }
    // At this point, maximum and current sum will be same
    maximum_sum = current_sum;
    // Loop for the remaining elements by sliding the window
    for (let i = k; i < n; i++) {
        // Discard the left most element
        current_sum -= a[i - k];
        // Included the current element
        current_sum += a[i];
        if (maximum_sum < current_sum) {
            maximum_sum = current_sum;
        }
    }
    return maximum_sum;
}

const a = [1, 4, 2, 10, 2, 3, 1, 0, 20];
const k = 4;
console.log("Maximum sum: " + find_maximum_sum(a, k));
```
------------------------------------------------------

**2. Anagram substring search**

This is another problem where we are given two strings ```text``` and ```pattern``` of size n and m respectively where m < n. Our task is to find all the indices in text where anagrams of pattern are found.

What do we get from the above problem statement?
- Data structure is string - linear and iterable
- We need to find the part of the string (```pattern``` in ```text```).
- Brute force will give us quadratic time ```O(N * M)```.

### Approach

Assuming character size is fixed, we will do the following -
1. Count character frequencies of both the strings
2. Loop from m to n-1
    - If two count arrays are same (having same characters equal number of times), we've found a match :smile:.
    - Discard left most character by decrementing its count by 1.
    - Include the current character by incrementing its count by 1.

Let's write some code

### Java
```java
import java.util.ArrayList;
import java.util.List;

public class AnagramSubstringSearch {

    private static List<Integer> findIndices(String text, String pattern) {
        // Lengths of strings
        int n = text.length();
        int m = pattern.length();
        // List that will store the indices
        List<Integer> indices = new ArrayList<>();
        // Frequency arrays - assuming we have a set of 256 characters
        int[] textCount = new int[256];
        int[] patternCount = new int[256];
        // Loop until m
        for (int i = 0; i < m; i++) {
            textCount[text.charAt(i)]++;
            patternCount[pattern.charAt(i)]++;
        }
        // At this point, we have traversed m characters in both the arrays.
        // Now we will loop through the remaining characters
        for (int i = m; i < n; i++) {
            // Check if the counts of characters in frequency arrays are equal or not
            if (isCountEqual(textCount, patternCount)) {
                indices.add(i - m);
            }
            // Discard left most character
            textCount[text.charAt(i - m)]--;
            // Include current character
            textCount[text.charAt(i)]++;
        }
        // Check for the last window
        if (isCountEqual(textCount, patternCount)) {
            indices.add(n - m);
        }
        return indices;
    }

    private static boolean isCountEqual(int[] textCount, int[] patternCount) {
        for (int i = 0; i < 256; i++) {
            if (textCount[i] != patternCount[i]) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        String text = "BACDGABCDA";
        String pattern = "ABCD";
        System.out.println("Anagrams are found at: " + findIndices(text, pattern));

        text = "XYYZXZYZXXYZ";
        pattern = "XYZ";
        System.out.println("Anagrams are found at: " + findIndices(text, pattern));
    }
}
```

### Python
```python
def isCountEqual(text_count, pattern_count):
    for i in range(0, 256):
        if text_count[i] != pattern_count[i]:
            return False
    return True


def find_indices(text, patten):
    # Lengths of input strings
    n = len(text)
    m = len(patten)
    # list that will store the indices
    indices = []
    # Frequency arrays - assuming we have a set of 256 characters
    text_count = [0] * 256
    pattern_count = [0] * 256
    # Loop for the first m characters
    for i in range(0, m):
        text_count[ord(text[i])] += 1
        pattern_count[ord(patten[i])] += 1
    # At this point, we have traversed m characters in both the arrays.
    # Now we will loop through the remaining characters
    for i in range(m, n):
        # Check if the counts of characters in frequency arrays are equal or not
        if isCountEqual(text_count, pattern_count):
            indices.append(i - m)
        # Discard the left most character
        text_count[ord(text[i - m])] -= 1
        # Include the current character
        text_count[ord(text[i])] += 1
    # For the last window
    if isCountEqual(text_count, pattern_count):
        indices.append(n - m)
    return indices


text = "BACDGABCDA"
pattern = "ABCD"
print(str(find_indices(text, pattern))[1:-1])

text = "XYYZXZYZXXYZ"
pattern = "XYZ"
print(str(find_indices(text, pattern))[1:-1])
```

### Kotlin
```kotlin
private fun findIndices(text: String, pattern: String): List<Int> {
    // Lengths of strings
    val n = text.length
    val m = pattern.length
    // List that will store the indices
    val indices: MutableList<Int> = ArrayList()
    // Frequency arrays - assuming we have a set of 256 characters
    val textCount = IntArray(256)
    val patternCount = IntArray(256)
    // Loop until m
    for (i in 0 until m) {
        textCount[text[i].toInt()]++
        patternCount[pattern[i].toInt()]++
    }
    // At this point, we have traversed m characters in both the arrays.
    // Now we will loop through the remaining characters
    for (i in m until n) {
        // Check if the counts of characters in frequency arrays are equal or not
        if (isCountEqual(textCount, patternCount)) {
            indices.add(i - m)
        }
        // Discard left most character
        textCount[text[i - m].toInt()]--
        // Include current character
        textCount[text[i].toInt()]++
    }
    // Check for the last window
    if (isCountEqual(textCount, patternCount)) {
        indices.add(n - m)
    }
    return indices
}

private fun isCountEqual(textCount: IntArray, patternCount: IntArray): Boolean {
    for (i in 0..255) {
        if (textCount[i] != patternCount[i]) {
            return false
        }
    }
    return true
}

fun main() {
    var text = "BACDGABCDA"
    var pattern = "ABCD"
    println("Anagrams are found at: " + findIndices(text, pattern))

    text = "XYYZXZYZXXYZ"
    pattern = "XYZ"
    println("Anagrams are found at: " + findIndices(text, pattern))
}
```

### JavaScript
```javascript
function find_indices(s, p) {
    // Set of indices
    let result = [];
    // Build a hash of the letters.
    let wordHash = {}; // Master copy.
    let hash = {}; // Current copy.
    p.split('').forEach(function (letter) {
        wordHash[letter] = wordHash[letter] ? wordHash[letter] + 1 : 1;
        hash[letter] = hash[letter] ? hash[letter] + 1 : 1;
    });

    let count = 0;
    let index = -1;

    for (let i = 0; i < s.length; i++) {
        let letter = s[i];
        if (hash[letter]) {
            // Part or start of an anagram.
            if (index === -1) {
                index = i;
            }
            hash[letter]--;
            count++;
            if (count === p.length) {
                // Completed an anagram.
                result.push(index);

                // Reset variables.
                hash[s[index]]++;

                count = p.length - 1;
                index++;
            }
        }
        else {
            // Reset variables.
            if (index !== -1 && hash[letter] !== undefined && (p.length <= s.length - index)) {
                // Find first occurrence of 'letter'. Set the starting point 'index' to next letter.
                for (var j = index; j < i; j++) {
                    index++;
                    if (s[j] === letter) {
                        break;
                    }
                    else {
                        hash[s[j]]++;
                        count--;
                    }
                }
            }
            else {
                // Restore hash and counter.
                let keys = Object.keys(hash);
                for (let j = 0; j < keys.length; j++) {
                    hash[keys[j]] = wordHash[keys[j]];
                }
                count = 0;
                index = -1;
            }
        }
    }
    return result;
}


let text = "BACDGABCDA";
let pattern = "ABCD";
console.log("Anagrams found at: " + find_indices(text, pattern));

text = "XYYZXZYZXXYZ";
pattern = "XYZ";
console.log("Anagrams found at: " + find_indices(text, pattern));
```


## Conclusion

Whoa, such a long post 😌! In this post, we learned about a very useful technique of solving linear data structure problems call "Sliding Window technique". I hope you have enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/ConceptOfTheDay) repository. If you like what you learn. feel free to fork :knife: and star :star: it.

Till next time... Happy coding :smile:! 