---
title: 'Caching'
date: 2022-11-05 22:08:00
category: 'Design'
draft: true
---

Hello fellow developers :wave:! Caching is one of the most important concept in designing large scale systems. 

> <div style="color: #A020F0;"><b>Caching helps applications perform dramatically faster at a significantly low costs.</b></div>

How can we do that, you ask! In this post, we will explore the fundamentals of caching, why do we need caching, its types and other fundamentals. So, grab a cup of coffee :coffee: and ready to learn about caching.

# What is Caching?
In simple words, caching is the process of storing results of a computation temporarily for future use. This is done so that the next time if our application is instructed to do the same computation, instead of doing computation, the application can directly return the stored result from the cache. This makes our application respond faster.

More formally, caching is the process of storing copies of files or data in a temporary storage so that they can be accessed more quickly.

The storage location where files or data is stored temporarily is called **Cache**. A cache is high speed data storage layer which stores the subset of data, typically transient in nature.

# How Caching works?
It only makes sense if cache responds quickly. If a request takes same or more time while accessing the data from cache as it takes while accessing the same data from the permanent storage, then why do we need cache in the first place?

Therefore, it makes sense for cache to be a fast access hardware such as RAM or application's own memory. A cache's primary aim is to increase the data retrieval performance by reducing the need to access the underlying slower storage layer such as a database.

Please note that a cache generally stores data transiently, which is a trade-off for speed. This is in contrast to the databases whose data is usually complete and durable.

Whenever someone (a software application, for example) requests a data, it is first searched in a cache. If found, the value is returned. This event is called a **cache hit**. If the data is not found (this event is called **cache miss**), we get it from our database, store it in the cache and then returned.

This does not mean that we can store unlimited data in the cache. The reason is that fast memory is expensive and volatile. Therefore, we can only store a finite amount of data in the cache which is specified by its capacity. If the cache is full, we have to evict something from the cache and store the new data in place of it. There are many ways upon which cache eviction depends such as **Least Recently Used (LRU)**, **Least Frequently Used (LFU)**, **First In First Out (FIFO)**, etc. We will discuss some of these strategies in detail in later articles.

# Why Caching is important?
Because it increases the speed of data retrieval, duh. Who on this sweet earth doesn't want that :smile:? 

Every developer takes pride in deploying performant versions of their applications. And users... oh, they just love speed. 

Ask yourself, do we love to sit and wait for a webpage to load in a minute? No, of course not! We go berserk if a website takes even ten seconds to load.

Caching also decreases load on the server. Since most of the times, we get our required data from the cache and we don't have to go to the server/database, it reduces significant load on them. This reduces cost of our infrastructure. In fact, when dealing with cloud platforms or public API providers, for example, it is common to bill for any network communication between their services. Thus, caching also save a shit ton of money.

# Challenges in Caching
Caching is not a simple practice which means there are inevitable challenges in this subject. Let's see them one by one -

## Coherence problem
Whenever data is cached, a copy of it is created in the cache. Since there are two copies of the same data (one in database and other in cache), they tend to diverge over time (go out of sync with each other). This is called the **coherence problem** and it is one of the biggest challenge while caching data.

There is no fixed solution to this type of problem and the best approach depends on the requirement of the application. Deleting stale data from the cache and updating it with the latest data is called **cache invalidation** and identifying the best cache invalidation method is one of the trickiest problems to solve.

## What to cache?
Theoretically, any data can be cached which presents us with the endless possibilities of what to include and what to exclude. While caching, there are some aspects to take into account.
- Don't cache data which changes very often for longer periods. If we do that, we pose our application to the risk of providing stale data to the users. This also depends on how much time we can tolerate stale data.
- Cache data which is used frequently and which takes large time to be computed or retrieved. Identifying this data is not an easy task and if done incorrectly, we may end up filling our cache with useless data.
- We should reserve the fixed memory for caching otherwise, we may fill up more than expected memory with cache. This can pose serious problem if our RAM is shared between our application and cache.

## Cache misses
Cache miss is an event where frequent data is requested and not found in the cache. While retrieving data, we first check in cache and if found, we return it from the cache else we fetch it from the database or server. Checking for data in cache has a time-based cost and if there are many cache misses, our caching system can turn into nothing more than overhead.

# Types of Caching
Although caching is a general concept, there are a few types that are more popular from the rest. In this section, we will learn about types of cache.

## 1. In-Memory Caching
In this approach, cached data is directly stored in RAM which is typically faster (higher IOPS = input/output operations per second) than the permanent storage such as a database. Most common way to cache data in-memory is using **key-value** pairs such as a Hash Table. Here, key is a unique value and value is the cached data. In a normal request-response mode, a key can be the request and the value cab be the computed/retrieved response.

When the request is made, it will be checked in the hash table as a key and if found, the associated value would be returned else we get the data from the database and store it in the cache before returning to the user.

## 2. Database Caching
Although each database usually comes with some level of caching, we can leverage [ORM (Object Relational Mapping)](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) to cache the results of last executed or frequently executed queries. This avoids executing queries again on the database layer which can provide us with the massive speed jump. ORM technologies use the same key-value pair approach as we discussed in the in-memory caching.

## 3. Web Caching
It is of two types -

### 3.1 Web Client Caching
The cache happens on the web browser thus it is also called **Web Browser Caching**. It is very simple - the first time the browser loads a page, it stores the page resources such as text, images, stylesheets (CSS), scripts (JS), media files, etc. When next time the same page is hit, the browser can look in the cache and deliver the page from there itself. This is way faster than having to download them from the server over the network.

### 3.2 Web Server Caching
In this type of caching, the resources are saved on the server-side aiming for the reuse of the resources for dynamic content. Web server caching is not suitable for the static content. It reduces the overloading of the server, reduces the work, and increases the speed of page delivery.

## 4. Content Delivery Network (CDN) Caching
Here, we cache web content on the proxy servers. It is a system of gateways between the users and the origin server, storing its resources. When the user requests a resource, a proxy server intercepts it and checks to see if it has a copy. If so, the resource is immediately delivered to the user; otherwise, the request is forwarded to the origin server. 

These proxy servers are placed in a vast number of locations worldwide, and user requests are dynamically routed to the nearest one. Thus, they are expected to be closer to end-users than origin servers, which implies a reduction in network latency. Plus, it also reduces the number of requests made to origin servers.

## 5. Distributed Cache
The cache is broken up using a consistent hashing algorithm and each node of the cache server holds some of the cache. We can determine the server to get the cache from by using the hashing function. Consistent hashing itself deserves a post of its own and we will discuss this in a later post.

# Cache Invalidation
It means when the data present in the cache becomes invalid, or stale. This data cannot be served to the application users as it has become outdated. To get the latest data in the cache, we have to remove the stale data from the cache, get it from the database and store the latest data in the cache. There are three systems of caching - 

## 1. Write through cache
The writes go through cache and if writes to ***both*** cache and database succeed, then only the database write is considered as a success. What is the benefit of this? It provides the full data consistency and nothing gets lost in case of a crash, power failure or other system disturbances. What is the downside? Higher latency as writes are happening at two places - cache and database.

## 2. Write around cache
The write operation bypasses the cache and is directly done on the database. This decreases latency in write operations. But in case of read operation, in cache miss event, the data is read from the database which increases the read latency.

## 3. Write back cache
The write is done directly to the cache and once successful, the write is verified. The cache then writes data to the database asynchronously. The benefit is that we get high write throughput but the downside is that in case of any failure, the chances of losing data increase significantly. We can mitigate this though by having redundancy or replica of caches.

# Conclusion
In this post, we looked at what caching is and how it can help us in improving the performances of our application. We also looked at the potential threats that may be inc in our application by virtue of wrong implementation of caching. It is not easy to implement a proper caching mechanism and this subject requires deep understanding of the use case and experience. Due to this case, it is not enough to know only one type of caching and mastering multiple caching types should be our mission to become a better developer.

I hope you enjoyed this post. I would love to hear your thoughts on this and would like to have suggestions from you to make it better. In next posts, we will look into some types of caches in detail with their implementations.

Till next time, Namaste :pray:!