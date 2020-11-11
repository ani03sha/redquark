---
title: 'LeetCode #16 - 3 Sum Closest'
date: 2020-11-11 19:23:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! Let's look at a problem which is an extension of the last problem [3 Sum](https://redquark/leetcode/3-sum/) we solved.

- [3 Sum Closest](https://leetcode.com/problems/3sum-closest/).

## Problem Statement
Given an array `nums` of n integers and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers. You may assume that each input would have exactly one solution.

### Constraints:
- 3 ≤ `nums.length` ≤ 10<sup>3</sup>
- -10<sup>3</sup> ≤ `nums[i]` ≤ 10<sup>3</sup>
- -10<sup>4</sup> ≤ `target` ≤ 10<sup>4</sup>

### Example

```
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

## Analysis
It is very similar to the previous problem [3 Sum](https://redquark.org/leetcode/3-sum). Here, also we need to find the sum of three numbers. Instead of checking if their sum is equal to zero, we are given a target, and we will be trying to find the smallest difference between the sum and the target.

The desired sum can be more than or less than the target hence we only care about the ***absolute*** difference between the two.

## Approach

The approach is similar to the one we discussed earlier - 

1. Sort the array (in time ***O(n * log(n))***).
2. Now for each element `i`, do the following steps
3. Set two pointers left — `j = i + 1` and right — `k = nums.length - 1`.
4. Check if `nums[i] + nums[j] + nums[k] <= target`, it means we are too left in the array, and we need to move right i.e., we can check for greater number than the current one.
5. If the sum `nums[i] + nums[j] + nums[k] > target`, it means we are too right in the array, and we need to move left i.e., we can check for smaller number than the current one.
6. Compare the minimum difference between the current sum and the previous sum. The sum which give minimum difference is the answer.

### Time Complexity
We are scanning the entire array keeping one element fixed. We are doing this for every element in the array. Thus, we are scanning each element of array `n` number of times. And we are doing this for `n` times, hence the worst case time complexity will be ***O(n<sup>2</sup> + n * log n)*** which comes down to ***O(n<sup>2</sup>)***.

### Space Complexity
We are not using any data structure for the intermediate computations, hence the space complexity is ***O(1)***.


## Code

### Java

```java
public class ThreeSumClosest {

    public int threeSumClosest(int[] nums, int target) {
        // Sort the array
        Arrays.sort(nums);
        // Length of the array
        int n = nums.length;
        // Result
        int closest = nums[0] + nums[1] + nums[n - 1];
        // Loop for each element of the array
        for (int i = 0; i < n - 2; i++) {
            // Left and right pointers
            int j = i + 1;
            int k = n - 1;
            // Loop for all other pairs
            while (j < k) {
                int sum = nums[i] + nums[j] + nums[k];
                if (sum <= target) {
                    j++;
                } else {
                    k--;
                }
                if (Math.abs(closest - target) > Math.abs(sum - target)) {
                    closest = sum;
                }
            }
        }
        return closest;
    }
}
```

### Python

```python
def threeSumClosest(nums: List[int], target: int) -> int:
    # Sort the given array
    nums.sort()
    # Length of the array
    n = len(nums)
    # Closest value
    closest = nums[0] + nums[1] + nums[n - 1]
    # Loop for each element of the array
    for i in range(0, n - 2):
        # Left and right pointers
        j = i + 1
        k = n - 1
        # Loop for all other pairs
        while j < k:
            current_sum = nums[i] + nums[j] + nums[k]
            if current_sum <= target:
                j += 1
            else:
                k -= 1
            if abs(closest - target) > abs(current_sum - target):
                closest = current_sum
    return closest
```

### JavaScript

```javascript
var threeSumClosest = function (nums, target) {
    // Sort the array
    nums.sort((a, b) => a - b);
    // Length of the array
    const n = nums.length;
    // Result
    let closest = nums[0] + nums[1] + nums[n - 1];
    // Loop for each element of the array
    for (let i = 0; i < n - 2; i++) {
        // Left and right pointers
        let j = i + 1;
        let k = n - 1;
        // Loop for all other pairs
        while (j < k) {
            let sum = nums[i] + nums[j] + nums[k];
            if (sum <= target) {
                j++;
            } else {
                k--;
            }
            if (Math.abs(closest - target) > Math.abs(sum - target)) {
                closest = sum;
            }
        }
    }
    return closest;
};
```

### Kotlin

```java
fun threeSumClosest(nums: IntArray, target: Int): Int {
    // Sort the array
    Arrays.sort(nums)
    // Length of the array
    val n = nums.size
    // Result
    var closest = nums[0] + nums[1] + nums[n - 1]
    // Loop for each element of the array
    for (i in 0 until n - 2) {
        // Left and right pointers
        var j = i + 1
        var k = n - 1
        // Loop for all other pairs
        while (j < k) {
            val sum = nums[i] + nums[j] + nums[k]
            if (sum <= target) {
                j++
            } else {
                k--
            }
            if (abs(closest - target) > abs(sum - target)) {
                closest = sum
            }
        }
    }
    return closest
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/ThreeSumClosest.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Three_Sum_closest.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/three_sum_closest.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/ThreeSumClosest.kt)

## Conclusion

Congratulations :clap:! We have solved one more problem from LeetCode and it was very much similar to the previous one :smiley:.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!