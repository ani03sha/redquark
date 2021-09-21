---
title: 'Bit Magic - Part 1'
date: 2021-9-19 19:15:00
category: 'Problem Solving'
draft: false
---

Howdy fellow devs :wave:! Since we are in the field of making computer do our tasks, we know that computers don't understand words and letters like we do. They only understand **binary** — a sequence of zeroes and ones. This series of 0s and 1s are called **bits**.

There are many problems which can be solved by manipulating bits. In this post (and hopefully, in subsequent parts), we will look at some common problems which can be easily solved using bit manipulation. In my opinion, the solutions are not intuitive and can be a bit difficult to write or maintain but as a self-respecting software engineer, we should know these techniques :muscle:.

So, without further ado, let's see some problems.

# 1. Find first set bit
<p style="color: #800080"><b>Given an integer an n, return the position of first set bit found from the right side in the binary representation of the number.
For example - binary representation of 22 is 10110, and the position of first set bit is 2.
</b></p>

For non-zero inputs, we can find the position of first set bit by **ANDing** the `n` with a variable `mask` which has initial value of 1 and will **left shift (<<)** after each iteration. The **AND** will yield zero as long as we are encountering zero (from right) in `n`. The moment we get 1 as the output of **AND**, we will return the count of iterations we have made till that point as answer.

The code for the idea is below — 

```java
public class FindFirstSetBit {

    public int getFirstSetBit(int n) {
        // Special case
        if (n == 0) {
            return 0;
        }
        // Position of the first set bit from the right
        int position = 1;
        // Variable for shifting
        int mask = 1;
        // Counting the position of first set bit
        while ((n & mask) == 0) {
            position++;
            mask <<= 1;
        }
        return position;
    }
}
```

# 2. Rightmost different bit
<p style="color: #800080"><b>Given two numbers m and n, find the position of the rightmost different bit in the binary representation of numbers.
</b></p>

This is the extension of the previous problem. We know that if we take **XOR** of two numbers, then 1 will be present in the output at places which have different bits in the given numbers. Therefore, if we find the position of first set bit in the **XOR**, then we will have our answer.

The code for this idea is below - 

```java
public class RightMostDifferentBit {

    public int posOfRightMostDiffBit(int m, int n) {
        // Find the XOR of both numbers to get 1 at the position
        // of difference in bits
        int xor = m ^ n;
        // Special case
        if (xor == 0) {
            return 0;
        }
        // Now find the position of the rightmost set bit
        // Position of the first set bit from the right
        int position = 1;
        // Variable for shifting
        int mask = 1;
        // Counting the position of first set bit
        while ((xor & mask) == 0) {
            position++;
            mask <<= 1;
        }
        return position;
    }
}
```

# 3. Check whether k<sup>th</sup> bit is set or not
<p style="color: #800080"><b>Given a number n and an integer k, check if k<sup>th</sup> bit of n is set or not.</b></p>

This is a bit tricky problem and not intuitive (in my opinion :confused:). The first thing we can do is shift our `mask` by `k` positions and then negate it. For example, if `k = 3`, our `mask` will become `1000` after shifting `k` times, then we will negate it, so it will become `0001`. Now, if we take **OR** the resultant value with `n`, we will get a string of all `1s`, if the k<sup>th</sup> bit is 1, otherwise not.

The code is below — 

```java
public class CheckKthBit {

    public boolean checkKthBit(int n, int k) {
        // Variable for shifting
        int mask = 1;
        // Shift k positions
        for (int i = 0; i < k; i++) {
            mask <<= 1;
        }
        // Negate the shift
        mask = ~mask;
        // OR the shift with n
        return (mask | n) == ~0;
    }
}
```

# 4. Set k<sup>th</sup> bit
<p style="color: #800080"><b>Given a number n and a value k. From the right, set the k<sup>th</sup> bit in the binary representation of n.</b></p>

This is pretty simple, we will take a `mask` with initial value 1, and then shift it to `k` positions which will result in k<sup>th</sup> bit of mask to 1 and remaining bits 0. Then we will perform **OR** with `n` to get our final answer.

The code for this idea is below — 

```java
public class SetKthBit {

    public int setKthBit(int n, int k) {
        return n | (1 << (k));
    }
}
```

# 5. Power of 2
<p style="color: #800080"><b>Given a non-negative integer n, check if n is a power of 2.</b></p>

The powers of two are 2,4,8,16,32,... and so on. Note that in the binary representation of any number which is a power of 2, we have only MSB set, and all remaining bits are 0. Now, for all numbers which are 1 less than a number which is power of 2, all bits are 1. See few examples below —

```
2 -> 10            1 -> 1            
4 -> 100           3 -> 11
8 -> 1000          7 -> 111
16 -> 10000        15 -> 1111
```

It's now intuitive that if we **AND** `n` and `n-1`, then we will get 0 for all powers of two. Following code shows this idea - 

```java
public class PowerOfTwo {

    public boolean isPowerOfTwo(long n){
        if (n <= 0) {
            return false;
        }
        return (n & (n - 1)) == 0;
    }
}
```

# 6. Bit difference
<p style="color: #800080"><b>Given two numbers A and B, count the number of bits needed to be flipped to convert A to B.</b></p>

Our first task is to find different bits (at the same place) in `A` and `B`. The logical operation that comes to our mind for such task is **XOR**. After **XORing** `A` and `B`, we will get 1 at places where bits were different. Now, our task comes down to find out the count of 1s in the **XOR** output.

The code for this idea is below — 

```java
public class BitDifference {

    public int countBitsFlip(int a, int b) {
        // Find XOR of two numbers to find out different bits
        int xor = a ^ b;
        // Count of 1s in the XOR output
        int count = 0;
        // Loop until xor becomes 0
        while (xor != 0) {
            xor &= (xor - 1);
            count++;
        }
        return count;
    }
}
```

# 7. Sparse number
<p style="color: #800080"><b>Given a number n, check whether it is sparse or not. A number is said to be a sparse number if no two or more consecutive bits are set in the binary representation.</b></p>

If we left shift `n` by 1 and **AND** it with itself, we should be able to determine if the number is parse or not. Let's understand this with example, suppose `n = 1100111`, then `n << 1 => 1001110`.
Now, `n & (n << 1) => 1100111 & 1001110 => 1000110 != 0`, hence this number is not sparse.
Let's take another example, `n = 100101`, then `n << 1 => 001010`. Now,  `n & (n << 1) => 000000 == 0`, hence this number is a sparse number.

```java
public class SparseNumber {

    public boolean isSparse(int n) {
        return (n & (n << 1)) == 0;
    }
}
```

# 8. Single number
<p style="color: #800080"><b>Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.</b></p>

It's simple :smile:. If we take **XOR** of a number with itself, we get 0, so if we **XOR** all numbers in the array, the pairs will cancel out each other, and we will be left with the number which is appearing once in the array.

```java
public class SingleNumber {

    public int findSingle(int[] nums) {
        int xor = nums[0];
        for (int i = 1; i < nums.length; i++) {
            xor ^= nums[i];
        }
        return xor;
    }
}
```

# 9. Toggle bits in given range
<p style="color: #800080"><b>Given a non-negative number N and two values L and R, toggle the bits in the range L to R in the binary representation of N, i.e, to toggle bits from the rightmost Lth bit to the rightmost Rth bit.</b></p>

The problem is asking for toggling the bits (forget about the range now!). Which logical operation can help us in toggling :thinking:? Yes, the **XOR** operation!!! Let's see how, if we XOR 1 with 1, we will get 0, and if we XOR 0 with 1, we get 1. See, toggle happens 😄.

Thus, we can solve this problem by **XORing** the number `N` with a `mask` having `R` bits and only set bits are present in the range `L` to `R`. We can get such `mask` by using the following expression `mask = ((1 << R) - 1) ^ ((1 << (L - 1)) - 1)`.

```java
public class ToggleBitsInRange {

    public int toggleBits(int N, int L, int R) {
        int mask = ((1 << R) - 1) ^ ((1 << (L - 1)) - 1);
        return N ^ mask;
    }
}
```

# 10. Rotate Bits
<p style="color: #800080"><b>Given an integer N and an integer D, rotate the binary representation of the integer N by D digits to the left as well as right and print the results in decimal values after each of the rotation. Note: Integer N is stored using 16 bits. i.e. 12 will be stored as 0000.....001100.</b></p>

In `N << D`, last `D` bits are zero, to put first `D` bits at the end for rotation, we will **OR** with `N >> (16 - D).` Vice versa is true for right shift.

```java
public class RotateBits {

    public List<Integer> rotate(int N, int D) {
        // Reduce D to its effective value for a 16 bit number
        D %= 16;
        // This list will store the left and right rotations of N by D
        List<Integer> output = new ArrayList<>();
        // Left rotation
        int left = (N << D | N >> (16 - D)) & 0xFFFF;
        // Right rotation
        int right = ((N >> D | N << (16 - D))) & 0xFFFF;
        output.add(left);
        output.add(right);
        return output;
    }
}
```

# Conclusion
In this post, we looked at some common problems that can be solved using simple tricks with the bits. 

I hope you enjoyed this post. Feel free to share your thoughts on this.

You can find the complete source code on my [GitHub](https://github.com/ani03sha/RedQuarkTutorials/tree/master/ProblemSolving/src/main/java/org/redquark/tutorials/problemsolving/bitmagic) repository. If you like what you learned, feel free to fork 🔪 and star ⭐ it.

Till next time… Happy coding 😄 and Namaste :pray:!
