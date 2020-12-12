---
title: 'LeetCode #27 - Remove Element'
date: 2020-12-12 21:29:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! Today we will be looking into a fairly simple LeetCode problem.

- [Remove Element](https://leetcode.com/problems/remove-element/)

## Problem Statement
Given an array `nums` and a value `val`, remove all instances of that value in-place and return the new length.
Do not allocate extra space for another array, you must do this by modifying the input array in-place with ***O(1)*** extra memory.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

**Clarification:**

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by reference, which means a modification to the input array will be known to the caller as well.

Internally you can think of this:
```
// nums is passed in by reference. (i.e., without making a copy)
int len = removeElement(nums, val);

// any modification to nums in your function would be known by the caller.
// using the length returned by your function, it prints the first len elements.
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

### Constraints:
- 0 ≤ `nums.length` ≤ 100
- 0 ≤ `nums[i]` ≤ 50
- 0 ≤ `val` ≤ 100

### Examples

Example 1:

```
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2]
Explanation: Your function should return length = 2, with the first two elements of nums being 2.
It doesn't matter what you leave beyond the returned length. For example if you return 2 with nums = [2,2,3,3] or nums = [2,3,0,0], your answer will be accepted.
```

Example 2:

```
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3]
Explanation: Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4. Note that the order of those five elements can be arbitrary. It doesn't matter what values are set beyond the returned length.
```

## Analysis
We will be given an array `nums` and a value `val`. We need to remove all occurrences of `val` from the array. In the end, we need to return the length of remaining elements after deleting all occurrences of `val`.

## Approach
We will follow below steps — 

1. Take a variable `count`. This will count the number of elements except `val`.
2. Scan the array left to right.
3. If the current element is not equal to `val`, we will add that element to the place of `count`.

### Time Complexity
Since there is a single scan of the array, the time complexity will be ***O(n)***.

### Space Complexity
We are not using any data structure for internal computations, hence the space complexity will be ***O(1)***.

## Code

### Java

```java
public class RemoveElement {

    public int removeElement(int[] nums, int val) {
        // Counter for keeping track of elements other than val
        int count = 0;
        // Loop through all the elements of the array
        for (int i = 0; i < nums.length; i++) {
            // If the element is not val
            if (nums[i] != val) {
                nums[count++] = nums[i];
            }
        }
        return count;
    }
}
```

### Python

```python
class RemoveElement:
    def removeElement(nums: List[int], val: int) -> int:
        # Counter for keeping track of elements other than val
        count = 0
        # Loop through all the elements of the array
        for i in range(len(nums)):
            if nums[i] != val:
                # If the element is not val
                nums[count] = nums[i]
                count += 1
        return count
```

### JavaScript

```javascript
var removeElement = function (nums, val) {
    // Counter for keeping track of elements other than val
    let count = 0;
    // Loop through all the elements of the array
    for (let i = 0; i < nums.length; i++) {
        // If the element is not val
        if (nums[i] !== val) {
            nums[count++] = nums[i];
        }
    }
    return count;
};
```

### Kotlin

```java
class RemoveElement {
    fun removeElement(nums: IntArray, `val`: Int): Int {
        // Counter for keeping track of elements other than val
        var count = 0
        // Loop through all the elements of the array
        for (i in nums.indices) {
            // If the element is not val
            if (nums[i] != `val`) {
                nums[count++] = nums[i]
            }
        }
        return count
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/RemoveElement.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Remove_Element.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/remove_element.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/RemoveElement.kt)

## Conclusion

Congratulations :clap:! In this post, we solved an easy problem from LeetCode involving array.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!