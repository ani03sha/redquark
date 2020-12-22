---
title: 'LeetCode #30 - Substring With Concatenation Of All Words'
date: 2020-12-22 20:04:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! Today we will discuss a hard problem which is very popular problems in coding interviews.

- [Substring With Concatenation Of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)

## Problem Statement
You are given a string `s` and an array of strings `words` of the same length. Return all starting indices of substring(s) in `s` that is a concatenation of each word in `words` exactly once, in any order, and without any intervening characters. You can return the answer in any order.

### Constraints:
- 1 ≤ `s.length` ≤ 10<sup>4</sup>
- `s` consists of lower-case English letters.
- 1 ≤ `words.length` ≤ 5000
- 1 ≤ `words[i].length` ≤ 30
- `words[i]` consists of lower-case English letters.

### Examples

Example 1:

```
Input: s = "barfoothefoobarman", words = ["foo","bar"]
Output: [0,9]
```

Example 2:

```
Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
Output: []
```

Example 3:

```
Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
Output: [6,9,12]
```

## Analysis
We will be given a string `s` and an array of strings `words`. The ask is to combine every element of the `words` array, in any order to make a long string and check if such string exists in the given string `s`. If it does, then we need to return the starting index of the combined string in the `s`.

For e.g., if `s = barfoothefoobarman` and `words = ["foo","bar"]`, we have two concatenated permutations of strings in the `words` array which are `foobar` and `barfoo`.

Now, we need to search both these permutations in `s` and return their starting indices. In our case, we will return indices list containing **0** and **9**.

It is important to note that all the strings in the `words` array will should be present in the combined string to be searched in `s`. If any string is not present in `s`, then we will return empty list.

Also, note that every string in `words` is of same length.

## Approach
If we look at the problem, first constraint we find is that all the strings in `words` array should be included in the combination. Even if a string is repeated in the array, it should be considered in the combination that many times.

For e.g., if `words == ["foo", "foo"]`, then we need to search `foofoo` in the `s`. Thus, we can use Map to store the count of each string in the `words`.

Since every string in `words` is of equal length, the length of the string combination we need to search in `words` will be -

```
// Length of each word
wordLength = words[0].length()
// Total length
wordArrayLength = wordLength * words.length
```

Now, we need to search a string of length `wordArrayLength` in the `s`. After getting the substring string, we will check if all the strings present in the `words` are present in it. If they are, we will add the starting index, otherwise we will skip.

Below are steps - 
1. Store the count of each string in `words` in a map, say `wordCount`.
2. Loop through the `s` and in each iteration, do the following -
3. Get the substring of length `wordArrayLength`.
4. Break this substring into further substrings of length `wordLength`.
5. Store the count of substrings fount in #4 into another map.
6. At last, check if both the maps are equal. If they are, then add the current index in the resultant list.

The most important part in the above algorithm is to understand why we are comparing maps :thinking:? We are doing it because if the combined string lies in the `s`, then counts of all the strings in `words` will be equal to the count of all the partitions in the substring of length `wordArryaLength`.


### Time Complexity
Since we are scanning every string in `words` and every character in `s`, the time complexity will be ***O(mn)***, where `m => length of words` and `n => length of s`


### Space Complexity
We are using two maps to store the contents of `words` and partitions of substrings of `s` therefore, the space complexity will be ***O(m + n)***.

## Code

### Java

```java
public class SubstringWithConcatenationOfAllWords {

    public List<Integer> findSubstring(String s, String[] words) {
        // Resultant list
        List<Integer> indices = new ArrayList<>();
        // Base conditions
        if (s == null || s.isEmpty() || words == null || words.length == 0) {
            return indices;
        }
        // Store the words and their counts in a hash map
        Map<String, Integer> wordCount = new HashMap<>();
        for (String word : words) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }
        // Length of each word in the words array`
        int wordLength = words[0].length();
        // Length of all the words combined in the array
        int wordArrayLength = wordLength * words.length;
        // Loop for the entire string
        for (int i = 0; i <= s.length() - wordArrayLength; i++) {
            // Get the substring of length equal to wordArrayLength
            String current = s.substring(i, i + wordArrayLength);
            // Map to store each word of the substring
            Map<String, Integer> wordMap = new HashMap<>();
            // Index to loop through the words array
            int index = 0;
            // Index to get each word in the current
            int j = 0;
            // Loop through each word of the words array
            while (index < words.length) {
                // Divide the current string into strings of length of
                // each word in the array
                String part = current.substring(j, j + wordLength);
                // Put this string into the wordMap
                wordMap.put(part, wordMap.getOrDefault(part, 0) + 1);
                // Update j and index
                j += wordLength;
                index++;
            }
            // At this point compare the maps
            if (wordCount.equals(wordMap)) {
                indices.add(i);
            }
        }
        return indices;
    }
}
```

### Python

```python
class SubstringWithConcatenationOfAllWords:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        # Resultant list
        indices = []
        # Base conditions
        if s is None or len(s) == 0 or words is None or len(words) == 0:
            return indices

        # Dictionary to store the count of each word in the words array
        wordCount = dict()
        # Loop to store count of each word in the array
        for i in range(len(words)):
            if words[i] in wordCount:
                wordCount[words[i]] += 1
            else:
                wordCount[words[i]] = 1
        # Length of each word in the words array
        wordLength = len(words[0])
        # Total length of all the words in the array
        wordArrayLength = wordLength * len(words)
        # Loop for each character in the string
        for i in range(0, len(s) - wordArrayLength + 1):
            # Get the current string
            current = s[i:i + wordArrayLength]
            # Map to store the count of each word in the current
            wordMap = dict()
            # Index to loop through the array
            index = 0
            # Index to partition the current string
            j = 0
            # Loop through the words array
            while index < len(words):
                # Partition the string
                part = current[j: j + wordLength]
                # Save this in wordMap
                if part in wordMap:
                    wordMap[part] += 1
                else:
                    wordMap[part] = 1
                # Update the indices
                j += wordLength
                index += 1
            # Compare the two maps
            if wordMap == wordCount:
                indices.append(i)
        return indices
```

### JavaScript

```javascript
var findSubstring = function (s, words) {
    // Resultant list
    const indices = [];
    // Base conditions
    if (s === null || s.length === 0 || words === null || words.length == 0) {
        return indices;
    }
    // Store the words and their counts in a hash map
    const wordCount = words.reduce((a, b) => {
        a[b] = (a[b] + 1) || 1;
        return a;
    }, {});
    // Length of each word in the words array`
    const wordLength = words[0].length;
    // Length of all the words combined in the array
    const wordArrayLength = wordLength * words.length;
    // Loop for the entire string
    for (let i = 0; i <= s.length - wordArrayLength; i++) {
        // Get the substring of length equal to wordArrayLength
        let current = s.substring(i, i + wordArrayLength);
        // Map to store each word of the substring
        const wordMap = {};
        // Index to loop through the words array
        let index = 0;
        // Index to get each word in the current
        let j = 0;
        // Loop through each word of the words array
        while (index < words.length) {
            // Divide the current string into strings of length of
            // each word in the array
            const part = current.substring(j, j + wordLength);
            // Put this string into the wordMap
            wordMap[part] = (wordMap[part] + 1) || 1;
            // Update j and index
            j += wordLength;
            index++;
        }
        // At this point compare the maps
        let a = JSON.stringify(Object.entries(wordCount).sort());
        let b = JSON.stringify(Object.entries(wordMap).sort());
        if (a === b) {
            indices.push(i);
        }
    }
    return indices;  
};
```

### Kotlin

```java
class SubstringWithConcatenationOfAllWords {

    fun findSubstring(s: String, words: Array<String>): List<Int> {
        // Resultant list
        val indices: MutableList<Int> = ArrayList()
        // Base conditions
        if (s.isEmpty() || words.isEmpty()) {
            return indices
        }
        // Store the words and their counts in a hash map
        val wordCount: MutableMap<String, Int> = HashMap()
        for (word in words) {
            wordCount[word] = wordCount.getOrDefault(word, 0) + 1
        }
        // Length of each word in the words array
        val wordLength = words[0].length
        // Length of all the words combined in the array
        val wordArrayLength = wordLength * words.size
        // Loop for the entire string
        for (i in 0..s.length - wordArrayLength) {
            // Get the substring of length equal to wordArrayLength
            val current = s.substring(i, i + wordArrayLength)
            // Map to store each word of the substring
            val wordMap: MutableMap<String, Int> = HashMap()
            // Index to loop through the words array
            var index = 0
            // Index to get each word in the current
            var j = 0
            // Loop through each word of the words array
            while (index < words.size) {
                // Divide the current string into strings of length of
                // each word in the array
                val part = current.substring(j, j + wordLength)
                // Put this string into the wordMap
                wordMap[part] = wordMap.getOrDefault(part, 0) + 1
                // Update j and index
                j += wordLength
                index++
            }
            // At this point compare the maps
            if (wordCount == wordMap) {
                indices.add(i)
            }
        }
        return indices
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/SubstringWithConcatenationOfAllWords.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Substring_With_Concatenation_Of_All_Words.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/substring_with_concatenation_of_all_words.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/SubstringWithConcatenationOfAllWords.kt)

## Conclusion

Congratulations :clap:! Today we solved a new problem which uses sliding window and hashing techniques.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!