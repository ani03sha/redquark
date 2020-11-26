---
title: 'Analysis of Algorithms'
date: 2020-11-26 23:23:00
category: 'Data Structures & Algorithms'
draft: false
---

Analysis of an algorithm means analyzing the resources that the algorithm requires. It is similar to what we do in our day-to-day life while making decisions. We tend to compare different options of performing any task by their efforts and choose the option which requires minimum effort.

In a computer, resources like *memory*, *hardware*, *time* are of primary concern. However, most of the time, it is the running time of algorithm that we wish to measure and minimize. In this post, we will see tools which are used to analyze an algorithm.

## Why analysis is important :thinking:?
Let's assume you have an English dictionary which has 1000 pages. Your task is to find the first word that start with the letter `p`. Note that the dictionary has all the words arranged in the alphabetical order.

One naive way to solve this problem is to start from first word of the first page and check if it starts with `p`. If it does, then we will return the word, else we will check the second word and so on. Assuming the first word that starts with letter `p` is at page 687, then we will have to scan each page from 1 to 687 until we find the word. This algorithm does work and returns the correct answer but it is tedious :weary:, isn't it? 

<br />

Can we do better :thinking:?

<br />

Another way to solve this problem, is to divide the book into two halves until we find the desired word. So, first we divide the book from pages 1-500 and 501-1000. Let's say the first word on page 501 starts with the letter `m` then we are sure that our desired word lies in pages from 501-1000. We can then discard pages 1-500 right away. Did you notice that, just in one step we have reduced the problem size to its half :smiley:? Now, we will divide the second half (pages from 501-1000) into its half (pages from 501-750 and from 750-1000). Let's say the first word on the page 751 starts with letter `t`, then we know that our desired word lies in pages from 501-750. In just two steps, we are dealing with only 250 pages (quarter of what we had in the start). Now, again we take two halves (pages from 501-625 and 626-750) and then again two halves and so on until we reach to page 687 which is our desired outcome.

<br />

If we compare the above two methods, then will find that the second method is much better than the first one. This is why analysis of an algorithm is important. **"There can be more than one algorithm to solve a single problem. By analyzing all of those (in terms of running time, memory etc.), we can choose the best among them and reduce the used resources"**.

However, just to clarify, above two methods of searching a word in the dictionary are ***Linear Search*** and ***Binary Search*** respectively. But don't worry, we will learn about those in the later parts of this series :smiley:.

## How to analyze?
After learning, why analysis of algorithms is important, the next question is how to do analyze :thinking:?

Let's revisit the previous example again with only variation that now we have 5000 pages instead of 1000. Obviously, to find the first word that starts with `p` will take more steps because we have more pages (and hence, more words to scan). I hope I am making sense here :raised_eyebrow:. Read on, ***this is very important***. What if instead of 5000 pages, there were 20000 pages (insane, right?), it will take more time to solve the problem. 

What do we understand from the above examples :thinking:? Yes, as the ***size*** of input increases, ***time*** required to solve the problem also increases. Pretty simple, isn't it? Thus, run-time of an algorithm depends on the size of the input.

We can derive similar thing for ***space***. You need more space in your bookshelf to pace a book of 5000 pages than the book of 1000 pages. Same is true for the computer memory (or space) as well. Thus, the space an algorithm takes also depends on the input size.

***"The total time and space is required by an algorithm is the sum of the time and space taken by each instruction of that algorithm”***. 

I know definitions are boring, examples are interesting :smiley:, so there's another example for you. Suppose you are making tea for yourself and your spouse (or partner). 

What you need - 

- 1 cup milk (250 ml)
- 1 cup water (250 ml)
- 2 tsp tea powder (10 gm ~ 10 ml)
- 2 tsp sugar (10 gm  ~ 10 ml)

What are the general steps you'd follow? You will —

- Add necessary milk for two people (takes 5 seconds)
- Add water to it (takes 5 seconds)
- Add tea leaves (takes 5 seconds)
- Boil for some time (120 seconds)
- Pour into teacups (10 seconds)

Thus, if we wish to find the time complexity of this process then we will add the time taken by individual steps. In our case, it will be — (5 + 5 + 5 + 120 + 10)seconds = 145 seconds.

On similar lines, if we wish to find the space complexity then we will add the space taken by all the ingredients of our program which in our case would be — (250 + 250 + 10 + 10)ml = 520ml.

Making tea is a problem and the steps taken by us are the steps of the algorithm which we chose to prepare tea.

For an algorithm, we will list down all the steps and find their individual time and memory. To calculate the overall time and space complexity, we will take sum of individual space and time.

### Assumptions
In the ideal world, we should precisely define all the instructions and their costs. But doing that, would be tedious and would provide little insight into algorithm design and analysis. In our analysis, we shall assume a generic one-processor machine ([Random Access Machine](https://en.wikipedia.org/wiki/Random-access_machine)). 

Our RAM model will contain common instructions found in real computers. Few examples are — 

- **Arithmetic** — add, subtract, multiply, divide, modulo, floor, ceiling etc.
- **Data Movement** — load, store, copy.
- **Control** — conditions, function calls, return.

We will also assume that our data types are integers and floating point. And there is a limit on the size of each word of data (this is important because if we have arbitrary word size, then we can store huge amount of data in one word and operate it in the constant time — clearly this doesn't happen in real computers).

Analyzing even a trivial algorithm in the RAM model can be a challenge and the mathematical tools required may include — probability, combinatorics, algebra etc. Therefore, we would use some approximations on our analysis (and you would be amazed to see that this still gives us enough information about our algorithm).

Let us see some examples.

## Example 1 — Find max element in array
Let's say we are given an array having n integers **A = [a<sub>1</sub>, a<sub>2</sub>, a<sub>3</sub>, ..., a<sub>n</sub>]**, and we need to find the maximum element among them.

The pseudo code for this will be - 

```
FIND_MAX(A)                                 cost        times
1.  max = A[1]                               c1            1
2.  for i = 2 to A.length                    c2            n
3.      if max < A[i]                        c3           n-1
4.          max = A[i]                       c4           n-1
5.  return max                               c5            1
```

For simplicity, we are assuming the array starts from index 1 and A.length gives the length of the array. The costs of individual steps is given in front of each step. The `time` column defines the number of times the step is being executed.

- Line #1 is executed only once. Thus, its total cost will be `c1 * 1 = c1`.
- Line #2 will be executed for all the elements of array except the first one. Thus, if the total length is `n`, then the loop will execute for `n` times. `Total cost = c2 * n = c2n`. When a **while** or **for** exits usually, then the test in loop header executes one more time than the loop body.
- Line #3 will also be executed `n - 1` times. `Total cost = c3 * (n - 1)`.
- Line #4 will be executed maximum for `n - 1` times (when the array is sorted in ascending order which I am assuming is our case here for simplicity). `Total complexity = c4 * (n - 1)`
- Line #5 will be executed only once. `Total complexity = c5 * 1 = c5`.

Now, to calculate the total time `T(n)` taken by the algorithm, we shall add all the times.

```
⇛ T(n) = c1 + c2 * n + c3 * (n - 1) + c4 * (n - 1) + c5

⇛ T(n) = c1 - c3 - c4 + c5 + (c2 + c3 + c4)n

⇛ T(n) = an + b, where a = (c2 + c3 + c4) and b = c1 - c3 - c4 + c5
```

Clearly, the time function `T(n)` is a linear function of `n`. As we increase or decrease `n`, `T(n)` will also increase or decrease accordingly.

### Best Case
The best case of an algorithm is the case where the algorithm performs the best i.e., takes minimum time to return the result. In our example, the best case is when the array is sorted in decreasing order. In that case, we don't have to go inside the `if` block at all.

### Worst Case
The worst case of an algorithm is the one where the algorithm performs the worst i.e., takes maximum time to return the result. In our example, the worst case is when the array is sorted in increasing order. In that case, we would be going into the `if` block in each iteration.

### Average Case
The average case of an algorithm is when the algorithm performs between the best case and the worst case. In our example, the average case occurs when we would be going into the `if` block for some case but not all the cases.

### Which case should we choose :thinking:?
Take a pause here and think for a minute. What case will save us from “guessing” the algorithm's time/space complexity? 

We are most interested in the worst case because it gives us the upper bound on time and space. It gives us the idea about the maximum amount of time/space an algorithm can take. If we choose average case, then there might be some inputs for which the time takes more than what average case suggests (however, often the average case is “just as bad” as the worst case).

## Example 2 — Print a matrix
Let's say we are given a matrix `A` of order `m * n`, the pseudo for code printing its each element will be - 

```
PRINT_MATRIX                                    cost              times
1.   for i from 1 to m                           c1                 m
2.      for j from 1 to n                        c2         (m + 1) * (n + 1)
3.          print A[i][j]                        c3               m * n 
```

Total cost will be -

```
⇛ T(n) = c1 * m + c2 *(m + 1) * (n + 1) + c3 (m * n)

⇛ T(n) = c1(m) + c2(mn) + c2(m) + c2(n) + c2 + c3(mn)

⇛ T(n) = (c2 + c3)mn + (c1 + c2)m + c2(n) + c2

⇛ T(n) = amn + bm + cn + d
```

Here, the total time is proportional to `mn`.

## Example 3 — Multiply two matrices
Let's look at another example of multiplying two matrices. For matrix multiplication to take place, the number of columns of first matrix must be equal to the number of rows of second matrix.

Let's say there are two matrices `A[i][j]` and `B[j][k]`, the resultant matrix after multiplication will be `C[i][k]`. Read more details about it in this [interesting post](https://www.mathsisfun.com/algebra/matrix-multiplying.html). Here, let's assume `i = j = k = n` (both matrices are square matrices).

Pseudo code for matrix multiplication will be — 

```
MATRIX_MULTIPLICATION                                                   cost        times
1.   C = new matrix of size n x n                                        c1           1
2.   for x from to 1 to n                                                c2          n+1
3.       for y from 1 to n                                               c3      (n+1)*(n+1)
4.           for z from 1 to n                                           c4   (n+1)*(n+1)*(n+1)
5.               C[x][y] = C[x][y] + A[x][z] * B[z][y]                   c5         n*n*n
6.   return C                                                            c6           1
```

The outermost loop will run only `n + 1` times. The second nested loop will run for `n + 1` times for each iteration of the first loop therefore, it will run total of `(n + 1) * (n + 1)` times. The innermost loop will run for `n + 1` times for each iteration of combined outermost and middle loop. Therefore, the total times will be `(n + 1) * (n + 1) * (n + 1)`.

Total time will be — 


⇛ T(n) = c1 + c2*(n + 1) + c3*(n + 1)<sup>2</sup> + c4*(n + 1)<sup>3</sup> + c5*(n)<sup>3</sup> + c6 
<br/>
⇛ T(n) = c1 + c2(n) + c2 + c3(n)<sup>2</sup> + c3(2n) + c3 + c4(n)<sup>3</sup> + c4(3n<sup>2</sup>) + c4(3n) + c4 + c5(n<sup>3</sup>) + c6
<br />
⇛ T(n) = (c1 + c2 + c3 + c4 + c6) + (c2 + 2c3 + 3c4)n + (c3 + 3c4)n<sup>2</sup> + (c4 + c5)n<sup>3</sup>
<br />
⇛ T(n) = an<sup>3</sup> + bn<sup>2</sup> + cn + d

<br />

The order of this equation is 3 (order of a function is the maximum power of variable present in it). Thus, as the input size `n` increases, the time taken by the algorithm increases by the cube of the input.

## Approximation
In the above three examples, we have calculated times taken by the respective algorithms as below - 

- an + b
- amn + bm + cn + d
- an<sup>3</sup> + bn<sup>2</sup> + cn + d

Let's say `a = 10` and `b = 40` for **T(n) = an + b** - 

```
n = 10
=> T(n) = 10 * 10 + 40 = 140

n = 100
=> T(n) = 10 * 100 + 40 = 1040

n = 100000
=> T(n) = 100000 * 10 + 40 = 1000040
```

As you must have noticed, that as the input becomes larger, the impact of constant term becomes smaller. Therefore, we can drop the constant term without losing our purpose. Even the impact of coefficient of the highest order term can be neglected and ***T(n) ~ n***.


Let's take the third example. For `a = 10`, `b = 20`, `c = 50`, `d = 100` and **T(n) = an<sup>3</sup> + bn<sup>2</sup> + cn + d**

```
n = 2
=> 10*(2)^3 + 20*(2)^2 + 50*2 + 100 = 80 + 80 + 100 + 100 = 360

n = 5
=> 10*(5)^3 + 20*(5)^2 + 50*5 + 100 = 1250 + 500 + 250 + 100 = 2100

n = 10
=> 10*(10)^3 + 20*(10)^2 + 50*10 + 100 = 10000 + 2000 + 500 + 100 = 12600

n = 20
=> 10*(20)^3 + 20*(20)^2 + 50*20 + 100 = 80000 + 8000 + 1000 + 100 = 89100
```

Here also, as the input size increase, the higher order terms contribute to the most of the run time. Thus, we can ignore lower order terms because for large inputs, they grow much slowly than the higher order terms. Therefore, in this case ⇛ ***T(n) ~ n<sup>3</sup>***.

## Conclusion
Phewww :weary: this was a long post and required much attention to understand stuff. I hope you enjoyed this post. But we are not quite done yet, though we went through the steps to analyze an algorithm in this post, there are a few mathematical tools still left to discuss which will help us in specifying the time and space complexity formally. 

In the next post we will discuss asymptotic notations (Big-O, Big-Omega etc) and their properties.

Feel free to share your thoughts. Till next time… Happy learning 😄 and Namaste :pray:!