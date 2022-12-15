---
title: 'Latency, Throughput and Availability'
date: 2022-11-12 19:47:00
category: 'Design'
draft: true
---

Hello fellow developers :wave:! This post is going to be an interesting one as in this post we will be discussing the concepts related to a highly performant and reliable application. We always strive to design applications that are fast and reliable. If your application is slow, no one will want to use it. And if your application is down even for a few minutes, people go nuts and start tweeting about it using hashtags like <b style="color:blue;">#facebookdown</b>, <b style="color:blue;">#instagramdown</b>, and many more.

In order to design applications that are fast and highly available, they should have
- Low latency.
- High throughput
- High availability
- High bandwidth

In this post, we are going to discuss these characteristics in detail. So, let's get started.

# Latency
Let's say your spouse says that there are no groceries in the household and asks you to buy some. You note down the list of groceries to buy, go to the market, purchase those groceries and come back home. The total time taken in this activity (from noting down the list of groceries to bring them home) is called ***latency***.

In computer science, latency is the time delay between a request from a client to the server and the response of the server back to the client. For example, if a request takes 10ms to reach from client machine to server machine, takes 25ms to process the request on the server and takes 8 seconds for response to reach back to the client from the server, the latency of the system would be (10 + 25 + 8)ms = 43ms. Clearly, lower the latency, better the performance.

<br/>
<img src='../media/lta-1.svg' alt='Latency in request response' style="display: block; margin-left: auto; margin-right: auto;">
<br/>

The time frame when request originates from the client to the time when response reaches back to the client is also called the ***round trip time***. In networking, latency is the time taken by a data packet to reach from the source to the destination.

On the first request, the latency is higher due to [DNS Lookup](https://developer.mozilla.org/en-US/docs/Glossary/DNS), [TCP Handshake](https://developer.mozilla.org/en-US/docs/Glossary/TCP_handshake), [TLS Negotiation](https://developer.mozilla.org/en-US/docs/Glossary/TLS). The subsequent requests have lower latency because the connection has already been set up.

## Causes of latency
Can a system have zero latency :thinking:? No, it is not possible because the fastest speed by which a data packet can be transmitted from one point to another is the ***speed of light (3 * 10<sup>8</sup> m/s)***. Unless, we have some fictional revolutionary technology like [Warp Drive from Star Trek](https://memory-alpha.fandom.com/wiki/Warp_drive), breaching this barrier is not possible. Thus, even if the light travels very fast, it ***does*** take some time to reach from point A to point B. And if a packet is transmitted with the speed of light, there will be some non-zero time delay. Thus, zero latency is not possible.

Apart from this, there are other factors that contribute to the latency -

### 1. Transmission medium
It is the physical path between the start point and end point. The type of medium can impact latency, for example, copper based cable networks have higher latency than optical fibers.

### 2. Propagation
More the distance between the start point and end point, more the latency. Sending a packet from New Delhi to Bangalore takes a smaller time than sending a packet from New Delhi to San Francisco.

### 3. Routers
The efficiency in which routers process incoming data has a direct impact on latency. Router to router hops can increase latency.

### 4. Storage delays
If the data requested is stored in a storage device, accessing it from there, processing it adds to the latency.

## Measuring Latency
The common ways to measure latency are discussed below - 

### 1. Ping
The ping command checks the value of latency by just sending four packets of data to the address provided by the user to check the ping and then calculates the total time when the response comes to it, that total time is called latency. Following is the example of ping to the homepage of this website - [https://requark.org](https://requark.org).

```
ping redquark.org

Pinging redquark.org [104.198.14.52] with 32 bytes of data:
Reply from 104.198.14.52: bytes=32 time=201ms TTL=60
Reply from 104.198.14.52: bytes=32 time=202ms TTL=60
Reply from 104.198.14.52: bytes=32 time=201ms TTL=60
Reply from 104.198.14.52: bytes=32 time=244ms TTL=60

Ping statistics for 104.198.14.52:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 201ms, Maximum = 244ms, Average = 212ms
```

### 2. Traceroute
A traceroute provides a graph or map to show how data moves from source to the destination. A traceroute sends Internet Control Message Protocol (ICMP) packets, and every router involved in transferring the data gets these packets. The ICMP packets provide information about whether the routers used in the transmission are able to effectively transfer the data.

This is what traceroute looks like for the homepage of this website - [https://requark.org](https://requark.org).

```
tracert redquark.org

Tracing route to redquark.org [104.198.14.52]
over a maximum of 30 hops:

  1     2 ms     2 ms     1 ms  192.168.1.1
  2    44 ms     3 ms     2 ms  abts-kk-dynamic-001.64.172.122.airtelbroadband.in [122.172.64.1]
  3     5 ms     3 ms     3 ms  125.18.238.133
  4     *       51 ms     *     182.79.198.0
  5    12 ms    11 ms    11 ms  142.250.169.206
  6   505 ms   304 ms   408 ms  52.14.198.104.bc.googleusercontent.com [104.198.14.52]

Trace complete.
```

For Linux or Mac, we need to run `traceroute` instead of `tracert` command.

### 3. MTR (My Traceroute)
My Traceroute (MTR) combines traceroute and ping. In addition to the hops along the network path, MTR shows constantly updating information about the latency and packet loss along the route to the destination. This helps in troubleshooting network issues by allowing you to see what is happening along the path in real-time.

MTR works by discovering the network path similarly to traceroute, and then regularly sending packets to continue collecting information to provide an updated view into the network’s health and speed.

Like traceroute, MTR can use ICMP or UDP for outgoing packets but relies on ICMP for return (Type 11: Time Exceeded) packets. 

We can get the MTR statistics after installing MTR software (compatible to your OS) and passing the hostname for which we wish to measure statistics for.

```python
|-----------------------------------------------------------------------------------------------------|
|                                      WinMTR statistics                                              |
|                       Host                       -   %  | Sent   | Recv | Best | Avrg | Wrst | Last |
|---------------------------------------------------------|--------|------|------|------|------|------|
|                             192.168.1.1          -   0  |  135   |  135 |    2 |    6 |   50 |    2 |
|abts-kk-dynamic-001.64.172.122.airtelbroadband.in -   0  |  135   |  135 |    3 |   12 |  154 |    4 |
|                          125.18.238.133          -   0  |  135   |  135 |    3 |    9 |   65 |    6 |
|                            182.79.198.0          -   79 |   32   |    7 |    0 |   16 |   33 |   13 |
|                         142.250.169.206          -   0  |  135   |  135 |   10 |   16 |  105 |   11 |
|  52.14.198.104.bc.googleusercontent.com          -   0  |  134   |  134 |  209 |  337 |  612 |  362 |
|------------------------------------------------------------------|------|------|------|------|------|
```

## How to reduce latency?
We can adopt various methods to reduce the latency - 

### 1. HTTP/2
HTTP/2 allows parallel transfers and minimizes the round trips from source to the destination. These things contribute in reducing latency.

### 2. Less external requests
Every network call contribute to the latency, therefore, if we reduce the number of network calls, we can reduce latency.

### 3. CDN (Content Delivery Network)
CDNs cache the static content in multiple locations worldwide and reduce the request travel time. Instead of going to the origin server, the response for static content is fetched from the CDN closest to the client.

### 4. Browser Caching
Modern browsers also store data in their local cache. This sufficiently reduces the latency of the application.

### 5. Disk I/O
Disk I/O also contributes to the latency as the conventional storage devices are slow. Therefore, writing/reading to/from the cache provides better performance.

The above are some ways by which we can reduce latency, but there are other ways which involve good application design, better code by which we can reduce latency.

- The main cause of latency is a shitty **:poop:** code. Writing good, performant code can reduce the latency considerably.
- Including parallelism in the application can also reduce latency. We can leverage multithreading for this purpose. But beware, overuse or incorrect of parallelism can adversely impact the application performance.
- Choose asynchronous programming over synchronous programming, if possible.
- Limiting the unbounded queue depths and leveraging backpressure can also help in reducing latency.

# Throughput
If you solve five programming problems in a day then your throughput will be `5 problems per day`. In networking, throughput refers to how much data can be transferred from source to the destination in a given time frame. Generally, throughput is measured in bits per second or data per second.

## Why throughput is important? :thinking:
To understand this, let's introspect. When we load a website on the internet, what are our expectations? We expect our requests are heard and responded to in a timely fashion. Our requests are responded to in the form of data packets and packet arrival to the destination is a key to high-performance service within a network. Sometimes, packets get los which lead to slow and poor or slow network performance.

Measuring throughput is a good way to determine the network speed and troubleshoot problems like packet loss.

## Throughput is not same as Latency :confused: 
There is a common misconception between throughput and latency. Latency refers to the time interval between making the request and beginning to see the response. It is measured in time, for example, the latency of a request can be two seconds, i.e., the time difference between making a request and getting the response is two seconds which includes network delay and processing.

It is a general belief that low latency means high throughput. This is not always true as in network systems, latency increases with increase in throughput. If the throughput is more, then we have more packets on the communication line which will cause more latency. It is also possible to have systems with low throughput and low latency.

Therefore, while designing a system, we choose the best combination of latency and throughput according the system and business requirements.

## What affects throughput?
There are many factors on which throughput of a system depends such as processing power, hardware, network traffic, transmission errors, etc.

### 1. Physical medium
The bandwidth (theoretical capacity) of a medium limits the throughput. For example, a FastEthernet interface provides a theoretical data rate of 100 MB/s. Therefore, no matter how much traffic needs to be sent over that interface, they cannot go over the 100 MB/s data rate. In reality, the practical data rate over such an interface will be about 95% of the theoretical capacity.

### 2. Enforced limitation
Throughput also depends on the the capacity of the ISP provided link. If it's maximum capacity is say 10 MB/s then we cannot send data more than that.

### 3. Network congestion
As a general rule, the more congested a network is, the less throughput that network will have. The experience of 10 cars on a highway is certainly better than 100 cars on that highway.

### 4. Packet loss and errors
If there is a packet loss, then those lost packets will need to be retransmitted which will reduce the average throughput of that network.

### 5. Network protocols
The flow control mechanisms of different network protocols will also affect the average throughput for that network.

## How to optimize throughput?

1. Bandwidth can be increased to provide more throughput especially in cases where the network is overloaded.
2. Bottlenecks in network can be identified and removed. The causes of bottlenecks can be packet loss, errors, congestion, latency, etc.
3. Faulty devices should be fixed and overburdened devices should be upgraded to better hardware.
4. Quality of Service (QoS) can be applied to ensure that critical traffic is unaffected by network congestion. While this will not improve overall throughput on the network, it will ensure good throughput for critical traffic.

# Availability
Availability is a non-functional requirement which defines the percentage of time a system is accessible. For example, if a service is not accessible for 10 minutes in a day then its availability would be calculated as follows - 

```
Total time = 1 day = 24 hours = 1440 minutes
Available time = (1440 - 10) minutes = 1430 minutes
Availability = (1430 / 1440) * 100% = 99.31%
```

In simpler terms - 

```
Availability = (uptime / (uptime + downtime)) * 100%
```

Modern applications require very high availability. One such example is Air Traffic Control system. These days, air travel is so complex and busy, a single error in directing planes can lead to catastrophe. Social media applications like Twitter, Instagram also require very high availability. Imagine how would people react if they are not able to upload their selfies or tweet about their sports team for even one minute a day :smile:.

It is not necessary that all systems require high availability. For example, a service for generating reports once a month does not require high availability.

As all important things in life, availability comes with a price. Thus, we have to decide a trade-off according to our business requirements while ensuring availability for a system.

Availability is also important from the point of view of user experience and satisfaction. Users of a popular application expect it to be accessible all the time and every time they wish to use it. Imagine what would happen to us developers if Stackoverflow is down for even one hour :fearful:!!!

## How availability is measured?
As discussed earlier, availability is the ratio of uptime and sum of uptime and downtime.

```
Availability = (uptime / (uptime + downtime)) * 100%
```

Industrially, it is measured in terms of ***Nines of availability***. In high demand applications, we measure availability in terms of nines rather than percentages. For example, if a system is available 99% of times, then it is said to have **two nines** of availability. If a system is available 99.9% of time, then it is said to have **three nines** of availability.

If a system has **five nines** of availability, then it is said to have ***Gold standard of availability***.

Following table shows the nines and their impact on the availability of a system.

| Availability %       | Downtime/year | Downtime/month | Downtime/week |
|----------------------|---------------|----------------|---------------|
| 90% (one nine)       | 36.53 days    | 72 hours       | 16.8 hours    |
| 99% (two nines)      | 3.65 days     | 7.2 hours      | 1.68 hours    |
| 99.9% (three nines)  | 8.77 hours    | 43.8 minutes   | 10.1 minutes  |
| 99.99% (four nines)  | 52.6 minutes  | 4.32 minutes   | 1.01 minutes  |
| 99.999% (five nines) | 5.25 minutes  | 25.9 seconds   | 6.05 seconds  |
| 99.9999% (six nines) | 31.56 seconds | 2.59 seconds   | 0.6 seconds   |

## What to do to achieve high availability?
The intuitive way to achieve high availability is to avoid ***single point of failure*** from the system. Let's say, you have created a revolutionary social media app and it has become a rage among people. Everyday lots of people are joining your application and they are loving it. You are very happy and proud of your revolutionary idea.

Everything is going great but then one day, your application server succumbs to heavy load and gets down. No one can now access your application and people are frustrated about this situation. Why has it happened, you think. The cause is glaring at you. You kept only one server to handle all the load and once it is down, there is no other server to handle the requests. This is called single point of failure.

How to avoid this situation? Clearly, we can add one or more servers to handle all our requests, therefore, even if one server is down, the other servers can handle the requests. This is called adding redundancy in the system. Since, other servers can handle the requests, your application is not really ***"unavailable"*** and if it is not unavailable, then the availability factor increases.

To distribute requests among servers, we use load balancers but be careful, what if the load balancer itself fails? To avoid this we need to have more than one load balancers in our system.

Single point of failure is not the only challenge in highly available systems. No matter how many servers you add, if the code written is shitty :shit:, the application will fail. Therefore, it is equally important to analyze different components in your application and see where are bottlenecks and how can we remove those. Proper logging and monitoring systems can help in determining the bottlenecks.

# Conclusion
Damn, it was a long post! I hope you are still with me :smiley:. In this post, we learned a lot of theory which might seem boring but very important in building the concepts for designing world class systems.

I would love to hear your thoughts on this and would like to have suggestions from you to make it better. 

Happy coding and Namaste :smile:.