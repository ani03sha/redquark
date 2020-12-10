---
title: 'LeetCode #24 - Swap Nodes In Pairs'
date: 2020-12-08 11:56:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! In this post, we will discuss another linked list problem.

- [Swap Nodes In Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)

## Problem Statement
Given a linked list, swap every two adjacent nodes and return its head. You may not modify the values in the list's nodes. Only nodes itself may be changed.

### Constraints:
- The number of nodes in the list is in the range [0, 100].
- 0 ≤ `Node.val` ≤ 100

### Examples

Example 1:
```
Input: head = [1,2,3,4]
Output: [2,1,4,3]
```

<br />

<img src='../media/leetcode-24-list-1.jpg' alt='LeetCode 24 List 1 (courtesy: LeetCode)' style="display: block; margin-left: auto; margin-right: auto; border: 5px solid black;">

<br />

Example 2:

```
Input: head = []
Output: []
```

Example 3:

```
Input: head = [1]
Output: [1]
```

## Analysis
We are given a linked list and we need to swap nodes in pairs. What this means is that at a time we take two nodes and swap them, then take next two nodes and then swap them. This will go on until all the nodes are left.

The constraint is that we cannot update the data in the nodes. We can only change the node pointers appropriately to solve this problem.

## Approach
We can follow below steps —

1. Create a `dummy` node whose next pointer will point to the current head.
2. Now take a `current` node which will be used to traverse the list
3. In each iteration, take two nodes, `first = current.next` and `second = current.next.next`.
4. Point the next of `first` to the next of `second` which is actually the thirst node from the current.
5. Link the pointers accordingly and at last return the `dummy.next`.

### Time Complexity
Since we are traversing all the nodes of the linked list, the time complexity will be ***O(n)***.

### Space Complexity
Since we are not using any data structure for intermediate computations, therefore, the space complexity will be ***O(1)***.

## Code

### Java

```java
public class SwapNodesInPairs {

    public ListNode swapPairs(ListNode head) {
        // Dummy node
        ListNode dummy = new ListNode(0);
        // Point the next of dummy node to the head
        dummy.next = head;
        // This node will be used to traverse the list
        ListNode current = dummy;
        // Loop until we reach to the second last node
        while (current.next != null && current.next.next != null) {
            // First node of the pair
            ListNode first = current.next;
            // Second node of the pair
            ListNode second = current.next.next;
            // Point the next of first node to the node after second node
            first.next = second.next;
            // Now the current node's next should be the second node
            current.next = second;
            // Linking the original second node to the first node
            current.next.next = first;
            // Move the pointer two nodes ahead
            current = current.next.next;
        }
        return dummy.next;
    }
}
```

### Python

```python
class SwapNodesInPairs:
    def swapPairs(self, head: ListNode) -> ListNode:
        # Dummy node
        dummy = ListNode(0)
        # Point the next of dummy node to the head
        dummy.next = head
        # This node will be used to traverse the list
        current = dummy
        # Loop until we reach to the second last node
        while current.next is not None and current.next.next is not None:
            # First node of the pair
            first = current.next
            # Second node of the pair
            second = current.next.next
            # Point the next of first node to the node after second node
            first.next = second.next
            # Now the current node's next should be the second node
            current.next = second
            # Linking the original second node to the first node
            current.next.next = first
            # Move the pointer two nodes ahead
            current = current.next.next
        return dummy.next
```

### JavaScript

```javascript
var swapPairs = function (head) {
    // Dummy node
    const dummy = new ListNode(0);
    // Point the next of dummy node to the head
    dummy.next = head;
    // This node will be used to traverse the list
    let current = dummy;
    // Loop until we reach to the second last node
    while (current.next !== null && current.next !== undefined && current.next.next !== null) {
        // First node of the pair
        let first = current.next;
        // Second node of the pair
        let second = current.next.next;
        // Point the next of first node to the node after second node
        first.next = second.next;
        // Now the current node's next should be the second node
        current.next = second;
        // Linking the original second node to the first node
        current.next.next = first;
        // Move the pointer two nodes ahead
        current = current.next.next;
    }
    return dummy.next;
};
```

### Kotlin

```java
class SwapNodesInPairs {

    fun swapPairs(head: ListNode?): ListNode? {
        // Dummy node
        val dummy = ListNode(0)
        // Point the next of dummy node to the head
        dummy.next = head
        // This node will be used to traverse the list
        var current: ListNode? = dummy
        // Loop until we reach to the second last node
        while (current!!.next != null && current.next!!.next != null) {
            // First node of the pair
            val first = current.next
            // Second node of the pair
            val second = current.next!!.next
            // Point the next of first node to the node after second node
            first!!.next = second!!.next
            // Now the current node's next should be the second node
            current.next = second
            // Linking the original second node to the first node
            current.next!!.next = first
            // Move the pointer two nodes ahead
            current = current.next!!.next
        }
        return dummy.next
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/SwapNodesInPairs.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Swap_Nodes_In_Pairs.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/swap_nodes_in_pairs.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/SwapNodesInPairs.kt)

## Conclusion

Congratulations :clap:! We have solved another linked list problem.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!