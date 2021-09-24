---
title: 'Bit Magic - Part 2'
date: 2021-9-24 09:49:00
category: 'Problem Solving'
draft: false
---

Hello fellow dvs :wave:! This is the second part where we will see some cool tricks to solve problems using *bit manipulation*. You can find the first part [here](https://redquark.org/problem-solving/bit-manipulation/bit-magic-1/). In the first part, we saw some simple problems and in this part, we will start with simple problems and move to medium or moderately hard problems.

Excited??? I know, you are :smiley:. So, without wasting time, let's start.

# 1. Even or Odd
<p style="color: #800080"><b>Check if a given integer n is even or odd.</b></p>

This is probably the simplest problem. We can just perform **AND** operation between `n` and 1 and we will get 0 for even `n` and 1 for odd `n`.

```java
public class CheckEvenOrOdd {

    public String check(int n) {
        return (n & 1) == 0 ? "Even" : "Odd";
    }
}
```

# 2. Check for opposite sign
<p style="color: #800080"><b>Given two integers a and b, check if they have opposite signs.</b></p>

We know that for negative numbers, the left most bit is 1 and for positive numbers, it is 0. Therefore, if we perform **XOR** between `a` and `b` and they are of opposite sign, we should get 1 at the left most bit which means the resultant number will also be negative. We can use this insight to solve this problem.

```java
public class CheckOppositeSign {

    public boolean check(int a, int b) {
        return (a ^ b) < 0;
    }
}
```

# 3. Swap all odd and even bits
<p style="color: #800080"><b>Given an unsigned integer n, swap all odd bits with even bits.</b></p>

I think the solution to this problem is not intuitive and we have to *really* think about it. The approach is that we first create masks for even and odd bits. Also, keep in mind that since any integer is maximum 32 bits, we will have to have our masks also 32 bits long. 

Let's start small - if we wish to preserve even bits, then we can have mask where even bits are 1 and odd bits are zero. If we wish to preserve odd bits, then we can have mask where odd bits are 1 and even bits are 0.

For four bit numbers, our masks can be `evenMask = 1010` and `oddMask = 0101` (bit counting starts from right to left). These two masks are equivalent to `0xAAAAAAAA` and `0x55555555` respectively for 32-bit numbers.

After creating masks, we can perform **AND** operation with even and odd masks separately where we get even and odd bits preserved respectively. After this, the story is simple, we can right shift even output so that even bits become odd and left shift odd output so that odd bits become even. In the end, we can simply return the **OR** of shifted outputs.

```java
public class SwapEvenOddBits {

    public int swap(int n) {
        // Masks for even and odd bits
        int evenMask = 0xAAAAAAAA;
        int oddMask = 0x55555555;
        // Perform AND operation between even and odd masks
        int evenBits = n & evenMask;
        int oddBits = n & oddMask;
        // Shift even bits to right and odd bits to left to make
        // even bits odd and odd bit even
        evenBits >>= 1;
        oddBits <<= 1;
        return evenBits | oddBits;
    }
}
```

# 4. Count set bits in a number
<p style="color: #800080"><b>Given an unsigned integer n, count set bits in it.</b></p>

We know that if we subtract 1 from a number, all the bits after rightmost set bit flip including the rightmost set bit. Therefore, if we perform **AND** of `n` and `n - 1`, the rightmost set bit is unset.
We can do it in a loop until n becomes zero and increment our count

```java
public class CountSetBitsInANumber {

    public int count(int n) {
        // Special case
        if (n == 0) {
            return 0;
        }
        // Count of set bits
        int setBits = 0;
        // Loop until n is greater than 0
        while (n > 0) {
            n &= (n - 1);
            setBits++;
        }
        return setBits;
    }
}
```

# 5. Count total set bits
<p style="color: #800080"><b>Given a number n, find the total count of set bits for all numbers from 1 to N(both inclusive).</b></p>

Before discussing the idea, let's see the bit pattern from 0 to 13 - 

```
0 -> 0000
1 -> 0001
2 -> 0010
3 -> 0011
4 -> 0100
5 -> 0101
6 -> 0110
7 -> 0111
8 -> 1000
9 -> 1001
10 -> 1010
11 -> 1011
12 -> 1100
13 -> 1101
```

Check for the highest power of 2 before n which is 2<sup>3</sup> = 8. Before 8 (from 0 to 7), there is a pattern - one bit is unset, next is set, then one is set, next is unset and so on (see only LSBs). The take second last bit - two bits are unset, next two are set, next two are unset, next two are set and so one. Now, check the third last bit - four are unset, next four are set.

This gives us total set bits in 0 to 7 => 4 + 4 + 4 = 12. Or we can say that 2<sup>3-1</sup> * 3. Thus, if the maximum power of two less than or equal to `n` is `p`, then in those numbers total set bits are **2<sup>p-1</sup> * p**.

Now, we have remaining numbers **n - 2<sup>p</sup>**. In them, all MSBs are set. Therefore, the count of set MSBs will be **n - 2<sup>p</sup> + 1**. For the remaining bits after MSB, we again have same combinations as we had for 0 to 7.

Thus, total bits can be calculated as below - 

```java
public class CountTotalSetBits {

    public int count(int n) {
        // Special case
        if (n <= 0) {
            return 0;
        }
        // Get maximum power of two less than n
        int maxPower = getMaximumPowerOfTwo(n);
        // Now calculate the total number of set bits
        return maxPower * (1 << (maxPower - 1))
                + (n - (1 << maxPower) + 1)
                + count(n - (1 << maxPower));
    }

    private int getMaximumPowerOfTwo(int n) {
        int power = 0;
        while ((1 << power) <= n) {
            power++;
        }
        return power - 1;
    }
}
```

# 6. Longest consecutive 1s
<p style="color: #800080"><b>Given a number n, ind the length of the longest consecutive 1s in its binary representation.</b></p>

The idea is that if we perform **AND** of `n` and `n << 1`, we are effectively removing the last 1 from every sequence of consecutive 1s.

```java
public class LongestConsecutive1s {

    public int maxConsecutiveOnes(int N) {
        int maxConsecutiveOnesCount = 0;
        while (N != 0) {
            N &= (N << 1);
            maxConsecutiveOnesCount++;
        }
        return maxConsecutiveOnesCount;
    }
}
```

# 7. Generate power set
<p style="color: #800080"><b>Give a set S, find all subsets of it</b></p>

This problem can be solved using recursion but here we will see the approach involving bits. From math, we know that total number of subsets in a power set is 2<sup>n</sup>. Thus, we can generate power set by generating all binary numbers between 0 and 2<sup>n</sup> - 1, where `n` is the total number of elements in the set `S`.

We can then iterate through all those numbers and add the element at the index in `S` which is equal to the position of the bit set in the current number

```java
public class GeneratePowerSet {

    public List<List<Integer>> generate(int[] S) {
        // List to store the output
        List<List<Integer>> powerSet = new ArrayList<>();
        // Special case
        if (S == null || S.length == 0) {
            return powerSet;
        }
        // Length of the array
        int n = S.length;
        // Total number of sets
        int count = 1 << n;
        // Generate each subset one by one
        for (int i = 0; i < count; i++) {
            // List to store current subset
            List<Integer> currentSubset = new ArrayList<>();
            // Check every bit of i
            for (int j = 0; j < n; j++) {
                // If j-th bit of i is set, add it to the list
                if ((i & (1 << j)) != 0) {
                    currentSubset.add(S[j]);
                }
            }
            powerSet.add(currentSubset);
        }
        return powerSet;
    }
}
```

# 8. Reverse bits
<p style="color: #800080"><b>Given an integer, reverse its bits. For e.g., if the input is 10011, then the output should be 11001.</b></p>

The idea is simple - take a number with all zeroes `m`. Traverse the input number `n` from least significant bit and if the current bit is 1, set the most significant bit in `m`.

```java
public class ReverseBits {

    public int reverse(int n) {
        // Special case
        if (n == 0) {
            return 0;
        }
        // Sequence of 0s
        int m = 0;
        // Loop from LSB to MSB
        for (int i = 31; i >= 0 & n != 0; i--) {
            // If the current bit in n is 1, set the corresponding bit in m
            if ((n & 1) != 0) {
                m |= (1 << i);
            }
            n >>= 1;
        }
        return m;
    }
}
```

# 9. Power of 4 and 8
<p style="color: #800080"><b>Given an integer, check if it is a power of 4 and 8 or not.</b></p>

A number is a power of 4, if it is a power of 2 and has only set bit present at even positions (0, 2, 4,....). We can check power of 2 using `n & (n - 1) == 0` as discussed in previous post. While we can use` mask = 0xAAAAAAAA` which has 1 bits set in all odd positions (0-based), then the **AND** of this `mask` and `n` will be zero, if `n` is power of 4.

We can use the same logic while determining if a number is a power of 8. Every number which is a power f 8 should be a power of 2 and it has only set bits at positions at 0, 3, 6,... etc. The mask we can use in this case is `mask = 0xB6DB6DB6`.

```java
public class PowerOf4And8 {

    public boolean isPowerOf4(int n) {
        return n != 0 && (n & (n - 1)) == 0 && (n & 0xAAAAAAAA) == 0;
    }

    public boolean isPowerOf8(int n) {
        return n != 0 && (n & (n - 1)) == 0 && (n & 0xB6DB6DB6) == 0;
    }
}
```

# 10. Maximum subset XOR
<p style="color: #800080"><b>Given an array nums[] of n positive integers, find an integer denoting the maximum XOR subset value in the given array nums[].</b></p>

This is a tricky problem and can be solved by **[Gaussian Elimination Algorithm](https://www.hackerearth.com/practice/notes/gaussian-elimination/)**. Let us first understand a simple case when all elements have MSBs at different positions.The maximum XOR can be found out by simply **XORing** all elements.

But if input contains multiple numbers with the same MSB, then it’s not obvious which of them we should choose to include in the XOR. What we do is reduce the input list into an equivalent form that doesn’t contain more than one number of the same length. By taking the maximum element, we know that the MSB of this is going to be there in output. Let this MSB be at position `i`. If there are more elements with `i-th` bit set (or same MSB), we XOR them with the maximum number so that the `i-th` bit becomes 0 in them and problem reduces to `i - 1` bits.

The steps we can follow are -

1. Initialize index of chosen elements as 0.
2. Traverse through all bits starting from most significant bit. Let `i` be the current bit.
    
    2.1. Find the maximum element with `i-th` bit set. If there is no element with `i-th` bit set continue to smaller bit.  
    2.2. Let the element with `i-th` bit set be `maximum` and index of this element be `maxElementIndex`. swap `nums[index]` and `nums[maxElementIndex]`
    2.3. Do **XOR** of maximum with all numbers having `i-th`  bit as set and increment `index`.
3. Return XOR of all elements in `nums`.

```java
public class MaximumSubsetXOR {

    private static int maximumSubsetXORValue(int[] nums) {
        // Special case
        if (nums == null || nums.length == 0) {
            return 0;
        }
        // Length of the array
        int n = nums.length;
        // Index of the chosen element
        int index = 0;
        // Traverse through the bits of integer from MSB to LSB
        for (int i = 31; i >= 0; i--) {
            // Maximum element
            int maximum = Integer.MIN_VALUE;
            // Index of the maximum element
            int maxElementIndex = index;
            // Find the maximum element with i-th bit set
            for (int j = index; j < n; j++) {
                // Check if the i-th bit of j-th element is set
                // and this element is greater than maximum so far
                if ((nums[j] & (1 << i)) != 0 && nums[j] > maximum) {
                    maximum = nums[j];
                    maxElementIndex = j;
                }
            }
            // If there was no element with i-th bit set, we will
            // continue for the next smaller bit
            if (maximum == Integer.MIN_VALUE) {
                continue;
            }
            // Swap the maximum element with i-th bit set
            int temp = nums[index];
            nums[index] = nums[maxElementIndex];
            nums[maxElementIndex] = temp;
            // Update maximum element index
            maxElementIndex = index;
            // Perform XOR of nums[maxElementIndex] with other elements
            // with i-th set bit
            for (int j = 0; j < n; j++) {
                if (j != maxElementIndex && (nums[j] & (1 << i)) != 0) {
                    nums[j] ^= nums[maxElementIndex];
                }
            }
            index++;
        }
        // XOR of all the final elements
        int xor = nums[0];
        for (int i = 1; i < n; i++) {
            xor ^= nums[i];
        }
        return xor;
    }
}
```

# Conclusion
Phewww, this was a long post :weary:! If you have made it this far, pat your back :clap: :clap: :clap:.
In this post, we discussed some more complex problems than the first part. 

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/ProblemSolving/src/main/java/org/redquark/tutorials/problemsolving/bitmagic) repository. If you like what you learned, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!