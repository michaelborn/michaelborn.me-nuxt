+++
date = '2019-05-07T16:13:57-04:00'
tags = [ 'coldfusion', 'cfml', 'beginners' ]
draft = false
title = "Five Reasons to Learn CF in 2019"
+++

I am happy to present Five Reasons to Learn CF in 2019. I'm trying to be honest here, but you _may_ find some bias because *I love ColdFusion*. There, I confessed. Read on!

## Five Reasons To Learn CFML

1. It's SO EASY to write!!
2. Super powerful - ldap, database, imap, pop, ftp and caching support built-in
3. Great security - from ESAPI support to security dudes like Pete Frietag.
4. Great job market, can command "unicorn" salaries
5. Community is very tight-knit, lots of help from package maintainers

## CF is So Easy To Write

If you take only one sentence away from this article, let it be this: You can build applications faster (and with fewer defects) in Coldfusion than any other language. You simply won't find an easier language to program in. (And please don't reply "Python" because I will shoot right back: "Whitespace!") Coldfusion has been designed around the [Rapid Application Development](https://airbrake.io/blog/sdlc/rapid-application-development) methodology, and should fit in well with any team looking for rapid, iterative development. (Agile, anyone?)

But lest any think I bluff, here's why I think CF is so easy to write:

### Why is CF So Easy to Write?

1. CF has two familiar syntaxes - tag and script - both of which should be easy for frontend devs to pick up. These days most modern CFML trends towards the script syntax.
2. No baloney whitespace requirements. Sorry, Python - that makes your code look beautiful, but definitely harder for new devs to pick up.
3. Built-in features, as opposed to poorly-documented, inconsistently designed third-party libraries. I'm not trying to down third-party libraries and frameworks, but I posit that you should absolutely not need to install a library to perform basic language features (such as file manipulation, email, HTTP calls, etc.)

## CF is Super Powerful

CF is so stinkin' useful and feature-packed that after eight years programming in CFML I still come across functionality I never knew existed. There is an abundance of _wow-it-can-do-that?_-type functionality baked in by default, and you can conceivably build startups or small web apps that focus on any of these:

* build CRUD apps
* deliver email newsletters
* import spreadsheets to the database
* write a blog engine
* send web forms to a fillable PDF

I'm going to follow with an excerpt from my [Why CF?](https://michaelborn.me/entry/why-cf) blog post, as just one example of functionality which is so easy in CF and so difficult in other languages:

> I built a website for a painter several years ago using PHP and Bolt CMS. One additional request the client had was to embed a watermark into every image served on the website. Try as I might, I could not get this done within the client's minimal budget - PHP's image processing functionality is somewhat minimal without addon extensions such as `GD`.
> 
> In CF, there is a single function which allows this: `imagePaste()`. Take a watermark image and paste it onto a second image, in the upper left corner. Write the image to a file. Done.
> 
> [MichaelBorn.me/entry/why-cf](https://michaelborn.me/entry/why-cf)

## CF is Super Secure

Why is CF super secure?

1. Built-in XSS sanitization library via OWASP ESAPI
2. Built-in security functions for authentication, hashing and encryption
3. A security-conscious community and industry

ColdFusion is highly secure from XSS vulnerabilities because of the built-in [OWASP ESAPI library](https://www.owasp.org/index.php/Category:OWASP_Enterprise_Security_API). The ESAPI library provides fantastic XSS-safe canonicalization functions such as `encodeForHTMLAttribute()` or simply `canonicalize()`.

A second reason for the great security of CFML is the plethora of built-in authentication functions. You can salt and hash a password in `SHA-512` algorithm with 10,000 iterations with a [single function call](https://cfdocs.org/hash), [encrypt user's email addresses](https://cfdocs.org/encrypt), or build powerful role-based authentication with `cflogin()` and `isUserInRole()`.

Finally, remember that many CF applications are in the government, health or banking industries. This fact alone both proves CF's security prowess *and* pushes CFML security efforts forward. This is the reason we have smart dudes like [Pete Frietag](https://www.petefreitag.com) and [Charlie Arehart](https://www.carehart.org) specializing in Coldfusion security products. You can follow lockdown guides from Pete, Charlie or the Adobe team, purchase a [CF-specific firewall](https://foundeo.com/security/fuseguard/), or use [Fixinator.app](https://fixinator.app) to perform security scans in a CI build to limit the number of security defects released to production.

## The Great CF Job Market

Let's face it: If you can program well in ColdFusion, you are a unicorn in a fairy tale. There are a lot of CF jobs with few developers to go around. Thus, a good ColdFusion developer enjoys good prospects and a high salary. ([Seriously](https://www.ziprecruiter.com/Salaries/Coldfusion-Salary).) I was told recently on Twitter that with correct positioning, I could command a "unicorn salary" in Coldfusion consulting. A quick job search on Monster and Indeed finds multiple good-looking opportunities at a local medical university, among many others. And CF's JVM nature means it is easy to work your way into a similar JVM language, or Java, if you really felt the urge to leave the ecosystem.

## The CF Community

The CF community is, quite frankly, awesome, and it all stems from the [CFML Slack Group](https://cfml.slack.com). Got a syntax question? Ask Slack. Struggling with getting started with the Coldbox framework? Ask Slack. Often questions concerning ORM usage are answered by none other than [John Wish, author of THE book on Coldfusion ORM](https://www.coldfusionormbook.com/). I myself recently asked a question concerning the [CommandBox CLI tool](https://www.ortussolutions.com/products/commandbox), and not only received an answer from [Brad Wood](http://wwvv.codersrevolution.com/), but he also updated CommandBox *within 48 hours* to prevent further such issues in the future. Pretty good customer service for an open-source project. 😉

## Conclusion

I believe that ColdFusion is one of the best programming languages out there, and it is *worth learning today*. Disagree? my [Twitter DMs are open](https://twitter.com/michaelborn_me)! Agree? Share this post. 😄