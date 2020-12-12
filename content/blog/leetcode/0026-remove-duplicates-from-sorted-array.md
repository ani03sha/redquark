---
title: 'LeetCode #26 - Remove Duplicates In Sorted Array'
date: 2020-12-12 19:14:00
category: 'LeetCode'
draft: false
---

Hello happy people :wave:! Let's look at another LeetCode problem today.

- [Remove Duplicates From Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

## Problem Statement
Given a sorted array `nums`, remove the duplicates in-place such that each element appears only once and returns the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with ***O(1)*** extra memory.

Clarification:
Confused why the returned value is an integer but your answer is an array?
Note that the input array is passed in by reference, which means a modification to the input array will be known to the caller as well.

Internally you can think of this:
```
// nums is passed in by reference. (i.e., without making a copy)
int len = removeDuplicates(nums);

// any modification to nums in your function would be known by the caller.
// using the length returned by your function, it prints the first len elements.
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

### Constraints:
- 0 ≤ `nums.length` ≤ 3 × 10<sup>4</sup>
- -10<sup>4</sup> ≤ `nums[i]` ≤ 10<sup>4</sup>
- `nums` is sorted in ascending order.

### Examples
Example 1:

```
Input: nums = [1,1,2]
Output: 2, nums = [1,2]
Explanation: Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the returned length.
```

Example 2:

```
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4]
Explanation: Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively. It doesn't matter what values are set beyond the returned length.
```

## Analysis
This problem is as straight-forward as its description is :smiley:. We will be given a sorted array containing duplicates, and we need to keep only single instance of each element.
Also, we need to update the array **in-place** which means we have to do all the manipulations in the same array without using any data structure.

At the end, we have to return the length of the updated array.

## Approach
One important thing in the question is that ***the array is sorted***. This means that all the duplicate elements will be adjacent to each other. For e.g., in the array `[1,2,2,3,4,4,4,5,5,6,7]`, we see all the duplicate elements are adjacent to each other. 

We can use this property of the sorted array containing duplicates to solve this question using the following steps — 

1. Check if the current and the next element are equal.
2. If they are, we will skip the next element and will continue the procedure as long as we encounter the duplicates.
3. If the elements are not duplicate, we will place the next (different) element next to the current element.

### Time Complexity
We are scanning the array once, hence the time complexity will be ***O(n)***.

### Space Complexity
Since we are forbidden to use the external data structure (and we are not using it :stuck_out_tongue:), the space complexity will be ***O(1)***.

## Code

### Java

```java
public class RemoveDuplicatesFromSortedArray {

    public int removeDuplicates(int[] nums) {
        // Length of the updated array
        int count = 0;
        // Loop for all the elements in the array
        for (int i = 0; i < nums.length; i++) {
            // If the current element is equal to the next element, we skip
            if (i < nums.length - 1 && nums[i] == nums[i + 1]) {
                continue;
            }
            // We will update the array in place
            nums[count] = nums[i];
            count++;
        }
        return count;
    }
}
```

### Python

```python
class RemoveDuplicatesFromSortedArray:
    def removeDuplicates(self, nums: List[int]) -> int:
        # Length of the update array
        count = 0
        # Loop for all the elements in the array
        for i in range(len(nums)):
            # If the current element is equal to the next element, we skip
            if i < len(nums) - 2 and nums[i] == nums[i + 1]:
                continue
            # We will update the array in place
            nums[count] = nums[i]
            count += 1
        return count
```

### JavaScript

```javascript
var removeDuplicates = function (nums) {
    // Length of the updated array
    let count = 0;
    // Loop for all the elements in the array
    for (let i = 0; i < nums.length; i++) {
        // If the current element is equal to the next element, we skip
        if (i < nums.length - 1 && nums[i] == nums[i + 1]) {
            continue;
        }
        // We will update the array in place
        nums[count] = nums[i];
        count++;
    }
    return count;
};
```

### Kotlin

```java
class RemoveDuplicatesFromSortedArray {

    fun removeDuplicates(nums: IntArray): Int {
        // Length of the updated array
        var count = 0
        // Loop for all the elements in the array
        for (i in nums.indices) {
            // If the current element is equal to the next element, we skip
            if (i < nums.size - 1 && nums[i] == nums[i + 1]) {
                continue
            }
            // We will update the array in place
            nums[count] = nums[i]
            count++
        }
        return count
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/RemoveDuplicatesFromSortedArray.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Remove_Duplicates_From_Sorted_Array.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/remove_duplicates_from_sorted_array.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/RemoveDuplicatesFromSortedArray.kt)

## Conclusion

Congratulations :clap:! In this post, we solved an easy problem from LeetCode involving array.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!