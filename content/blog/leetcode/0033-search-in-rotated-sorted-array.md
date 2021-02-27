---
title: 'LeetCode #33 - Search In Rotated Sorted Array'
date: 2021-02-27 09:48:00
category: 'LeetCode'
draft: false
---

Hello LeetCode enthusiasts :wave:! Today we will be discussing a new array problem.

- [Search In Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

## Problem Statement
There is an integer array `nums` sorted in ascending order (with distinct values).

Prior to being passed to your function, `nums` is rotated at an unknown pivot index `k` (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (0-indexed). For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index 3 and become `[4,5,6,7,0,1,2]`.

Given the array `nums` after the rotation and an integer `target`, return the index of target if it is in `nums`, or -1 if it is not in `nums`.

### Constraints:
- 1 ≤ `nums.length` ≤ 5000
- -10<sup>4</sup> ≤ `nums[i]` ≤ 10<sup>4</sup>
- All values of `nums` are unique.
- `nums` is guaranteed to be rotated at some pivot.
- -10<sup>4</sup> ≤ `target` ≤ 10<sup>4</sup>.

### Follow up: 
Can you achieve this in `O(log n)` time complexity?

### Examples

Example 1:

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

Example 2:

```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

Example 3:

```
Input: nums = [1], target = 0
Output: -1
```

## Analysis
This question is an extension of the binary search. The only catch here is that the array is rotated from an unknown index `k`. For e.g., let's say we have a sorted array `A = [1, 2, 3, 4, 5, 6]`, and if I rotated it from index 3 then it will become `A = [4, 5, 6, 1, 2, 3]`. 

This still gives an illusion of an *unsorted* array, but it isn't actually if we can find the index from where it is sorted.

## Approach

The approach is simple if we are able to find the index from where the given array is rotated. We can follow below steps to solve this problem — 

1. Find the index where the array is rotated. Notice if a *sorted* array is *rotated* then the rightmost element will not be the biggest element in the array.
2. Using the information in step #1, we can perform binary search to find the index where the array is rotated.
3. Once we have found that index, then we can easily determine in which half (array will be divided into two halves by the pivot index) of the array the `target` lies.
4. Notice, the two halves are themselves will be sorted (this is pretty intuitive, right :smile:?).
5. We can then perform binary search once again in the determined half to find the index of the target element.

### Time Complexity
Since we are discarding one half of the array after every iteration, the time complexity will be ***O(log n)***.

### Space Complexity
We are not using any data structure for intermediate calculations, hence the space complexity would be ***O(1)***.

## Code

### Java

```java
public class SearchInRotatedSortedArray {

    public int search(int[] nums, int target) {
        // Special case
        if (nums == null || nums.length == 0) {
            return -1;
        }
        // Left and right pointers in the array
        int left = 0;
        int right = nums.length - 1;
        // First step is to find the pivot where the
        // array is rotated
        while (left < right) {
            // Middle pointer
            int middle = left + (right - left) / 2;
            // If the element at the mid is greater than
            // the element at the right then we can say that
            // the array is rotated after middle index
            if (nums[middle] > nums[right]) {
                left = middle + 1;
            }
            // Else, the pivot is in the left part
            else {
                right = middle;
            }
        }
        // After the above loop is completed, then the
        // left index will point to the pivot
        int pivot = left;
        left = 0;
        right = nums.length - 1;
        // Now we will find in which half of the array,
        // our target is present
        if (target >= nums[pivot] && target <= nums[right]) {
            left = pivot;
        } else {
            right = pivot;
        }
        // Now perform normal binary search
        while (left <= right) {
            int middle = left + (right - left) / 2;
            if (nums[middle] == target) {
                return middle;
            } else if (target < nums[middle]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }
        return -1;
    }
}
```

### Python

```python
def search(nums: List[int], target: int) -> int:
    # Special case
    if nums is None or len(nums) == 0:
        return -1
    # Left and right pointers for the array
    left, right = 0, len(nums) - 1
    # First step is to find the pivot where the array
    # is rotated
    while left < right:
        # Middle index
        middle = left + (right - left) // 2
        # If the element at the mid is greater than
        # the element at the right then we can say that
        # the array is rotated after middle index
        if nums[middle] > nums[right]:
            left = middle + 1
        # Else, the pivot is in the left part
        else:
            right = middle
    # After the above loop is completed, then the
    # left index will point to the pivot
    pivot = left
    left, right = 0, len(nums) - 1
    # Now we will find in which half of the array,
    # our targetValue is present
    if nums[pivot] <= target <= nums[right]:
        left = pivot
    else:
        right = pivot
    # Now perform normal binary search
    while left <= right:
        middle = left + (right - left) // 2
        if nums[middle] == target:
            return middle
        elif nums[middle] < target:
            left = middle + 1
        else:
            right = middle - 1
    return -1
```

### JavaScript

```javascript
var search = function (nums, target) {
    // Special case
    if (nums === null || nums.length === 0) {
        return -1;
    }
    // Left and right pointers in the array
    let left = 0;
    let right = nums.length - 1;
    // First step is to find the pivot where the
    // array is rotated
    while (left < right) {
        // Middle pointer
        let middle = left + parseInt((right - left) / 2);
        // If the element at the mid is greater than
        // the element at the right then we can say that
        // the array is rotated after middle index
        if (nums[middle] > nums[right]) {
            left = middle + 1;
        }
        // Else, the pivot is in the left part
        else {
            right = middle;
        }
    }
    // After the above loop is completed, then the
    // left index will point to the pivot
    const pivot = left;
    left = 0;
    right = nums.length - 1;
    // Now we will find in which half of the array,
    // our target is present
    if (target >= nums[pivot] && target <= nums[right]) {
        left = pivot;
    } else {
        right = pivot;
    }
    // Now perform normal binary search
    while (left <= right) {
        let middle = left + parseInt((right - left) / 2);
        if (nums[middle] === target) {
            return middle;
        } else if (target < nums[middle]) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    return -1;
};
```

### Kotlin

```java
fun search(nums: IntArray, target: Int): Int {
    // Special case
    if (nums.isEmpty()) {
        return -1
    }
    // Left and right pointers in the array
    var left = 0
    var right = nums.size - 1
    // First step is to find the pivot where the
    // array is rotated
    while (left < right) {
        // Middle pointer
        val middle = left + (right - left) / 2
        // If the element at the mid is greater than
        // the element at the right then we can say that
        // the array is rotated after middle index
        if (nums[middle] > nums[right]) {
            left = middle + 1
        } else {
            right = middle
        }
    }
    // After the above loop is completed, then the
    // left index will point to the pivot
    val pivot = left
    left = 0
    right = nums.size - 1
    // Now we will find in which half of the array,
    // our target is present
    if (target >= nums[pivot] && target <= nums[right]) {
        left = pivot
    } else {
        right = pivot
    }
    // Now perform normal binary search
    while (left <= right) {
        val middle = left + (right - left) / 2
        if (nums[middle] == target) {
            return middle
        } else if (target < nums[middle]) {
            right = middle - 1
        } else {
            left = middle + 1
        }
    }
    return -1
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/SearchInRotatedSortedArray.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Search_In_Rotated_Sorted_Array.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/search_in_rotated_sorted_array.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/SearchInRotatedSortedArray.kt)

## Conclusion

Congratulations :clap:! Today we solved another LeetCode problem which was an extension to the normal binary search.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!
