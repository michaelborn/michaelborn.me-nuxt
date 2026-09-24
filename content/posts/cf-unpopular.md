---
date: '2019-05-23T16:13:57-04:00'
tags: [ 'coldfusion', 'cfml', 'legacy' ]
draft: false
title: "Yes, ColdFusion is 'Unpopular'. No, I don't care."
---

It’s popular to hate on CF. It’s popular to say ColdFusion is "dying". It’s popular to call CF a "legacy" language, and compare it to COBOL. But is ColdFusion _really_ unpopular? And, more important… *does it matter*?

I think most devs in the ColdFusion space know how popular it is these days to slam ColdFusion - specifically, CF's unpopularity itself. Recently, we even got a fun reference in a [CommitStrip comic](http://www.commitstrip.com/en/2018/12/13/its-basically-the-same-thing/):

![ColdFusion meme from CommitStrip](https://thepracticaldev.s3.amazonaws.com/i/6df1vl4bqxnkez3d3umw.jpg)

The point of the comic is to poke a little fun at CF - and that's fine! But it did get me thinking about the pervasive "unpopularity" of ColdFusion / CFML. So here’s why I don’t care whether ColdFusion is unpopular or not.

## One: All Languages Fluctuate (thus all languages are "unpopular" at times)

Two examples of fluctuation in the "popularity" of programming languages - whether real or perceived.

1. Ruby - no, really!
2. HTML - Turns out Google Trends is a stupid way to measure language popularity

### Ruby Is Not Dead

Remember that thing called Ruby? You know, the scripting language powering Kickstarter, Soundcloud, Basecamp and Etsy? Apparently these days it's cool to say that ["Ruby is dead"](https://www.google.com/search?q=ruby+is+dead). Compared to the current rising star (once Ruby, now Node), all code is "unpopular". Take a gander at [this worthless article by TechRepublic](https://www.techrepublic.com/article/the-death-of-ruby-developers-should-learn-these-languages-instead/), citing the "Death of Ruby":

> Ruby's popularity has dropped in the workplace and in coding bootcamps, while leaders question the open source programming language's staying power. 

There it is again - popularity, that moronic metric only useful in blog posts and line graphs. The article gains some sanity when it quotes David Robinson, data scientist from Stack Overflow, with this piece of wisdom:

> "Languages almost never die," Robinson said. "People build a lot of useful infrastructure in them, and those can last for decades beyond when they're essential parts of the ecosystem. It's not a question of alive or dead, but a question of growing or shrinking."

So nice of TechRepublic to admit that the entire premise of their "The Death of Ruby?" article is flawed. This is yet another click-hungry blog article with little experience and fewer facts citing the premature death of a language.

### HTML Is Not Dead

Hear me out here - *of course* HTML is not dead, right? Right?

I had some interesting feedback on my [Five Reasons to Learn CF in 2019](https://michaelborn.me/entry/five-reasons-to-learn-cf-in-2019) post from a developer who told me:

> "I see a [definite pattern in how many people search for ColdFusion](https://trends.google.com/trends/explore?date=all&geo=US&q=coldfusion). How would you interpret that graph?"

For reference, here is that [Google Trends graph of "ColdFusion" searches from 2004-present](https://trends.google.com/trends/explore?date=all&geo=US&q=coldfusion) which he was referring to:

![Google Trends for ColdFusion, 2004-present shows a steadily declining search popularity](https://thepracticaldev.s3.amazonaws.com/i/r6vvladlj2a7p6q7lft7.png)

My response was to link to the same [Google Trends graph for HTML](https://trends.google.com/trends/explore?date=all&geo=US&q=html) over the same time period.

![Google Trends for HTML, 2004-present shows a steadily declining search popularity, very similar to ColdFusion](https://thepracticaldev.s3.amazonaws.com/i/5mlh5wwytsug8bejok7p.png)

So let me ask you - is HTML dead? ;)

Or is it simply that popularity is a nonsensical metric (Seriously, do Google searches count for *anything*?) to "rate" a programming language? We're talking about programming languages, not TV personalities!

## Two: ColdFusion is Running the World

Whilst y'all dimwits call us unpopular, we're busy running the world - from health and banking to government and Telco companies. [Adobe's Evangelism Kit](https://www.adobe.com/content/dam/acom/en/products/coldfusion/pdfs/cf2018/CF%202018%20Evangelist%20Kit.pdf) points out that ColdFusion is utilized by over 70% of the Fortune 100. I agree that statistic should be taken with a grain of salt - after all, it is likely that many of those companies do not use ColdFusion as their main bread-and-butter tool, and may well consider their ColdFusion apps as legacy. But the kit also points out that 70% of Adobe ColdFusion customers are still building new apps with CF - meaning that *they still consider the platform viable for future expansion*. These are not take-your-funding-and-die-in-three-years startups, they're not Mom and Pop ecommerce websites, they are the largest companies in the world building new applications with CFML. Eat that. :)

## Three: ColdFusion is too Current to be Unpopular

Many "Is ColdFusion Dead?" devolve into "ColdFusion is dead like COBOL"-type arguments. (If you really wish to see this sort of rhetoric, you can find several such comparisons in [this Adobe Forum post](https://forums.adobe.com/thread/1441981), of all places.)

This doesn't hold up for the simple reason that dying languages aren't kept up to date! Check out the [list of COBOL releases on Wikipedia](https://en.wikipedia.org/wiki/COBOL#History_and_specification) - frankly, only two major versions released since 80's spells obvious doom for the COBOL ecosystem.

Contrast this with Adobe ColdFusion, with four major releases since 2012, or Lucee, with one major release and four minor releases since 2015. I mean, seriously - [check out this list of tags on the Lucee Docker image](https://hub.docker.com/r/lucee/lucee/tags). This is *not* how dead languages work!

## Four: "Popular" Does Not Mean "Useful"

Popularity is not the end goal. I'll say it again: _popularity is not the end goal_! If your language of choice has a scheduled release every two years and hundreds of thousands of active developers, it won't matter one bit unless that language is useful. Node.js, as a language, is almost worthless without its immense open-source ecosystem. You won't find any real-world applications running on Node without the use of dozens or hundreds of npm libraries simply because *Node is not useful in and of itself*.

That's not a bad thing! Node is an excellent language to learn, and is very powerful thanks to its immense popularity and large package ecosystem - but just remember that without the ecosystem, Node as a language would be a footnote in the annals of history.

My point concerning CFML, and Lucee specifically, is that fast, easy jvm languages will *always* be useful and relevant. When you can build a form, process the form and send an email in an hour (and all without leaving CFML), you have an advantage which is simply hard to find elsewhere. I'm not sure an hour would be enough time for me to [choose an npm package](https://teamtreehouse.com/library/how-to-find-and-choose-packages) if I was using Node! 😉

## Conclusion

I'm done caring about "popularity". Unless the market ceases to care about fast, stable, powerful languages, CF can only go up from here.
