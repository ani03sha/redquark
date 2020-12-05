---
title: 'LeetCode #23 - Merge K Sorted Lists'
date: 2020-12-05 19:49:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! Today we are going to look at a LeetCode problem whose simpler version we have seen earlier. 

- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

We have dealt with a more specific case of this problem in the post [LeetCode #21 - Merge Two Sorted Lists](https://redquark.org/leetcode/0021-merge-two-sorted-lists/). Current problem is the generic case of the same problem.

## Problem Statement
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

### Constraints
- `k` == `lists.length`
- 0 ≤ `k` ≤ 10<sup>4</sup>
- 0 ≤ `lists[i].length` ≤ 500
-10<sup>4</sup> ≤ `lists[i][j]` ≤ 10<sup>4</sup>
- `lists[i]` is sorted in ascending order.
- The sum of `lists[i].length` won't exceed 10<sup>4</sup>.

### Examples

Example 1:

```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
```

Example 2:

```
Input: lists = []
Output: []
```

Example 3:

```
Input: lists = [[]]
Output: []
```

## Analysis
We are given a list of lists, and we need to merge all the elements of these lists in a single list in a sorted order. The important point to note that is the elements in a single list are sorted. It is not necessary that they are sorted with elements of other lists. If they did, we wouldn't be solving this problem, would we :wink:?

Solving this problem is similar to take all the elements of all the lists altogether and sort them and place them in a new (or resultant) list.

## Approach
The title of the problem is giving away the approach to solve this problem. Yes, it is **[Merge Sort](https://en.wikipedia.org/wiki/Merge_sort)**. Merge sort is an example of **Divide and Conquer** approach where we first divide the problem into the smallest unit possible, solve all the smallest parts and then conquer (merge) the results to arrive at the final solution.

We will follow the following steps -

1. Divide the list of lists into the smallest unit possible i.e. a single list.
2. Take two lists at a time and arrange their respective elements in sorted order.
3. Repeat this process for all the pairs of lists
4. Merge these sorted lists
5. The resultant list will be the required answer.

### Time Complexity
There are `k` lists and let's say `N` is the total number of nodes in all the lists, then the time complexity will be ***O(N * log k)***.

### Space Complexity
Since we are not using any data structure for intermediate computation, the space complexity will be ***O(1)***.


## Code

### Java

```java
public class MergeKSortedLists {

    public ListNode mergeKLists(ListNode[] lists) {
        // Base condition
        if (lists == null || lists.length == 0) {
            return null;
        }
        return mergeKLists(lists, 0, lists.length - 1);
    }

    private ListNode mergeKLists(ListNode[] lists, int start, int end) {
        if (start == end) {
            return lists[start];
        }
        // Mid of list of lists
        int mid = start + (end - start) / 2;
        // Recursive call for left sublist
        ListNode left = mergeKLists(lists, start, mid);
        // Recursive call for right sublist
        ListNode right = mergeKLists(lists, mid + 1, end);
        // Merge the left and right sublist
        return merge(left, right);
    }

    private ListNode merge(ListNode left, ListNode right) {
        // Create a dummy node
        ListNode head = new ListNode(-1);
        // Temp node
        ListNode temp = head;
        // Loop until any of the list becomes null
        while (left != null && right != null) {
            // Choose the value from the left and right which is smaller
            if (left.val < right.val) {
                temp.next = left;
                left = left.next;
            } else {
                temp.next = right;
                right = right.next;
            }
            temp = temp.next;
        }
        // Take all nodes from left list if remaining
        while (left != null) {
            temp.next = left;
            left = left.next;
            temp = temp.next;
        }
        // Take all nodes from right list if remaining
        while (right != null) {
            temp.next = right;
            right = right.next;
            temp = temp.next;
        }
        return head.next;
    }
}
```

### Python

```python
class MergeKSortedList:
    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
        # Base condition
        if lists is None or len(lists) == 0:
            return None
        return self.mergeLists(lists, 0, len(lists) - 1)

    def mergeLists(self, lists, start, end):
        # Base condition
        if start == end:
            return lists[start]
        # Mid of lists of lists
        mid = start + (end - start) // 2
        # Recursive calls for left sublist
        left = self.mergeLists(lists, start, mid)
        # Recursive call for right sublist
        right = self.mergeLists(lists, mid + 1, end)
        # Merge these sorted lists
        return self.merge(left, right)

    @staticmethod
    def merge(left, right):
        # Dummy node
        head = ListNode(-1)
        # Temp node
        temp = head
        # Loop until any of the lists becomes null
        while left is not None and right is not None:
            # Choose the smaller value from left and right lists
            if left.val < right.val:
                temp.next = left
                left = left.next
            else:
                temp.next = right
                right = right.next
            temp = temp.next
        # Take all nodes from left list if remaining
        while left is not None:
            temp.next = left
            left = left.next
            temp = temp.next
        # Take all nodes from right list if remaining
        while right is not None:
            temp.next = right
            right = right.next
            temp = temp.next
        return head.next
```

### JavaScript

```javascript
var mergeKLists = function (lists) {
    // Base condition
    if (lists === undefined || lists.length === 0) {
        return null;
    }
    return mergeLists(lists, 0, lists.length - 1);
};

const mergeLists = (lists, start, end) => {
    // Base condition
    if (start === end) {
        return lists[start];
    }
    // Mid point of the list of lists
    let mid = start + parseInt((end - start) / 2);
    // Recursive call for left sublist
    let left = mergeLists(lists, start, mid);
    // Recursive call for right sublist
    let right = mergeLists(lists, mid + 1, end);
    // Merge two sorted lists
    return merge(left, right);
};

const merge = (left, right) => {
    // Dummy node
    let head = new ListNode(-1);
    // Temp node
    let temp = head;
    // Loop until either list becomes null
    while (left !== null && right != null) {
        // Choose the value from the left and right which is smaller
        if (left.val < right.val) {
            temp.next = left;
            left = left.next;
        } else {
            temp.next = right;
            right = right.next;
        }
        temp = temp.next;
    }
    // Take all nodes from left list if remaining
    while (left != null) {
        temp.next = left;
        left = left.next;
        temp = temp.next;
    }
    // Take all nodes from right list if remaining
    while (right != null) {
        temp.next = right;
        right = right.next;
        temp = temp.next;
    }
    return head.next;
};
```

### Kotlin

```java
class MergeKSortedLists {

    internal fun mergeKLists(lists: Array<ListNode?>): ListNode? {
        // Base condition
        return if (lists.isEmpty()) {
            null
        } else mergeKLists(lists, 0, lists.size - 1)
    }

    private fun mergeKLists(lists: Array<ListNode?>, start: Int, end: Int): ListNode? {
        if (start == end) {
            return lists[start]
        }
        // Mid of list of lists
        val mid = start + (end - start) / 2
        // Recursive call for left sublist
        val left = mergeKLists(lists, start, mid)
        // Recursive call for right sublist
        val right = mergeKLists(lists, mid + 1, end)
        // Merge the left and right sublist
        return merge(left, right)
    }

    private fun merge(left: ListNode?, right: ListNode?): ListNode? {
        // Create a dummy node
        var leftNode = left
        var rightNode = right
        val head = ListNode(-1)
        // Temp node
        var temp: ListNode? = head
        // Loop until any of the list becomes null
        while (leftNode != null && rightNode != null) {
            // Choose the value from the left and right which is smaller
            if (leftNode.`val` < rightNode.`val`) {
                temp!!.next = leftNode
                leftNode = leftNode.next
            } else {
                temp!!.next = rightNode
                rightNode = rightNode.next
            }
            temp = temp.next
        }
        // Take all nodes from left list if remaining
        while (leftNode != null) {
            temp!!.next = leftNode
            leftNode = leftNode.next
            temp = temp.next
        }
        // Take all nodes from right list if remaining
        while (rightNode != null) {
            temp!!.next = rightNode
            rightNode = rightNode.next
            temp = temp.next
        }
        return head.next
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/MergeKSortedLists.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Merge_K_Sorted_Lists.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/merge_k_sorted_lists.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/MergeKSortedLists.kt)

## Conclusion

Congratulations :clap:! We have solved the problem using the ***merge sort***.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!