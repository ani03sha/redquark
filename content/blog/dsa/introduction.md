---
title: 'Introduction to Data Structures & Algorithms'
date: 2020-11-25 23:24:00
category: 'Data Structures & Algorithms'
draft: false
---

Hello fellow devs :wave:! The reason you are here because you have decided to learn **Data Structures & Algorithms**, right?

<br />
But hang on, what prompted this decision :thinking:?

<br />There can be various reasons - 

- You are trying to understand how a computer works under the hood :detective:.
- You are preparing for your job interviews :books:.
- You already know these concepts and wish to refresh your knowledge :notebook_with_decorative_cover:.
- You just want to have fun :grin:.
- Others...

Irrespective of the reason, the important thing is — YOU ARE HERE! That's what matters. However, before we dive deep in Data Structures and Algorithms, we must first understand what are these and why learning them is so important?

## What are Data Structures?
Let's say you have a bunch of books 📚 and you want to arrange them in your bookshelf. What would you do? You would pick books one by one and place them in the bookshelf. Simple, right?

Here, the ***data*** are the books and ***data structure*** is the bookshelf. Thus, in simple words, 

***” A data structure is a named location where data is stored”***.

In computer science, we deal with data on daily basis, and we also want to store this data into the computer memory. But can we do it just like that? Can we store this data at random places in memory without keeping track of the memory location? No, right! Because how would we access this stored data if we don't know where it is in the memory? Even if we store data at a specific location in memory, is the storage mechanism efficient? Will we be able to access this data later efficiently and in minimum time?

The answer to all the above questions is a big fat **NO**. 

To counter all the above problems, we use **Data Structures**. We store our data in a data structure, which is a named location. Thus, if we wish to access this data later, we just have to search with the name of the data structure, and we will get our data.

We also wish to access this data efficiently, so we use different data structures depending on the nature of the data we are going to store. 

Some common data structures are — arrays, lists, stacks, queues, trees, graphs, tries, etc.

## What are Algorithms?
Let's go back to school days 🏫. At the start of the term, your teacher gives you the task of determining seating arrangement for your classmates by their heights. How will you accomplish this task?

1. First, you will make a list of heights of all students.
2. Then you will sort these heights in increasing order.
3. At last, you will make students sit according to their heights.

These three steps are pretty intuitive. But do you know what you just did? You just used an ***Algorithm*** to solve a given problem by performing a set of steps.

***”An algorithm is a set of steps to solve a well-defined problem”***.

Different algorithms can be used for solving different problems or even same problem. Yes, there can be more than one algorithm to solve a problem. The goal of learning algorithms is to determine a set of steps which solve a given problem most **efficiently**.

## Why Data Structures and Algorithms are important :thinking:?
Many beginners often wonder why do we need to learn this complicated stuff if we don't use them often in real life? 

Let me tell you an anecdote, there was once a German kid named [Carl Friedrich Gauss](https://en.wikipedia.org/wiki/Carl_Friedrich_Gauss) who was punished by his school teacher for misbehavior. The punishment was to add all the numbers from **1** to **100** i.e., `1 + 2 + 3 + ... + 100`. And to the amazement of teacher, he was able to do the sum in a matter of seconds. The reach had no clue that how on earth did he do that so fast?

What he actually did was - 

1. First he wrote numbers from 1 to 100

```
S = 1 + 2 + 3 + 4 + ... + 100
```

2. Then he wrote numbers from 100 to 1 in the next line as - 

```
S = 1   +  2 +  3 +  4 + ... + 100
S = 100 + 99 + 98 + 97 + ... + 1
```

3. Then he added numbers vertically

```
S  = 1   +  2 +  3 +  4 + ... + 100
S  = 100 + 99 +  98 + 97 + ... + 1
------------------------------------
2S = 101 + 101 + 101 + 101 + ... 101
```

4. Then he divided the sum by 2

```
S = 101 X 100
    ---------
        2

=> S = 5050
```

Pretty neat, eh :smiley:? Gauss was the one to invent the formula for calculating the sum of first n positive integers i.e., ***S<sub>n</sub> = n * (n + 1) / 2***.

If we were to write program for adding numbers from 1 to 100, we can either add one number at a time or we can directly use the formula -

```
S = n X (n + 1)
    -----------
         2

where n is the input number
```

Speed is fun(not on the road, of course). We all love fast results. It saves us time and sometimes resources as well. Therefore, correct use of data structures and algorithms give us results very fast.

You can argue that today's computers are insanely fast and are loaded with resources, so why should we worry about optimizing our code? You are correct but even though the computers are fast and have huge resources, they don't have **infinite** speed and memory. Therefore, if a bad code is run on a very fast computer and an optimized code is run on a slower computer, for sufficiently large inputs, the performance of slower computer will be better.

Don't believe me? See for yourself. Below are the python code snippets for adding numbers from 1 t0 10000000 using the two approaches we discussed - 

### Approach #1 — Trivial

```python
import time

s = 0
n = 10 ** 7
start = int(round(time.time() * 1000))
for i in range(1, n):
  s = s + i
end = int(round(time.time() * 1000))
print(end - start) # 5665374 microseconds
```

This code takes one number at a time and add it to the sum. Overall it takes **5.66 seconds**.


### Approach #2 — Smart
```python
import time

n = 10 ** 7
start = int(round(time.time() * 1000000))
s = n * (n + 1) / 2
end = int(round(time.time() * 1000000))
print(end - start) # 18 microseconds
```

This code uses the mathematical formula to calculate the sum. Overall it takes only **0.000018 seconds**.

Whoa... this is a huge difference :astonished: and it shows the power of using correct algorithm.

Every good software engineer doesn't just rush into writing code to implement a functionality. A good software engineer first spends a good amount of time in analyzing the problem and its possible solutions. He/she then compares all the solutions and then choose the one which is the most efficient.

## Do I need to remember all algorithms?
Most of the time, the most efficient solutions are not intuitive. We have to really **think** to get to them. The study of algorithms is not about memorizing all the algorithms, no, it's about training our mind to think in the right direction. Of course, if we know certain tricks then the journey to arrive to the efficient solution becomes easier.

Yes, like every other subject, we need to understand some basic concepts and that's what we are going to do in future posts. There are already many algorithms and correct usage of data structures to solve common problems, and we needn't reinvent the wheel. We can just go through them, understand them and use the knowledge gained in solving our day-to-day problems.

***“Thus, we don't need to memorize all the algorithms (there are just too many), we just have to go through basic algorithms and train our mind to build on to that knowledge.”***

Thus learning data structures and algorithms help us in getting familiarized with the tools to solve a problem using computer.

## Time and Memory
Consider **time** and **memory** as the currency with which you can buy computing power. And we should be frugal. We should always try to find out the solution which uses minimum time and minimum memory to give us the desired output.

We certainly don't want a solution that takes forever to run and uses vast amount of computer memory. After all, who wants to buy something at higher cost if it is available at a cheaper price. 

## Scalability
Our code should be scalable which means our solution should not only handle the problems of smaller or moderate size but also larger size with the same effectiveness.

Let's take an example of **YouTube** — People watch almost ***1 billion hours*** of videos every day which is more than **Netflix** and **Facebook** videos combined. These are mind-boggling stats :astonished:. Looking at the traffic on YouTube, it is evident the code behind the scenes should be able to handle huge number of requests. If the code is badly written (taking too much time and memory to execute), the YouTube will not be able to function properly, and we won't be fascinated by it anymore.

This is an example of Scalability. Scalability means **Scale + Ability** i.e., a scalable system should be ***able*** to handle input of large ***scale***.

Since we have limited time and memory, for scalability, these two should be used very carefully and efficiently.

Hence,

```
                      1
scalability ∝  ---------------
                time and memory 
```

As we have seen in the example of adding numbers from **1 to N**, the first solution is not scalable but the second one is because it uses much less time and memory to execute.

## Where to go from here?
Before, learning about data structures and algorithms, we will first understand the mathematics (don't worry, it's pretty easy) to compare one data structure or algorithm with another.

After that, we will understand some basic data structures, their implementations, their running times and memories.

At last, we will learn some algorithms, their implementations, real life usages, running times and memories.

## Conclusion
In this post, we discussed briefly about data structures and algorithms and why should we learn them.
This post will also act as an index for the upcoming posts.

I hope you have enjoyed this post. Feel free to share your thoughts. Till next time… Happy learning 😄 and Namaste :pray:!