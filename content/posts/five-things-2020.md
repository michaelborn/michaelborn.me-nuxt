+++
date = '2020-01-13T16:13:57-04:00'
tags = [ '2020', 'cfml', 'coldfusion', 'contentbox' ]
draft = false
title = "Five Things I'd Like To Learn in 2020"
+++

## One: How to Debug Slow Execution Times In FusionReactor

I know what [Fusion Reactor](https://www.fusion-reactor.com) is, and I know what it does. I even know a little how it works and how to look at a slow-running request.

What I **don't** know is how to make it useful after that.

FR is really good at breaking down a request, method by method, to show you exactly how long each method call took. What I can't figure out is _exactly what those breakdowns mean_. You know, the important part of debugging.

![FR profiler page showing the request exection breakdown](https://thepracticaldev.s3.amazonaws.com/i/6tu7ttg0qwjs850hno89.jpg)

So until I learn how to read the above breakdown, I'm only half a debugger.

## Two: The Basics of ContentBox

[ContentBox](https://contentboxcms.org/) is awesome! I think...

See, I know nothing about it. I've tried spinning it up once just for kicks, and immediately got confused with `install contentbox-site` - like, shouldn't this actually create a working ContentBox site? You'd think so, from the name. But nope - you need to install the installer before you can install the site. Or something.

Regardless, I _love_ that we have a decent option for a CFML-powered Content Management System.

![The ContentBox CMS admin looks pretty clean and, you know, useful!](https://thepracticaldev.s3.amazonaws.com/i/1irmzeexvhcvif5983w5.png)

I'd be happy to start developing new sites on ContentBox this year, if only I knew how to use it. The more devs and sites use ContentBox, obviously, the more love and attention ContentBox will get. If nothing else, this year I'd like to put some new site on ContentBox, learn it enough to operate and build the site, and submit a few PRs for documentation typos... one thing I'm good at!

## Three: How to Configure WireBox for Vanilla CF Apps

WireBox is awesome. It powers dependency injection in ColdBox and makes it simple to instantiate a component on the fly, or share a singleton across multiple uses per request.

WireBox can also be used standalone to add dependency injection (DI) to a legacy app. In my (uneducated) opinion, this is the best first step towards modernizing your legacy / spaghetti code. Once you have DI set up it becomes easier to rename, refactor, or reorganize your app to fit an MVC framework (such as ColdBox) or simply to make improvements.

Right now, I only know how to use WireBox within the context of ColdBox. This year I'd love to dig deep into WireBox and figure out **how** it works and how to configure it for a vanilla CF app. If I knew that I could teach it to others.

## Four: CB Streams

This one's kinda, you know... deep. Like, intellectually deep, and I confess I have no idea how to use it. I know what cbStreams **is** and I know vaguely what it's supposed to **do**:

> The whole idea of streams is to enable functional-style operations on streams of elements. A stream is an abstraction, it’s not a data structure. It’s not a collection where you can store elements. The most important difference between a stream and a structure is that a stream doesn’t hold the data. For example you cannot point to a location in the stream where a certain element exists. You can only specify the functions that operate on that data. A stream is an abstraction of a non-mutable collection of functions applied in some order to the data.
> 
> _quote from the [cbStreams README](https://forgebox.io/view/cbstreams)_

What I _think_ this means, in a nutshell, is that cbStreams helps you efficiently manipulate large amounts of data in a concise, easy syntax.

To me, that sounds like a useful tool to know!

## Five: Ant and Maven Build Tools

I know Ant and Maven are not strictly CF-specific tools. Regardless, the [Lucee core](https://github.com/lucee/lucee), [Lucee extensions](https://github.com/lucee?utf8=%E2%9C%93&q=extension&type=&language=), and many open-source CFML libraries use Ant or Maven (or both!?) for building their source code.

This is important to me because I'd like to contribute to the Lucee platform. Yet without knowing how to build and run the tests, I won't be able to do that.

And no, only knowing how to `ant build fast` or something is not good enough. Ideally I should know:

1.  What ant and maven do
2.  What the difference is between the two
3.  How to run tasks
4.  How to define extra tasks (e.g. for adding a test step or build step)
5.  How to debug a failed build.

## Conclusion

2020 is going to be an awesome year. I've listed out five CF-related tools I'd _ideally_ like to learn this year - what about you?