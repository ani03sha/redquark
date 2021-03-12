---
title: 'LeetCode #34 - Find First And Last Position Of Element In Sorted Array'
date: 2021-03-12 19:39:00
category: 'LeetCode'
draft: false
---

Hello LeetCode enthusiasts :wave:! Today we will be discussing a new problem which uses variation of binary search.

- [Find First And Last Position Of Element In Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)

## Problem Statement
Given an array of integers `nums` sorted in ascending order, find the starting and ending position of a given `target` value.

If `target` is not found in the array, return `[-1, -1]`.

### Constraints:
- 0 ≤ `nums.length` ≤ 10<sup>5</sup>
- -10<sup>9</sup> ≤ `nums[i]` ≤ 10<sup>9</sup>
- `nums` is a non-decreasing array.
- -10<sup>9</sup> ≤ `target` ≤ 10<sup>9</sup>

### Follow up
Could you write an algorithm with `O(log n)` runtime complexity?

### Examples

Example 1:
```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

Example 2:

```
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

Example 3:

```
Input: nums = [], target = 0
Output: [-1,-1]
```

## Analysis
We have a sorted array `nums` and a `target` value which we need to search in the array. This description suggests that it is a clear case of ***binary search***. The catch is that the `target` can be repeated in the array.

Thus, there might be multiple indices where the target can be found. Thus, we need to find these indices.
If the element is not found then we should return -1.

## Approach
We will use binary search algorithm to find the first and last occurrences of the `target` separately.

1. For first occurrence, we will first find the index of the number and then search again in the left subarray as long as we are finding the number.
2. For last occurrence, we will first find the index of the number and then search again in the right subarray as long as we are finding the number.

### Time Complexity
Since we are using binary search which halves the number of elements to be considered after each step, therefore, the time complexity will be ***O(log n)***.

### Space Complexity
We are not using any data structures for the intermediate calculations, hence the space complexity will be ***O(1)***.

## Code

### Java

```java
public class FindFirstAndLastPositionOfElementInSortedArray {

    public int[] searchRange(int[] nums, int target) {
        return new int[]{findFirstOccurrence(nums, target), findLastOccurrence(nums, target)};
    }

    private int findFirstOccurrence(int[] nums, int target) {
        // Left and right pointers
        int left = 0;
        int right = nums.length - 1;
        // Index of first occurrence
        int firstOccurrence = -1;
        // Loop until the two pointers meet
        while (left <= right) {
            // Middle index
            int middle = left + (right - left) / 2;
            // Check if we have found the value
            if (nums[middle] == target) {
                firstOccurrence = middle;
                right = middle - 1;
            }
            // If the target is less than the element
            // at the middle index
            else if (target < nums[middle]) {
                right = middle - 1;
            }
            // If the target is greater than the element
            // at the middle index
            else {
                left = middle + 1;
            }
        }
        return firstOccurrence;
    }

    private int findLastOccurrence(int[] nums, int target) {
        // Left and right pointers
        int left = 0;
        int right = nums.length - 1;
        // Index of first occurrence
        int lastOccurrence = -1;
        // Loop until the two pointers meet
        while (left <= right) {
            // Middle index
            int middle = left + (right - left) / 2;
            // Check if we have found the value
            if (nums[middle] == target) {
                lastOccurrence = middle;
                left = middle + 1;
            }
            // If the target is less than the element
            // at the middle index
            else if (target < nums[middle]) {
                right = middle - 1;
            }
            // If the target is greater than the element
            // at the middle index
            else {
                left = middle + 1;
            }
        }
        return lastOccurrence;
    }
}
```

### Python

```python
def findFirstOccurrence(nums, target):
    # Left snd right pointers
    left, right = 0, len(nums) - 1
    # Index of first occurrence
    firstOccurrence = -1
    # Loop until the two pointers meet
    while left <= right:
        # Middle index
        middle = left + (right - left) // 2
        # Check if we have found the value
        if target == nums[middle]:
            firstOccurrence = middle
            right = middle - 1
        # If the target is less than the element
        # at the middle index
        elif target < nums[middle]:
            right = middle - 1
        # If the target is greater than the element
        # at the middle index
        else:
            left = middle + 1
    return firstOccurrence


def findLastOccurrence(nums, target):
    # Left snd right pointers
    left, right = 0, len(nums) - 1
    # Index of first occurrence
    lastOccurrence = -1
    # Loop until the two pointers meet
    while left <= right:
        # Middle index
        middle = left + (right - left) // 2
        # Check if we have found the value
        if target == nums[middle]:
            lastOccurrence = middle
            left = middle + 1
        # If the target is less than the element
        # at the middle index
        elif target < nums[middle]:
            right = middle - 1
        # If the target is greater than the element
        # at the middle index
        else:
            left = middle + 1
    return lastOccurrence


def searchRange(nums: List[int], target: int) -> List[int]:
    return [findFirstOccurrence(nums, target), findLastOccurrence(nums, target)]
```

### JavaScript

```javascript
var searchRange = function (nums, target) {
    return [findFirstOccurrence(nums, target), findLastOccurrence(nums, target)];
};

const findFirstOccurrence = (nums, target) => {
    // Left and right pointers
    let left = 0;
    let right = nums.length - 1;
    // Index of first occurrence
    let firstOccurrence = -1;
    // Loop until the two pointers meet
    while (left <= right) {
        // Middle index
        let middle = left + parseInt((right - left) / 2);
        // Check if we have found the value
        if (nums[middle] === target) {
            firstOccurrence = middle;
            right = middle - 1;
        }
        // If the target is less than the element
        // at the middle index
        else if (target < nums[middle]) {
            right = middle - 1;
        }
        // If the target is greater than the element
        // at the middle index
        else {
            left = middle + 1;
        }
    }
    return firstOccurrence;
};

const findLastOccurrence = (nums, target) => {
    // Left and right pointers
    let left = 0;
    let right = nums.length - 1;
    // Index of first occurrence
    let lastOccurrence = -1;
    // Loop until the two pointers meet
    while (left <= right) {
        // Middle index
        let middle = left + parseInt((right - left) / 2);
        // Check if we have found the value
        if (nums[middle] === target) {
            lastOccurrence = middle;
            left = middle + 1;
        }
        // If the target is less than the element
        // at the middle index
        else if (target < nums[middle]) {
            right = middle - 1;
        }
        // If the target is greater than the element
        // at the middle index
        else {
            left = middle + 1;
        }
    }
    return lastOccurrence;
};
```

### Kotlin

```java
fun searchRange(nums: IntArray, target: Int): IntArray {
    return intArrayOf(findFirstOccurrence(nums, target), findLastOccurrence(nums, target))
}

fun findFirstOccurrence(nums: IntArray, target: Int): Int {
    // Left and right pointers
    var left = 0
    var right = nums.size - 1
    // Index of first occurrence
    var firstOccurrence = -1
    // Loop until the two pointers meet
    while (left <= right) {
        // Middle index
        val middle = left + (right - left) / 2
        // Check if we have found the value
        when {
            nums[middle] == target -> {
                firstOccurrence = middle
                right = middle - 1
            }
            target < nums[middle] -> {
                right = middle - 1
            }
            else -> {
                left = middle + 1
            }
        }
    }
    return firstOccurrence
}

fun findLastOccurrence(nums: IntArray, target: Int): Int {
    // Left and right pointers
    var left = 0
    var right = nums.size - 1
    // Index of first occurrence
    var lastOccurrence = -1
    // Loop until the two pointers meet
    while (left <= right) {
        // Middle index
        val middle = left + (right - left) / 2
        // Check if we have found the value
        when {
            nums[middle] == target -> {
                lastOccurrence = middle
                left = middle + 1
            }
            target < nums[middle] -> {
                right = middle - 1
            }
            else -> {
                left = middle + 1
            }
        }
    }
    return lastOccurrence
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/FindFirstAndLastPositionOfElementInSortedArray.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Find_First_And_Last_Position_Of_Element_In_Sorted_Array.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/find_first_and_last_position_of_element_in_sorted_array.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/FindFirstAndLastPositionOfElementInSortedArray.kt)

## Conclusion

Congratulations :clap:! Today we solved another LeetCode problem which was an extension to the normal binary search.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!