---
title: 'LeetCode #2 - Add Two Numbers Represented By Linked Lists'
date: 2020-9-27 11:06:00
category: 'LeetCode'
draft: false
---

Hello fellow devs :wave:! It's a brand new day and we have a brand new problem from LeetCode - **Add Two Numbers**

[0002 - Add Two Numbers](https://leetcode.com/problems/add-two-numbers/).

## Problem Statement
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

### Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)

Output: 7 -> 0 -> 8

Explanation: 342 + 465 = 807.

## Analysis
This is nothing but a simple elementary addition problem. The only difference is that the numbers to be added are represented by linked list where each digit is represented by the nodes of that linked list.

If we see the example then we will see that the digits are in the reverse order i.e.,

```
First node => ones place
Second node => tens place
Third node => hundreds place
... and so on.
```

Thus 2 -> 4 -> 3 will actually make 342 and 5 -> 6 -> 4 will actually make 465.

We will have to return a new linked list whose nodes will represent the digits of the sum of the numbers represented by the given two linked list.

## Approach

1. Traverse two linked lists.
2. In each iteration, add the numbers in the nodes of the linked lists
3. If the lists are unequal, then the smaller one will end before the longer. In this case, we will put only the remaining nodes of the longer list in the resultant list
4. If the sum of two digits is greater than 9, then we will have to find out the "carry" to be added in the next iteration.

This is nothing more than a simple addition. The only challenge here might be to avoid `NullPointerException` which is very common in the linked list based problems.

### Time Complexity
Since we are iterating both the lists only once, the time complexity would be ***O(m + n)***. Here `m` and `n` are the numbers of nodes in the two linked lists.

### Space Complexity
Since we are using extra space only for our variables, our space complexity would be ***O(1)***. One might argue that we are using another list to store our result so the space complexity should also be ***O(m + n)***. But this is the list we are not using for our algorithm, we are using it for the result which is asked in the question (I'd love to know your take on this).

## Code
Now we have an approach to solve this problem, let's write some code - 

### Java

```java
package org.redquark.tutorials.leetcode;

/**
 * @author Anirudh
 */
public class AddTwoNumbers {

    private static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Head of the new linked list - this is the head of the resultant list
        ListNode head = null;
        // Reference of head which is null at this point
        ListNode temp = null;
        // Carry
        int carry = 0;
        // Loop for the two lists
        while (l1 != null || l2 != null) {
            // At the start of each iteration, we should add carry from the last iteration
            int sum = carry;
            // Since the lengths of the lists may be unequal, we are checking if the
            // current node is null for one of the lists
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }
            // At this point, we will add the total sum % 10 to the new node
            // in the resultant list
            ListNode node = new ListNode(sum % 10);
            // Carry to be added in the next iteration
            carry = sum / 10;
            // If this is the first node or head
            if (temp == null) {
                temp = head = node;
            }
            // For any other node
            else {
                temp.next = node;
                temp = temp.next;
            }
        }
        // After the last iteration, we will check if there is carry left
        // If it's left then we will create a new node and add it
        if (carry > 0) {
            temp.next = new ListNode(carry);
        }
        return head;
    }
}
```

### Python

```python
def addTwoNumbers(l1: ListNode, l2: ListNode) -> ListNode:
    # Head of the new linked list - this is the head of the resultant list
    head = None
    # Reference of head which is null at this point
    temp = None
    # Carry
    carry = 0
    # Loop for the two lists
    while l1 is not None or l2 is not None:
        # At the start of each iteration, we should add carry from the last iteration
        sum_value = carry
        # Since the lengths of the lists may be unequal, we are checking if the
        # current node is null for one of the lists
        if l1 is not None:
            sum_value += l1.val
            l1 = l1.next
        if l2 is not None:
            sum_value += l2.val
            l2 = l2.next
        # At this point, we will add the total sum_value % 10 to the new node
        # in the resultant list
        node = ListNode(sum_value % 10)
        # Carry to be added in the next iteration
        carry = sum_value // 10
        # If this is the first node or head
        if temp is None:
            temp = head = node
        # for any other node
        else:
            temp.next = node
            temp = temp.next
    # After the last iteration, we will check if there is carry left
    # If it's left then we will create a new node and add it
    if carry > 0:
        temp.next = ListNode(carry)
    return head
```

### JavaScript

```javascript
var addTwoNumbers = function (l1, l2) {
    // Head of the new linked list - this is the head of the resultant list
    let head = null;
    // Reference of head which is null at this point
    let temp = null;
    // Carry
    let carry = 0;
    // Loop for the two lists
    while (l1 !== null || l2 !== null) {
        // At the start of each iteration, we should add carry from the last iteration
        let sum = carry;
        // Since the lengths of the lists may be unequal, we are checking if the
        // current node is null for one of the lists
        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }
        // At this point, we will add the total sum % 10 to the new node
        // in the resultant list
        let node = new ListNode(Math.floor(sum) % 10);
        // Carry to be added in the next iteration
        carry = Math.floor(sum / 10);
        // If this is the first node or head
        if (temp == null) {
            temp = head = node;
        }
        // For any other node
        else {
            temp.next = node;
            temp = temp.next;
        }
    }
    // After the last iteration, we will check if there is carry left
    // If it's left then we will create a new node and add it
    if (carry > 0) {
        temp.next = new ListNode(carry);
    }
    return head;
};
```

### Kotlin

```java
package org.redquark.tutorials.leetcode

fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
    var head1 = l1
    var head2 = l2
    // Head of the new linked list - this is the head of the resultant list
    var head: ListNode? = null
    // Reference of head which is null at this point
    var temp: ListNode? = null
    // Carry
    var carry = 0
    // Loop for the two lists
    while (head1 != null || head2 != null) {
        // At the start of each iteration, we should add carry from the last iteration
        var sum = carry
        // Since the lengths of the lists may be unequal, we are checking if the
        // current node is null for one of the lists
        if (head1 != null) {
            sum += head1.`val`
            head1 = head1.next
        }
        if (head2 != null) {
            sum += head2.`val`
            head2 = head2.next
        }
        // At this point, we will add the total sum % 10 to the new node
        // in the resultant list
        val node = ListNode(sum % 10)
        // Carry to be added in the next iteration
        carry = sum / 10
        // If this is the first node or head
        if (temp == null) {
            head = node
            temp = head
        } else {
            temp.next = node
            temp = temp.next
        }
    }
    // After the last iteration, we will check if there is carry left
    // If it's left then we will create a new node and add it
    if (carry > 0) {
        temp!!.next = ListNode(carry)
    }
    return head
}
```

## Conclusion

I hope you liked this post. Here, we solved the problem of adding two numbers represented by linked lists in ***O(n)*** time and ***O(1)*** space. 

You can find the complete source code on [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/LeetCode). If you find it useful, consider giving it a star :star:.

- [Java](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Java/src/main/java/org/redquark/tutorials/leetcode/AddTwoNumbers.java)
- [Python](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Python/src/Add_Two_Numbers.py)
- [JavaScript](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/JavaScript/src/add_two_numbers.js)
- [Kotlin](https://github.com/ani03sha/RedQuarkTutorials/blob/master/LeetCode/Kotlin/src/main/kotlin/org/redquark/tutorials/leetcode/AddTwoNumbers.kt)

Feel free to share your thoughts about this post in comments' section. I'd love to hear your feedback.

Happy coding :smile: and Namaste :pray:!