---
title: 'LeetCode #4 - Median Of Two Sorted Arrays'
date: 2020-10-6 19:01:00
category: 'LeetCode'
draft: false
---

What's up happy folks :wave:! Today we are going to discuss a new LeetCode problem - **Median Of Two Sorted Arrays**.

[0004 - Median Of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays).

## Problem Statement
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

### Follow up: 
The overall run time complexity should be ***O(log (m+n))***.

### Constraints:
- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -10<sup>6</sup> <= nums1[i], nums2[i] <= 10<sup>6</sup>

## Examples

Example 1: 

```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

Example 2: 

```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```

## Analysis
The problem looks very simple at first glance. The resulting array will also be a sorted array with the length `m + n`. 

Thus, there can be two cases - 

```
Let's say the merged/combined array is - result
If (m + n) is odd, then the median will be result[(m + n + 1) / 2].
If (m + n) is even, then the median will be (result[(m + n) / 2] + result[(m + n) / 2 + 1]) / 2.
```

The arrays are already sorted so we don't have to worry about that. We can just merge given arrays using the **`merge()`** function of the [Merge Sort](https://en.wikipedia.org/wiki/Merge_sort).

So what's the problem :thinking:? 

The problem is that the question mentions that time complexity should be **O(log(m + n))**. With the merge function, the complexity will be **O(m + n)**. Thus, we cannot use merge function's logic to solve this problem.

## Approach
At this point, I would suggest reading the problem statement one more time very carefully. It has hints which are screaming about the algorithm that we should use to solve this problem.

Did you get it❓ I am sure you did but let's specify it anyway :smile:.

- The arrays are ***sorted***.
- The time complexity should be ***O(log(m + n))***.

YES! We need to use good ol' **[Binary Search](https://en.wikipedia.org/wiki/Binary_search_algorithm)** 🥰.

But how to use Binary Search here? The problem is to find the index in both the arrays such that the elements on the left are smaller than the elements on the right. And this is true for the combined array.

Didn't get it? I would urge you to read the above statement again because this is the central idea of our solution. If you understood it, see the example below - 

```
Let a = [4, 7, 11, 15, 19, 22] => m = 6
Let b = [3, 6, 8, 10, 13, 17, 20] => n = 7
then the combination of a and b would be -
c = [3, 4, 6, 7, 8, 10, 11, 13, 15, 17, 19, 20, 22] => m + n  = 6 + 7 = 13
Thus, the median will be (13 + 1)/2th = 7th element which is 11.
```

This is only possible if we divide arrays a and b at index 2 and 4 respectively.
This way, we will have - 

| Left            | Right          |
|-----------------|----------------|
| a = 4, 7, 11    | a = 15, 19, 22 |
| b = 3, 6, 8, 10 | b = 13, 17, 20 |

Thus, we will use binary search to find these indices where if we divide the arrays, we will get our median. 

How will we find these? 

1. Find the length of the smaller arrays of the two. We will perform binary search on the smaller array.
2. For binary search, we will have two pointers - `start = 0` and `end = m` (assuming m is the smaller length).
3. Loop until `start` meets `end` i.e., `while (start <= end) { ... }`.
4. Calculate the partition index (`partitionA`) for `a` which is the mid-point of start and end i.e., `(start + end) / 2`.
5. Calculate the partition index (`partitionB`) for `b` which is `(m + n + 1) / 2 - partitionA`.
6. Find the maximum element in the left of `a` and `b` and minimum element in the right of `a` and `b`.
7. Now, we can have three cases - 

(i) If (maxLeftA <= minRightB && maxLeftB <= minRightA), then we have hit the jackpot :moneybag:. Now, we can return the median based on `(m + n)` is even or odd.

(ii) Else If (maxLeftA > minRightB), it means, we are too far on the right and we need to go on the left, so, set `end = partitionA - 1`.

(iii) Else, we are too far on the left and we need to go to the right, so, set `start = partitionA + 1`.


## Code

### Java

```java
public class MedianOfTwoSortedArrays {

    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Check if num1 is smaller than num2
        // If not, then we will swap num1 with num2
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        // Lengths of two arrays
        int m = nums1.length;
        int n = nums2.length;
        // Pointers for binary search
        int start = 0;
        int end = m;
        // Binary search starts from here
        while (start <= end) {
            // Partitions of both the array
            int partitionNums1 = (start + end) / 2;
            int partitionNums2 = (m + n + 1) / 2 - partitionNums1;
            // Edge cases
            // If there are no elements left on the left side after partition
            int maxLeftNums1 = partitionNums1 == 0 ? Integer.MIN_VALUE : nums1[partitionNums1 - 1];
            // If there are no elements left on the right side after partition
            int minRightNums1 = partitionNums1 == m ? Integer.MAX_VALUE : nums1[partitionNums1];
            // Similarly for nums2
            int maxLeftNums2 = partitionNums2 == 0 ? Integer.MIN_VALUE : nums2[partitionNums2 - 1];
            int minRightNums2 = partitionNums2 == n ? Integer.MAX_VALUE : nums2[partitionNums2];
            // Check if we have found the match
            if (maxLeftNums1 <= minRightNums2 && maxLeftNums2 <= minRightNums1) {
                // Check if the combined array is of even/odd length
                if ((m + n) % 2 == 0) {
                    return (Math.max(maxLeftNums1, maxLeftNums2) + Math.min(minRightNums1, minRightNums2)) / 2.0;
                } else {
                    return Math.max(maxLeftNums1, maxLeftNums2);
                }
            }
            // If we are too far on the right, we need to go to left side
            else if (maxLeftNums1 > minRightNums2) {
                end = partitionNums1 - 1;
            }
            // If we are too far on the left, we need to go to right side
            else {
                start = partitionNums1 + 1;
            }
        }
        // If we reach here, it means the arrays are not sorted
        throw new IllegalArgumentException();
    }
}
```

### Python

```python
import sys
from typing import List


def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    # Check if nums1 is smaller than nums2
    # If not, then we will swap it with nums2
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    # Lengths of two arrays
    m = len(nums1)
    n = len(nums2)
    # Pointers for binary search
    start = 0
    end = m
    # Binary search starts from here
    while start <= end:
        # Partition indices for both the arrays
        partition_nums1 = (start + end) // 2
        partition_nums2 = (m + n + 1) // 2 - partition_nums1
        # Edge cases
        # If there are no elements left on the left side after partition
        maxLeftNums1 = -sys.maxsize if partition_nums1 == 0 else nums1[partition_nums1 - 1]
        # If there are no elements left on the right side after partition
        minRightNums1 = sys.maxsize if partition_nums1 == m else nums1[partition_nums1]
        # Similarly for nums2
        maxLeftNums2 = -sys.maxsize if partition_nums2 == 0 else nums2[partition_nums2 - 1]
        minRightNums2 = sys.maxsize if partition_nums2 == n else nums2[partition_nums2]
        # Check if we have found the match
        if maxLeftNums1 <= minRightNums2 and maxLeftNums2 <= minRightNums1:
            # Check if the combined array is of even/odd length
            if (m + n) % 2 == 0:
                return (max(maxLeftNums1, maxLeftNums2) + min(minRightNums1, minRightNums2)) / 2
            else:
                return max(maxLeftNums1, maxLeftNums2)
        # If we are too far on the right, we need to go to left side
        elif maxLeftNums1 > minRightNums2:
            end = partition_nums1 - 1
        # If we are too far on the left, we need to go to right side
        else:
            start = partition_nums1 + 1
    # If we reach here, it means the arrays are not sorted
    raise Exception("IllegalArgumentException")
```

### JavaScript

```javascript
var findMedianSortedArrays = function (nums1, nums2) {
    // Check if num1 is smaller than num2
    // If not, then we will swap num1 with num2
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    // Lengths of two arrays
    const m = nums1.length;
    const n = nums2.length;
    // Pointers for binary search
    let start = 0;
    let end = m;
    // Binary search starts from here
    while (start <= end) {
        // Partitions of both the array
        let partitionNums1 = Math.floor((start + end) / 2);
        let partitionNums2 = Math.floor((m + n + 1) / 2) - partitionNums1;
        // Edge cases
        // If there are no elements left on the left side after partition
        let maxLeftNums1 = partitionNums1 == 0 ? Number.MIN_SAFE_INTEGER : nums1[partitionNums1 - 1];
        // If there are no elements left on the right side after partition
        let minRightNums1 = partitionNums1 == m ? Number.MAX_SAFE_INTEGER : nums1[partitionNums1];
        // Similarly for nums2
        let maxLeftNums2 = partitionNums2 == 0 ? Number.MIN_SAFE_INTEGER : nums2[partitionNums2 - 1];
        let minRightNums2 = partitionNums2 == n ? Number.MAX_SAFE_INTEGER : nums2[partitionNums2];
        // Check if we have found the match
        if (maxLeftNums1 <= minRightNums2 && maxLeftNums2 <= minRightNums1) {
            // Check if the combined array is of even/odd length
            if ((m + n) % 2 == 0) {
                return (Math.max(maxLeftNums1, maxLeftNums2) + Math.min(minRightNums1, minRightNums2)) / 2.0;
            } else {
                return Math.max(maxLeftNums1, maxLeftNums2);
            }
        }
        // If we are too far on the right, we need to go to left side
        else if (maxLeftNums1 > minRightNums2) {
            end = partitionNums1 - 1;
        }
        // If we are too far on the left, we need to go to right side
        else {
            start = partitionNums1 + 1;
        }
    }
};
```

### Kotlin

```java
fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
    // Check if num1 is smaller than num2
    // If not, then we will swap num1 with num2
    if (nums1.size > nums2.size) {
        return findMedianSortedArrays(nums2, nums1)
    }
    // Lengths of two arrays
    val m = nums1.size
    val n = nums2.size
    // Pointers for binary search
    var start = 0
    var end = m
    // Binary search starts from here
    while (start <= end) {
        // Partitions of both the array
        val partitionNums1 = (start + end) / 2
        val partitionNums2 = (m + n + 1) / 2 - partitionNums1
        // Edge cases
        // If there are no elements left on the left side after partition
        val maxLeftNums1 = if (partitionNums1 == 0) Int.MIN_VALUE else nums1[partitionNums1 - 1]
        // If there are no elements left on the right side after partition
        val minRightNums1 = if (partitionNums1 == m) Int.MAX_VALUE else nums1[partitionNums1]
        // Similarly for nums2
        val maxLeftNums2 = if (partitionNums2 == 0) Int.MIN_VALUE else nums2[partitionNums2 - 1]
        val minRightNums2 = if (partitionNums2 == n) Int.MAX_VALUE else nums2[partitionNums2]
        // Check if we have found the match
        if (maxLeftNums1 <= minRightNums2 && maxLeftNums2 <= minRightNums1) {
            // Check if the combined array is of even/odd length
            return if ((m + n) % 2 == 0) {
                (maxLeftNums1.coerceAtLeast(maxLeftNums2) + minRightNums1.coerceAtMost(minRightNums2)) / 2.0
            } else {
                maxLeftNums1.coerceAtLeast(maxLeftNums2).toDouble()
            }
        } else if (maxLeftNums1 > minRightNums2) {
            end = partitionNums1 - 1
        } else {
            start = partitionNums1 + 1
        }
    }
    throw IllegalArgumentException()
}
```

## Conclusion

Congratulation! we have solved our first **hard** problem. 

I hope you have enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn. feel free to fork 🔪 and star ⭐ it.

- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/MedianOfTwoSortedArrays.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Median_Of_Two_Sorted_Arrays.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/median_of_two_sorted_arrays.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/MedianOfTwoSortedArrays.kt)

Till next time… Happy coding 😄 and Namaste :pray:!


## Reference
[YouTube](https://www.youtube.com/watch?v=LPFhl65R7ww)