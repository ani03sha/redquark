---
title: 'Linked List'
date: 2023-4-15 20:10:00
category: 'Data Structures & Algorithms'
draft: false
---

Have you ever wondered what makes a data structure a **linked** list? Is it the links? The list? Or perhaps the feeling of being lost in a sea of pointers? Well, fear not! In this and subsequent posts, we will explore the world of Linked Lists - from the *Singly Linked List* to the *Doubly Linked List* and even the *Circular Linked List*. So sit back, grab your favorite beverage, and let's dive in!

## Introduction
A linked list is a linear data structure consisting of a collection of nodes, where each node contains some data and a reference (or pointer) to the next node in the list. This concept remains same whether it is a Singly Linked List, Doubly Linked List or Circular Linked List. Only thing which changes is how the pointers are connected between the nodes.

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

### Singly Linked List code implementation
Below is the Java implementation of a Singly Linked List.

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

## The Doubly Linked List: Two Links are Better Than One

Now, let's take it up a notch with the **Doubly Linked List**. As the name suggests, this list has two links - one to the next element and one to the previous element. Think of it like a train with carriages that are connected to the one in front and the one behind it. This makes it easy to traverse the list in both directions, but it also means that we need to maintain two pointers per node instead of one.

It will look like below -  

<img src='../media/doubly-linked-list.svg' alt='Doubly Linked List' style="display: block; margin-left: auto; margin-right: auto;">

<br/>

To create a Doubly Linked List, we start with a ***head*** node that points to the first element in the list, just like in the Singly Linked List. Each subsequent element has two pointers - one to the previous node and one to the next node. The last element points to `null`, just like before. Here's a code snippet to give you an idea:

```java
class DoublyListNode<T> {
    private T data;
    private DoublyListNode<T> previous;
    private DoublyListNode<T> next;

    DoublyListNode(T data) {
        this.data = data;
    }
|
```

As you can see, each node now has an additional pointer to the previous node. This makes it easier to traverse the list in both directions, but it also means that we need to be careful when inserting or deleting nodes to maintain the links properly.

<br />

The above code defines a generic class named `DoublyListNode` which represents a node in a doubly linked list. The class has three private instance variables - `data`, `previous`, and `next`.

The first instance variable `data` is of generic type `T` and it stores the data associated with the node.

The second instance variable `previous` is of type `DoublyListNode<T>` and it refers to the previous node in the doubly linked list.

The third instance variable `next` is also of type `DoublyListNode<T>` and it refers to the next node in the doubly linked list.

The class has one constructor that takes the `data` as an argument and initializes it to the data instance variable. The `previous` and `next` variables are initialized to null by default.

Overall, this class represents a node in a doubly linked list and stores the associated data along with references to the previous and next nodes.

A typical node in the circular linked list would look like below - 

```java
class CircularListNode<T> {
    T data;
    CircularListNode<T> next;

    CircularListNode(T data) {
        this.data = data;
    }
}
```

### Doubly Linked List code implementation
Below is the Java implementation of a Doubly Linked List.

```java
import java.util.Iterator;
import java.util.NoSuchElementException;

public class DoublyLinkedList<T> implements List<T>, Iterable<T> {

    // Head of the linked list
    public DoublyListNode<T> head;
    // Size of list
    private int size;

    public DoublyLinkedList() {
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
        return this.size == 0;
    }

    /**
     * @param element - element to be checked in the list
     * @return true, if the element is present in the list, false otherwise
     */
    @Override
    public boolean contains(T element) {
        // Check each node one by one
        DoublyListNode<T> temp = head;
        while (temp != null) {
            if (temp.data.equals(element)) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }

    /**
     * @param element to be added in the list at the end
     */
    @Override
    public void add(T element) {
        // Create a new node with the given element
        DoublyListNode<T> node = new DoublyListNode<>(element);
        // Special case
        if (head == null) {
            head = node;
            size++;
            return;
        }
        // Reference of the head node
        DoublyListNode<T> temp = head;
        // Loop until we reach to the end of the list
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = node;
        node.previous = temp;
        size++;
    }

    /**
     * @param element to be added at the front of the list
     */
    public void addFirst(T element) {
        // Create a new node with the given data
        DoublyListNode<T> node = new DoublyListNode<>(element);
        // Special case
        if (head == null) {
            head = node;
            size++;
            return;
        }
        node.next = head;
        head.previous = node;
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
        DoublyListNode<T> temp = head;
        while (temp.next != null) {
            if (temp.data.equals(elementInTheList)) {
                break;
            }
            temp = temp.next;
        }
        // Create a new node with the given data
        DoublyListNode<T> newNode = new DoublyListNode<>(element);
        // Get the next element of this node
        DoublyListNode<T> nextNode = temp.next;
        //Link the new node with previous of next node
        nextNode.previous = newNode;
        // Insert the given node in the list
        temp.next = newNode;
        newNode.previous = temp;
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
            head.previous = null;
            return element;
        }
        // Find the reference of the given node in the list
        DoublyListNode<T> temp = head;
        while (temp.next != null) {
            if (temp.next.data.equals(element)) {
                break;
            }
            temp = temp.next;
        }
        // Remove the node by skipping it
        if (temp.next != null) {
            // Next node of given node
            temp.next = temp.next.next;
        }
        size--;
        return element;
    }

    /**
     * @return removed element from the last
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
        // Traverse the list to go to the lost
        DoublyListNode<T> temp = head;
        while (temp.next.next != null) {
            temp = temp.next;
        }
        T data = temp.next.data;
        temp.next = null;
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
        if (head != null) {
            head.previous = null;
        }
        size--;
        return data;
    }

    /**
     * Empties the list by removing all the elements from it
     */
    @Override
    public void clear() {
        size = 0;
        head = null;
    }

    /**
     * @return Returns an iterator over the elements in this list in proper sequence.
     */
    @Override
    public Iterator<T> iterator() {
        return new Iterator<>() {
            // Reference of the head
            DoublyListNode<T> current = head;

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
        DoublyListNode<T> temp = head;
        while (temp.next != null) {
            output.append(temp.data).append(", ");
            temp = temp.next;
        }
        output.append(temp.data).append("]");
        return output.toString();
    }

    static class DoublyListNode<T> {
        T data;
        DoublyListNode<T> previous;
        DoublyListNode<T> next;

        DoublyListNode(T data) {
            this.data = data;
        }
    }
}
```

This implementation provides the basic methods for the doubly linked list:

**`int size()`** 
returns the size of the doubly linked list, which is the number of nodes in the list.

**`boolean isEmpty()`** 
returns true if the doubly linked list is empty (size = 0), and false otherwise.

**`boolean contains(T element)`** 
returns true if the doubly linked list contains the specified element, and false otherwise. It traverses the list and checks each node one by one.

**`void add(T element)`**
adds the specified element to the end of the doubly linked list. It creates a new node with the given element and inserts it at the end of the list.

**`void addFirst(T element)`** 
adds the specified element to the front of the doubly linked list. It creates a new node with the given element and inserts it at the front of the list.

**`void addAfterNode(T element, T elementInTheList)`**
adds the specified element after the specified node in the doubly linked list. It first checks if the specified node exists in the list or not, then finds its reference, and inserts the new node after it.

**`T remove(T element)`** 
removes the first occurrence of the specified element from the doubly linked list. It first checks if the specified element exists in the list or not, then removes it by skipping its reference.

**`T removeLast()`**
removes the last element from the doubly linked list. It traverses the list to the last element, removes it by setting its previous node's next reference to null.

**`T removeFirst()`**
removes the first element from the doubly linked list. It removes the head node and moves the head to the next node.

## The Circular Linked List: Round and Round We Go

Last but not least, we have the Circular Linked List. As the name suggests, this list is Circular - meaning that it forms a loop. Think of it like a circular train track where the last carriage is connected to the first one. This makes it easy to traverse the list endlessly, but it also means that we need to be careful not to get stuck in an infinite loop.

Circular linked lists have various applications, such as in scheduling algorithms, where a circular queue is required. They are also useful in data structures where a particular sequence needs to be repeated over and over again, such as in animation and game development.

Circular linked lists are similar to regular linked lists in terms of implementation, but there are a few key differences. For example, when traversing a Circular linked list, we need to be careful not to fall into an infinite loop. To avoid this, we can use a slow pointer and a fast pointer. The slow pointer moves one node at a time, while the fast pointer moves two nodes at a time. If the two pointers ever point to the same node, we know that we have found a cycle.

### Circular Linked List code implementation

```java
import java.util.Iterator;

public class CircularLinkedList<T> implements List<T>, Iterable<T> {

    // Head of the list
    public CircularListNode<T> head;
    // Tail of the linked list
    public CircularListNode<T> tail;
    // Size of the linked list
    private int size;

    public CircularLinkedList() {
        this.size = 0;
        this.head = null;
        this.tail = null;
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
        // Base case
        if (head == null) {
            return false;
        } else {
            // Reference to the head
            CircularListNode<T> temp = head;
            do {
                if (temp.data.equals(element)) {
                    return true;
                }
                temp = temp.next;
            } while (temp != head);
        }
        return false;
    }

    /**
     * @param element to be added in the list at the last position
     */
    @Override
    public void add(T element) {
        // Create a new node with the given data
        CircularListNode<T> node = new CircularListNode<>(element);
        // For empty list
        if (head == null) {
            head = node;
            tail = node;
            tail.next = head;
            size++;
            return;
        }
        // Current tail
        CircularListNode<T> currentTail = tail;
        // Point next of current tail to the new node that we created.
        currentTail.next = node;
        // Update the tail
        tail = node;
        // Join the tail with head
        tail.next = head;
        size++;
    }

    /**
     * @param element          to be added
     * @param elementInTheList element after which we need to add
     */
    public void addAfterNode(T element, T elementInTheList) {
        // First check if the given node exists in the list or not
        if (!contains(elementInTheList)) {
            throw new IllegalArgumentException("Given node doesn't exist in the list");
        }
        // Reference of the first node
        CircularListNode<T> temp = head;
        // Traverse through the list to find out the given
        // elementInTheList node and stop the iteration.
        do {
            if (temp.data.equals(elementInTheList)) {
                break;
            }
            temp = temp.next;
        } while (temp != head);
        // Create a new node with the given data
        CircularListNode<T> newNode = new CircularListNode<>(element);
        if (temp == tail) {
            tail = newNode;
            tail.next = head;
        }
        // Get the next element of this node
        CircularListNode<T> nextNode = temp.next;
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
            size--;
            return element;
        }
        // Find the reference of the given node in the list
        CircularListNode<T> temp = head;
        do {
            if (temp.next.data.equals(element)) {
                break;
            }
            temp = temp.next;
        } while (temp.next != head);
        // Check if the removed element is the tail
        if (temp.next == tail) {
            tail = temp;
        }
        // Remove the node by skipping it
        temp.next = temp.next.next;
        size--;
        return element;
    }

    /**
     * Empties the list by removing all the elements from it
     */
    @Override
    public void clear() {
        head = null;
        tail = null;
        size = 0;
    }

    /**
     * @return Returns an iterator over the elements in this list in proper sequence.
     */
    @Override
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            // Reference of the first node
            CircularListNode<T> current = tail.next;

            @Override
            public boolean hasNext() {
                return current != tail;
            }

            @Override
            public T next() {
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
        CircularListNode<T> temp = head;
        do {
            output.append(temp.data).append(", ");
            temp = temp.next;
        } while (temp.next != head);
        output.append(temp.data).append("]");
        return output.toString();
    }

    static class CircularListNode<T> {
        T data;
        CircularListNode<T> next;

        CircularListNode(T data) {
            this.data = data;
        }
    }
}
```

The above class has the following methods:

**`int size()`**
This method returns the number of elements in the list.

**`boolean isEmpty()`**
This method returns true if the list is empty, and false otherwise.

**`boolean contains(T element)`**
This method checks if the list contains a given element. It returns true if the element is present in the list, and false otherwise.

**`void add(T element)`** 
This method adds an element to the end of the list.

**`void addAfterNode(T element, T elementInTheList)`**
This method adds an element after a specified node in the list.

**`T remove(T element)`**
This method removes a specified element from the list.

**`void clear()`**
This method empties the list by removing all elements.

**`Iterator<T> iterator()`**
This method returns an iterator over the elements in the list in proper sequence.

**`String toString()`**
This method returns a string representation of the list.

The `CircularListNode` class is a static inner class of `CircularLinkedList`, which represents a node in the linked list. Each node has a data field and a next field, which points to the next node in the list.

Overall, this implementation of a circular linked list provides basic functionality for creating, manipulating, and accessing elements in the list.

## Conclusion
In conclusion, Singly, Doubly, and Circular Linked Lists are three fundamental data structures used in computer science and programming. Singly linked lists are useful for applications where forward traversal is a common operation, and memory usage needs to be minimized. Doubly linked lists allow for both forward and backward traversal and are useful when bidirectional movement is required. Circular linked lists provide a closed loop where the last node points to the first node, and they can be used to implement various algorithms such as round-robin scheduling.

In terms of implementation, all three types of linked lists are relatively straightforward, and their code can be written in various programming languages. Understanding the workings and code of these data structures is essential for any programmer, as linked lists provide a foundation for more complex data structures and algorithms.

Overall, Singly, Doubly, and Circular Linked Lists are powerful data structures that are widely used in computer science and programming. By mastering these data structures, programmers can gain a deeper understanding of how data is organized and accessed in computer systems, which is crucial for developing efficient and effective algorithms.

You can find the complete code in the GitHub [repository](https://github.com/ani03sha/AccioAlgorithms/blob/main/src/main/java/org/redquark/accioalgorithms/datastructures/lists/). I hope you enjoyed the post. Feel free to share your thoughts. Till next time… Happy learning 😄 and Namaste :pray:!