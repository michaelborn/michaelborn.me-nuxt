---
date: '2019-06-03T16:13:57-04:00'
tags: [ 'coldfusion', 'cfml', 'legacy' ]
draft: false
title: "CF: A Legacy of Legacy"
---

I've seen a lot of discussions revolving around ColdFusion and whether it is inherently a "legacy" language. There are dozens of blog posts proclaiming the death of the language, and every comment seems to share a story about just how "legacy" CF is. Today, I'd like to look closely at _why_ so many dare to call us a legacy language, and what we can do about that.

## The Definition

Let me back up and explain what I mean when I say legacy. [Wikipedia](https://en.wikipedia.org/wiki/Legacy_code) tells us that legacy code is _"source code that relates to a no-longer supported or manufactured operating system or other computer technology."_ Michael Feathers, in his book [Working Effectively with Legacy Code](https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052/ref=sr_1_2), defines legacy code as _code without tests_. Ouch.

Personally, I think "legacy" means any application which is aging due to poor structure, poor practices or poor coding. In my mind, any use of `cfdiv`, `cftable`, `cfform`, `cfcalendar`, or other funky UI-based tags is a big no-no. Many of these are unsupported in Lucee (for good reason), and are difficult to extend, customize or rebuild.

## The Naysayers

If you don't mind, allow me to share a few glorious remarks about ColdFusion and legacy practices. Please have some ice water ready. :)

> I am collaborating with a company right now that absolutely refuses to leave CF, they've got a lot invested, but I think it says a lot about language when its existence is largely based on and centered around legacy and maintenance instead of innovation and truly making things easier on the developer.
> There is a reason why devs are leaving CF.

_[From "Is ColdFusion Dead?" on Reddit/r/coldfusion](https://www.reddit.com/r/coldfusion/comments/3aec4z/is_coldfusion_dead_serious_question_with_some/)_

Note the dearth of facts here - this remark has more opinion than a [Rotten Tomatoes review](https://www.rottentomatoes.com/m/national_treasure/reviews/), but it seems to be based on **something**. Take a look at this next quote containing some tangible criticism:

> CF applications tend to have been written by newcomers to programming who had no formal training in programming and little experience or knowledge of modern programming.  Do not consider a career in maintaining legacy CF applications unless you enjoy maintaining ill-designed spaghetti code.

_[From "Why learning ColdFusion today is a waste of time"](https://2018.ar.al/1864/)_

The reasoning here goes: All CF apps are written poorly. Thus you should never write a CF app.

## The Perception

Nevermind that these articles or comments are old - in some cases, over a decade old. Nevermind that they tend to avoid hard facts. The sad reality is that a _perception_ exists, and despite my [prevous blog post title](https://michaelborn.me/entry/yes-coldfusion-is-unpopular-no-i-dont-care), I **do care** about that perception.

Most naysayers are reacting to what they perceieve of CFML as an "XML language" which intermingles business logic and HTML. If you can find a "moral of the story" in those comments, it is that **poor programming practices create legacy applications**.

_Who knew, right?!_

## The Legacy

Although it is dumb to blame the faults of the programmers on the language, we do need to recognize that much of that legacy CF **still exists**. Yes, that "awful" CF code an intern wrote 15 years ago may be running perfectly fine in its original state. That is both awesome and horrific. That should scare us - just because CF can run forever with no maintenance doesn't mean it _should_.

It's not a secret that we are a minority language. Most agencies or organizations writing CFML at some point seem to fall into bad practices, building their technical debt without even realizing it, and architecting (if that word even applies) monolithic applications with no MVC framework, dependency injection or even version control. This is what developers are rejecting, and they are fair to do so **if** that is what it means to write CFML. We as a whole, as a community, need to step away from these failings and strive towards Modern CF. (And by "Modern CF" I mean pretty much anything Ortus is doing.)

Many legacy CF apps run for decades with little or no maintainance, further damaging the codebase and making it harder to upgrade the server or CF instance. In other cases well-meaning but inexperienced developers are tasked with learning CFML and maintaining the company's bread-winner CF application... or porting it to another platform entirely.

## The Comfort Zone

Too long have we wallowed in our comfort zones, content to produce the same old code with the same old vulnerabilities and the same old flaws. We need to move away from legacy practices and modernize like our lives depend on it. The theme for [IntoTheBox 2019](https://www.intothebox.org/) was "Modernize or Die", and it is indeed appropriate. It's time to embrace cfscript, open source, MVC, CI, CD, serverless, and testing.

**We have a legacy of legacy**, and until we get past that we will _never_ get past that.

I've been incredibly pro-CFML in my last blog posts, and I **always** will be. Like any language, CF is awesome _provided certain (modern) practices are followed_. But I'm not stupid - legacy CF apps need serious help.

## The Plan

This is a hard road for some. You may be holding the bag after a decade of, ahem less than exemplary work by your peers or predecessors. Man, I don't envy you - but I will help you however I can, and right now that seems to be through my blogging.

Several weeks ago I received a Twitter DM from a fellow (we'll call him Jack) asking if I could put together a few modern CFML code examples. Jack specifically wanted help with modern script and crud functionality, and told me _"Even though I’ve been doing this a long time I feel I’m going in the wrong direction with legacy coding ways"_. He's hoping I can put together a few blog posts, example applications, or anything that will help him and others modernize their CF coding practices.

So today I'm starting a new blog series. I'll be releasing a blog post every month covering Modern CF - starting with cfscript. If you want to influence the topics I'll be covering, go ahead and fill out my [Modern CFML survey](https://s.surveyplanet.com/0xPrWC-BN).

There is light at the end of the tunnel - far more, in fact, than most realize. Still, it will be a long time before that legacy perception of CF goes away - if it ever does.

Thanks for reading, and happy CF-ing!
