---
title: 'LeetCode #25 - Reverse Nodes In K Group'
date: 2020-12-10 20:51:00
category: 'LeetCode'
draft: false
---

Hello LeetCode enthusiasts :wave:! Today's problem is an extension of the previous problem.

- [Reverse Nodes In K Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)

## Problem Statement
Given a linked list, reverse the nodes of a linked list `k` at a time and return its modified list.

`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.

### Follow up:
- Could you solve the problem in O(1) extra memory space?
- You may not alter the values in the list's nodes, only nodes itself may be changed.

### Constraints:
- The number of nodes in the list is in the range `sz`.
- 1 ≤ `sz` ≤ 5000
- 0 ≤ `Node.val` ≤ 1000
- 1 ≤ `k` ≤ `sz`

### Examples

Example 1:

```
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]
```

<br />

<img src='../media/leetcode-25-list-2.jpg' alt='LeetCode 25 List 2 (courtesy: LeetCode)' style="display: block; margin-left: auto; margin-right: auto; border: 5px solid black;">

<br />

Example 2:

```
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]
```

<br />

<img src='../media/leetcode-25-list-1.jpg' alt='LeetCode 25 List 1 (courtesy: LeetCode)' style="display: block; margin-left: auto; margin-right: auto; border: 5px solid black;">

<br />

Example 3:

```
Input: head = [1,2,3,4,5], k = 1
Output: [1,2,3,4,5]
```

Example 4:

```
Input: head = [1], k = 1
Output: [1]
```

## Analysis
This problem is the generalization of the previous problem [LeetCode #24 — Swap Nodes In Pairs](https://redquark.org/leetcode/0024-swap-nodes-in-pairs/) where we just needed to swap the nodes in pairs. We can also say there we need to reverse the linked lists of size two.

Here, we need to reverse the parts of the linked list of given size `k`. Thus, the previous problem is more like a special case of this problem where `k = 2`.

Here, there are two constraints — one, we cannot change the values in the nodes and two, we need to do it in constant space.

## Approach
Since this problem is the generalization of the previous problem, we can use the ideas discussed there to solve this problem.

This problem is straight-forward as we only have to take parts of the given linked lists of size `k`, reverse them and join them. The total size `n` of the given list can be represented as - 

```
n = a.k + b
```

This means we need to take `a` sub-lists (each of size `k`), reverse them individually, connect them with the next list and in the end, connect all the remaining nodes as is.

### Time Complexity
We are taking `k` nodes at a time and reversing them. In this process, we are going through each node of the linked list only once. Thus, the time complexity will be ***O(n)***.

### Space Complexity
We are not using any data structure for intermediate computations. Hence, the space complexity will be ***O(1)***.

## Code

### Java

```java
public class ReverseNodesInKGroup {

    public ListNode reverseKGroup(ListNode head, int k) {
        // Base condition
        if (head == null || k == 1) {
            return head;
        }
        // Dummy node before head
        ListNode dummy = new ListNode(-1);
        // Point the next of this dummy to the current head
        dummy.next = head;
        // Node to keep track of the previous node
        ListNode previous = dummy;
        // Variable to keep count of the nodes in the linked list
        int count = 0;
        // Reference to the head which will be used to traverse
        ListNode current = head;
        while (current != null) {
            count++;
            if (count % k == 0) {
                previous = reverse(previous, current.next);
                current = previous.next;
            } else {
                current = current.next;
            }
        }
        return dummy.next;
    }

    private ListNode reverse(ListNode start, ListNode end) {
        // Previous node of the current node
        ListNode previous = start.next;
        // Current node
        ListNode current = previous.next;
        // Next node of the current node
        ListNode next;
        // Loop for the whole interval
        while (current != end) {
            // Next node of the current node
            next = current.next;
            // Next of current will point to the previous
            current.next = start.next;
            // Current node will become the previous node
            start.next = current;
            // Move pointer ahead
            current = next;
        }
        previous.next = end;
        // Return head node of the reversed linked list
        return previous;
    }
}
```

### Python

```python
class ReverseNodesInKGroups:
    def reverseKGroup(self, headNode: ListNode, k: int) -> Optional[ListNode]:
        # Base condition
        if headNode is None or k == 1:
            return headNode
        # Dummy node before headNode
        dummy = ListNode(-1)
        # Point the next of this dummy node to the current headNode
        dummy.next = headNode
        # Node to keep track of the previous node
        previous = dummy
        # Variable to keep count of the nodes in the linked list
        count = 0
        # Reference to the headNode which will be used to traverse
        current = headNode
        # Loop for all the nodes in the list
        while current is not None:
            count += 1
            if count % k == 0:
                previous = self.reverseList(previous, current.next)
                current = previous.next
            else:
                current = current.next
        return dummy.next

    def reverseList(start, end):
        previous = start.next
        current = previous.next
        while current is not end:
            nextNode = current.next
            current.next = start.next
            start.next = current
            current = nextNode
        previous.next = end
        return previous
```

### JavaScript

```javascript
var reverseKGroup = function(head, k) {
    // Base condition
    if (head === null || k === 1) {
        return head;
    }
    // Dummy node before head
    const dummy = new ListNode(-1);
    // Point the next of this dummy to the current head
    dummy.next = head;
    // Node to keep track of the previous node
    let previous = dummy;
    // Variable to keep count of the nodes in the linked list
    let count = 0;
    // Reference to the head which will be used to traverse
    let current = head;
    while (current !== null) {
        count++;
        if (count % k === 0) {
            previous = reverse(previous, current.next);
            current = previous.next;
        } else {
            current = current.next;
        }
    }
    return dummy.next;
};

const reverse = (start, end) => {
    // Previous node of the current node
    let previous = start.next;
    // Current node
    let current = previous.next;
    // Next node of the current node
    let next;
    // Loop for the whole interval
    while (current != end) {
        // Next node of the current node
        next = current.next;
        // Next of current will point to the previous
        current.next = start.next;
        // Current node will become the previous node
        start.next = current;
        // Move pointer ahead
        current = next;
    }
    previous.next = end;
    // Return head node of the reversed linked list
    return previous;
}
```

### Kotlin

```java
class ReverseNodesInKGroup {

    fun reverseKGroup(head: ListNode?, k: Int): ListNode? {
        // Base condition
        if (head == null || k == 1) {
            return head
        }
        // Dummy node before head
        val dummy = ListNode(-1)
        // Point the next of this dummy to the current head
        dummy.next = head
        // Node to keep track of the previous node
        var previous = dummy
        // Variable to keep count of the nodes in the linked list
        var count = 0
        // Reference to the head which will be used to traverse
        var current = head
        while (current != null) {
            count++
            if (count % k == 0) {
                previous = reverse(previous, current.next)
                current = previous.next
            } else {
                current = current.next
            }
        }
        return dummy.next
    }

    private fun reverse(start: ListNode, end: ListNode?): ListNode {
        // Previous node of the current node
        val previous = start.next
        // Current node
        var current = previous!!.next
        // Next node of the current node
        var next: ListNode?
        // Loop for the whole interval
        while (current !== end) {
            // Next node of the current node
            next = current!!.next
            // Next of current will point to the previous
            current.next = start.next
            // Current node will become the previous node
            start.next = current
            // Move pointer ahead
            current = next
        }
        previous.next = end
        // Return head node of the reversed linked list
        return previous
    }
}
```

### Complete Code
- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/ReverseNodesInKGroup.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Reverse_Nodes_In_K_Group.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/reverse_nodes_in_k_group.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/ReverseNodesInKGroup.kt)

## Conclusion

Congratulations :clap:! We have solved another linked list problem which is an extension of the previous problem.

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode) repository. If you like what you learn, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!