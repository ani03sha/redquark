---
title: 'LeetCode #31 - Next Permutation'
date: 2021-01-15 20:40:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! It's been a long time since I wrote a post on LeetCode problems. But no worries, today will discuss the next problem.

- [Next Permutation](https://leetcode.com/problems/next-permutation/)

## Problem Statement
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

The replacement must be in place and use only constant extra memory.

### Constraints:
- 1 ≤ `nums.length` ≤ 100
- 0 ≤ `nums[i]` ≤ 100

### Examples

Example 1:

```
Input: nums = [1,2,3]
Output: [1,3,2]
```

Example 2:

```
Input: nums = [3,2,1]
Output: [1,2,3]
```

Example 3:

```
Input: nums = [1,1,5]
Output: [1,5,1]
```

Example 4:

```
Input: nums = [1]
Output: [1]
```

## Analysis
The problem is straight forward. We will be given an array of integers, and we need to find the next possible permutation of the number that is formed by combining the elements of the array.

For e.g., if given array is `nums = [1,2,3]`, the number formed by combining the elements of this array is ***123***. The next number that contains the same digits as ***123*** is ***132***. Therefore, the output will be `nums = [1,3,2]`.

The constraints are that we need to implement this ***without extra space*** and modifications are done only ***in-place***.

## Approach
We can follow the below steps - 

1. Scan the array from right to left until an element is found which is smaller than the index at its right. Mark the index of such element as `index`.
2. Again scan the array from right to left until an element is found which is greater than the element found in the above step. Mark the index of such elements as `j`.
3. Swap the two elements at indices `index` and `j`.
4. Now, reverse the array from index `index` until the end of the array.

Let's understand this with an example - 

```
nums = [4,5,3,2,1]

Step 1: scan from right to left and stop at 4 because it less than 5. Here, index = 0
Step 2: Again scan from right to left and stop at 5 because it is greater than 4. Here, j = 1
Step 3: Swap the elements at index and j. The array will become [5,4,3,2,1].
Step 4: Reverse the array after index. The array will become [5,1,2,3,4]
```

### Time Complexity
We are iterating the array two times. In the worst case, the time complexity will be ***O(2n)*** which is equivalent to ***O(n)***.

### Space Complexity
We are not using any data structure for intermediate computations. Hence, the space complexity will be ***O(1)***.


## Code

### Java

```java
public class NextPermutation {

    public int[] nextPermutation(int[] nums) {
        // Length of the array
        int n = nums.length;
        // Index of the first element that is smaller than
        // the element to its right.
        int index = -1;
        // Loop from right to left
        for (int i = n - 1; i > 0; i--) {
            if (nums[i] > nums[i - 1]) {
                index = i - 1;
                break;
            }
        }
        // Base condition
        if (index == -1) {
            reverse(nums, 0, n - 1);
            return;
        }
        int j = n - 1;
        // Again swap from right to left to find first element
        // that is greater than the above find element
        for (int i = n - 1; i >= index + 1; i--) {
            if (nums[i] > nums[index]) {
                j = i;
                break;
            }
        }
        // Swap the elements
        swap(nums, index, j);
        // Reverse the elements from index + 1 to the nums.length
        reverse(nums, index + 1, n - 1);
    }

    private static void reverse(int[] nums, int i, int j) {
        while (i < j) {
            swap(nums, i, j);
            i++;
            j--;
        }
    }

    private static void swap(int[] nums, int i, int index) {
        int temp = nums[index];
        nums[index] = nums[i];
        nums[i] = temp;
    }
}
```

### Python

```python
def reverse(nums, i, j):
    while i < j:
        nums[i], nums[j] = nums[j], nums[i]
        i += 1
        j -= 1


def nextPermutation(nums: List[int]):
    # Length of the array
    n = len(nums)
    # Index of the first element that is smaller than
    # the element to its right.
    index = -1
    # Loop from right to left
    for i in range(n - 1, 0, -1):
        if nums[i] > nums[i - 1]:
            index = i - 1
            break
    # Base condition
    if index == -1:
        reverse(nums, 0, n - 1)
        return
    j = n - 1
    # Again swap from right to left to find first element
    # that is greater than the above find element
    for i in range(n - 1, index, -1):
        if nums[i] > nums[index]:
            j = i
            break
    # Swap the elements
    nums[index], nums[j] = nums[j], nums[index]
    # Reverse the elements from index + 1 to the nums.length
    reverse(nums, index + 1, n - 1)
```

### JavaScript

```javascript
var nextPermutation = function(nums) {
    // Length of the array
    const n = nums.length;
    // Index of the first element that is smaller than
    // the element to its right.
    let index = -1;
    // Loop from right to left
    for (let i = n - 1; i > 0; i--) {
        if (nums[i] > nums[i - 1]) {
            index = i - 1;
            break;
        }
    }
    // Base condition
    if (index === -1) {
        reverse(nums, 0, n - 1);
        return nums;
    }
    let j = n - 1;
    // Again swap from right to left to find first element
    // that is greater than the above find element
    for (let i = n - 1; i >= index + 1; i--) {
        if (nums[i] > nums[index]) {
            j = i;
            break;
        }
    }
    // Swap the elements
    swap(nums, index, j);
    // Reverse the elements from index + 1 to the nums.length
    reverse(nums, index + 1, n - 1);
    return nums;
};

const reverse = (nums, i, j) => {
    while (i < j) {
        swap(nums, i, j);
        i++;
        j--;
    }
};

const swap = (nums, i, index) => {
    const temp = nums[index];
    nums[index] = nums[i];
    nums[i] = temp;
};
```

### Kotlin

```java
class NextPermutation {

    fun nextPermutation(nums: IntArray): IntArray {
        // Length of the array
        val n = nums.size
        // Index of the first element that is smaller than
        // the element to its right.
        var index = -1
        // Loop from right to left
        for (i in n - 1 downTo 1) {
            if (nums[i] > nums[i - 1]) {
                index = i - 1
                break
            }
        }
        // Base condition
        if (index == -1) {
            reverse(nums, 0, n - 1)
            return
        }
        var j = n - 1
        // Again swap from right to left to find first element
        // that is greater than the above find element
        for (i in n - 1 downTo index + 1) {
            if (nums[i] > nums[index]) {
                j = i
                break
            }
        }
        // Swap the elements
        swap(nums, index, j)
        // Reverse the elements from index + 1 to the nums.length
        reverse(nums, index + 1, n - 1)
    }

    private fun reverse(nums: IntArray, i: Int, j: Int) {
        var iIndex = i
        var jIndex = j
        while (iIndex < jIndex) {
            swap(nums, iIndex, jIndex)
            iIndex++
            jIndex--
        }
    }

    private fun swap(nums: IntArray, i: Int, index: Int) {
        val temp = nums[index]
        nums[index] = nums[i]
        nums[i] = temp
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/NextPermutation.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Next_Permutation.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/next_permutation.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/NextPermutation.kt)

## Conclusion

Congratulations :clap:! Today we solved a fairly simple problem to determine the next permutation of number.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!
