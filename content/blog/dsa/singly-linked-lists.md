---
title: 'Linked Lists - Singly Linked List'
date: 2023-4-03 19:52:00
category: 'Data Structures & Algorithms'
draft: false
---

Have you ever wondered what makes a data structure a **linked** list? Is it the links? The list? Or perhaps the feeling of being lost in a sea of pointers? Well, fear not! In this and subsequent posts, we will explore the world of Linked Lists - from the *Singly Linked List* to the *Doubly Linked List* and even the *Cyclic Linked List*. So sit back, grab your favorite beverage, and let's dive in!

## Introduction
A linked list is a linear data structure consisting of a collection of nodes, where each node contains some data and a reference (or pointer) to the next node in the list. This concept remains same whether it is a Singly Linked List, Doubly Linked List or Cyclic Linked List. Only thing which changes is how the pointers are connected between the nodes.

Below interface represents the common functionalities offered by the List ADT - 

```java
import java.util.Iterator;

public interface List<T> {

    /**
     * @return the number of elements in the list
     */
    int size();

    /**
     * @return true, if the list is empty, false otherwise
     */
    boolean isEmpty();

    /**
     * @param element - element to be checked in the list
     * @return true, if the element is present in the list, false otherwise
     */
    boolean contains(T element);

    /**
     * @param element to be added in the list
     */
    void add(T element);

    /**
     * @param element element to be removed from the list
     * @return removed element
     */
    T remove(T element);

    /**
     * @return Returns an iterator over the elements in this list in proper sequence.
     */
    Iterator<T> iterator();

    /**
     * Empties the list by removing all the elements from it
     */
    void clear();
}
```

Each type of List represents this ADT differently, but the behavior remains the same. In this post, we will see how Singly Linked List implements the List ADT.

## The Singly Linked List: One Way is Enough
Singly Linked List is the simplest of the Linked Lists. As the name suggests, it is a list where each element is linked to the next one in a ***single direction***. Think of it like a train where each carriage is connected to the next one by a single link. This makes it easy to traverse the list from start to end but not so much the other way around.

It will look like below -  

<img src='../media/singly-linked-list.svg' alt='Singly Linked List' style="display: block; margin-left: auto; margin-right: auto;">

<br />
Each node in the Singly Linked List is represented by the below class SinglyListNode - 

```java
class SinglyListNode {
    private int data;
    private SinglyListNode next;
 
    SinglyListNode(int data) {
        this.data = data;
        this.next = null;
    }
}
```

The above Java code defines a class named `SinglyListNode` that represents a node in a singly linked list. The class has two instance variables: an integer variable named `data` that stores the value of the node and a reference variable named `next` that points to the next node in the linked list.

The class also has a constructor with a single integer parameter `data`. When a new Node object is created using this constructor, it initializes the data variable with the value of data and sets the next variable to null, which means that the new node does not point to any other node yet.

To create a Singly Linked List, we start with a **head** node that points to the first element in the list. Each subsequent element is linked to the previous one by a pointer. The last element in the list points to null, indicating the end of the list.

```java
import java.util.Iterator;
import java.util.NoSuchElementException;

public class SinglyLinkedList<T> implements List<T>, Iterable<T> {

    // Head of the linked list
    public SinglyListNode<T> head;
    // Size of the list
    private int size;

    public SinglyLinkedList() {
        this.size = 0;
        this.head = null;
    }

    /**
     * @return the number of elements in the list
     */
    @Override
    public int size() {
        return this.size;
    }

    /**
     * @return true, if the list is empty, false otherwise
     */
    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    /**
     * @param element - element to be checked in the list
     * @return true, if the element is present in the list, false otherwise
     */
    @Override
    public boolean contains(T element) {
        // Reference to the head
        SinglyListNode<T> temp = head;
        // Loop through the linked list to check each element
        while (temp != null) {
            if (temp.data.equals(element)) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }

    /**
     * @param element to be added in the list at the last
     */
    @Override
    public void add(T element) {
        // Create a new node with the given data
        SinglyListNode<T> node = new SinglyListNode<>(element);
        // Base case when head is null
        if (head == null) {
            head = node;
            size++;
            return;
        }
        // Reference to the head
        SinglyListNode<T> temp = head;
        // Loop through the linked list to get the last element
        while (temp.next != null) {
            temp = temp.next;
        }
        // Make the next of last node as the new node
        temp.next = node;
        size++;
    }

    /**
     * @param element to be added at the front of list
     */
    public void addFirst(T element) {
        // Create a new node with the given data
        SinglyListNode<T> node = new SinglyListNode<>(element);
        // Make the current head as the next of this node
        node.next = head;
        // Make this node as the new head
        head = node;
        size++;
    }

    /**
     * @param element          to be added
     * @param elementInTheList after which the element is to be added
     */
    public void addAfterNode(T element, T elementInTheList) {
        // First check if the given node exists in the list or not
        if (!contains(elementInTheList)) {
            throw new IllegalArgumentException("Given node doesn't exist in the list");
        }
        // Get the reference of the given node
        SinglyListNode<T> temp = head;
        while (temp.next != null) {
            if (temp.data.equals(elementInTheList)) {
                break;
            }
            temp = temp.next;
        }
        // Create a new node with the given data
        SinglyListNode<T> newNode = new SinglyListNode<>(element);
        // Get the next element of this node
        SinglyListNode<T> nextNode = temp.next;
        // Insert the given node in the list
        temp.next = newNode;
        // Link this node with the previous next node
        newNode.next = nextNode;
        size++;
    }

    /**
     * @param element element to be removed from the list
     * @return removed element
     */
    @Override
    public T remove(T element) {
        // Check if the node to be removed exists in the list
        if (!contains(element)) {
            throw new IllegalArgumentException("Given node doesn't exist in the list");
        }
        // For head
        if (head.data.equals(element)) {
            head = head.next;
            return element;
        }
        // Find the reference of the given node in the list
        SinglyListNode<T> temp = head;
        while (temp.next != null) {
            if (temp.next.data.equals(element)) {
                break;
            }
            temp = temp.next;
        }
        // Remove the node by skipping it
        if (temp.next != null) {
            temp.next = temp.next.next;
        }
        size--;
        return element;
    }

    /**
     * @return last element which will be removed
     */
    public T removeLast() {
        // Base case
        if (head == null) {
            throw new IllegalArgumentException("Cannot remove from empty list");
        }
        if (head.next == null) {
            T data = head.data;
            head = null;
            size--;
            return data;
        }
        // Traverse the list to go to the second last node
        // so that the last node can be removed by pointing
        // second last node's next to null
        SinglyListNode<T> temp = head;
        while (temp.next.next != null) {
            temp = temp.next;
        }
        // Store the data of the last node to return
        T data = temp.next.data;
        // End the list after current second last node
        temp.next = null;
        // Update the size
        size--;
        return data;
    }

    /**
     * @return removed element from the list from the front
     */
    public T removeFirst() {
        // Base case
        if (head == null) {
            throw new IllegalArgumentException("Cannot remove from the empty list");
        }
        // Get the data at head
        T data = head.data;
        // Move head to the next pointer
        head = head.next;
        size--;
        return data;
    }

    /**
     * Empties the list by removing all the elements from it
     */
    @Override
    public void clear() {
        head = null;
        size = 0;
    }

    /**
     * @return Returns an iterator over the elements in this list in proper sequence.
     */
    @Override
    public Iterator<T> iterator() {
        return new Iterator<>() {
            // Reference of the head
            SinglyListNode<T> current = head;

            @Override
            public boolean hasNext() {
                return current != null;
            }

            @Override
            public T next() {
                if (current == null) {
                    throw new NoSuchElementException();
                }
                // Data from the current node
                T data = current.data;
                current = current.next;
                return data;
            }
        };
    }

    /**
     * Returns a string representation of the object.
     */
    @Override
    public String toString() {
        StringBuilder output = new StringBuilder();
        output.append("[");
        // Reference of the head
        SinglyListNode<T> temp = head;
        while (temp.next != null) {
            output.append(temp.data).append(", ");
            temp = temp.next;
        }
        output.append(temp.data).append("]");
        return output.toString();
    }

    static class SinglyListNode<T> {

        T data;
        SinglyListNode<T> next;

        SinglyListNode(T data) {
            this.data = data;
        }
    }
}
```

The class provides several methods to manipulate the linked list, including:

### `size()`
Returns the number of elements in the list.

### `isEmpty()`
Returns true if the list is empty, false otherwise.

### `contains(T element)`
Returns true if the list contains the specified element, false otherwise.

### `add(T element)`
Adds the specified element to the end of the list.

### `addFirst(T element)` 
Adds the specified element to the beginning of the list.

### `addAfterNode(T element, T elementInTheList)`
Adds the specified element after the specified node in the list.

### `remove(T element)`
Removes the first occurrence of the specified element from the list.

### `removeLast()`
Removes and returns the last element in the list.

### `removeFirst()`
Removes and returns the first element in the list.

The implementation of these methods uses a combination of iteration and manipulation of the `head` and `next` fields of the nodes in the linked list.

The class also implements the `Iterable` interface, which allows instances of `SinglyLinkedList` to be iterated over using a ***for-each*** loop. The Iterator object returned by the `iterator()` method provides a way to iterate over the elements in the list in a forward direction.

## Conclusion
In conclusion, a singly linked list is a data structure that consists of a sequence of nodes, each containing data and a reference to the next node. It's an efficient way to store and manipulate large amounts of data, especially when you need to insert or remove elements frequently. 

In this blog post, we have covered the implementation of a singly linked list in Java using a generic class, and we have gone through each method and explained its purpose and functionality. This code can be used as a reference for those who want to learn or implement singly linked list in their Java projects.

You can find the complete code in the GitHub [repository](https://github.com/ani03sha/AccioAlgorithms/blob/main/src/main/java/org/redquark/accioalgorithms/datastructures/lists/SinglyLinkedList.java). I hope you enjoyed the post. Feel free to share your thoughts. Till next time… Happy learning 😄 and Namaste :pray:!