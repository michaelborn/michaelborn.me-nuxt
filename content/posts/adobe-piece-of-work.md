+++
date = '2019-09-23T16:13:57-04:00'
tags = [ 'cfml', 'coldfusion', 'lucee', 'webdev' ]
draft = false
title = "Adobe, You Piece of Work, I'm Through"
+++

> When in the course of human events it becomes necessary for one [developer] to dissolve the bands which have connected them with [Adobe].

Lest that title and opening surprise or scare you, let me put it simply: I am fed up with Adobe's handling of Adobe ColdFusion. The product stinks (compared to Lucee), the support and marketing stinks, and this recent "bait and switch" pricing tactic is the last straw.

Consider this camel's back broken.

## Terrible Language Support

The first annoyance about Adobe ColdFusion is the poor (excuse me, **terrible**) language support. ACF has been largely outpaced by Lucee in ease of development. Lucee supports datasource structs, lambda expressions, a cleaner and more useful debugger, tag or function defaults, and on and on. Lucee is now the one who defines and expands the boundaries of the language, while Adobe merely plays catchup - or not.

But even if Adobe never improved the language features (and that's not off by much), the product would hold up for a long time with just a little well-managed support. Unfortunately, ACF has had nothing but the worst sort of language support for a long time now. Ask any ACF developer and they'll inform you that Adobe has a long history of ignoring bugs, declining feature requests, or mismanaging tickets in every way possible. Here is just a short sampling I found in the Adobe bugbase:

### fixing tickets without documenting new behavior

> The functionality is fixed, but the docs have not been updated. This needs to be an integral part of any work done to the language.

[ticket CF-3941602](https://tracker.adobe.com/#/view/CF-3941602)

### silently fixing tickets with no further description or notice

> I notice this is marked as fixed now. When can we expect to see this fix?

[ticket CF-3865461](https://tracker.adobe.com/#/view/CF-3865461)

> I notice this is marked as fixed?

[ticket CF-3941602](https://tracker.adobe.com/#/view/CF-3941602)

### refusing to release hotfixes for obvious, blatant regressions

> What is the point of adding an automated update system - with so much fanfare - if you're not going to release bug fixes throughout the year via that channel?

From [ticket CF-3910529](https://tracker.adobe.com/#/view/CF-3910529)

#### refusing to backport bugs to "supported" versions of ColdFusion

> Why is ColdFusion 11 even supported? Why not just mark it as End of Life and kill if off if you are refusing to fix bugs? It seems Adobe has a different definition of "Support" than the rest of the world.

> This is why developers are getting fed up with the product.

From [ticket CF-3952818](https://tracker.adobe.com/#/view/CF-3952818)

## Poor Marketing and Customer Outreach

The second major concern with Adobe ColdFusion is the shoddy marketing job Adobe has done with their own product. It's as if Adobe cares more about milking the money from their existing customers than they are about acquiring new ones.

First, Adobe failed to list the Adobe ColdFusion product in the main menu of the site. This is a small thing (yet so easy to fix), but the many requests on this subject have **never** been addressed by any Adobe employee that I know of.

Second, take a look at the new [Adobe Support Community forum](https://community.adobe.com/). Where is ColdFusion listed? Under the "Print & Publishing" category, of course! WHAT?! This is a clear indication that Adobe does not understand their own product.

Third, any public outcry concerning these items or any others is ignored. I've never seen an official response from Adobe on pretty much anything. 

Check out this little nugget from a [ColdFusion Marketing blog post](https://coldfusion.adobe.com/2016/02/coldfusion-marketing/) by Adobe:

> Customer Outreach – We have been having 1:1 discussion with some of our large customers to let them know about what are the features in the new version of ColdFusion and working with them in case they have any issues.

Aha! This all makes sense now - "large customers" are heard, large customers are informed of upcoming ACF features, and large customers get bug fixes or support. Gee - now what on earth am I [paying **twenty-five hundred dollars** for](https://www.adobe.com/products/coldfusion-standard.html) if not the privilege of Adobe support on Adobe products? This is a slap in the face to every non-large customer who has ever purchased Adobe ColdFusion.

Adobe says they listen to feedback, but their actions seem clear: *You (ColdFusion folks) are not the favorite child, and only favorite children deserve attention*.

You too, Adobe. You too.

## The Last Straw: Alligator Pricing Tactics

It would seem that Adobe is pursuing a place in the dictionary, right under "[Bait and Switch](https://www.google.com/search?q=adobe+bait+switch+coldfusion)". Check this out:

> We were sent a questionnaire earlier this year under the guise of getting a "better deal" for our existing 3 perpetual Enterprise licenses.  As a result of what was clearly a bait and switch tactic, Adobe is now claiming we are in violation of the EULA and requiring us to sign a custom agreement that is increasing our costs nearly 10-fold. If we don’t sign it, they are threatening to sue us for years of back-license fees.  Our solution does not provide coding access or delivery of ColdFusion itself. And it is not ColdFusion server dependent.  (It runs in open source environment like Lucee).  They say that ANY company using CF in any B2B capacity is a service bureau and subject to a custom agreement with annual auditing/repricing, using some arbitrary and unknown formula for determining the cost.  Clearly they are trying to convert their perpetual licensed customers to a special license where they’ll ultimately demand a portion of their revenues.  They are also bypassing their resellers by doing this.  If you have dealt with this I’d like to find out what your resolution was.  If you have not – just wait – they are coming for you.

You can [read the full thread on the Adobe Forum](https://forums.adobe.com/thread/2648828), but this is [not](https://community.adobe.com/t5/ColdFusion/ColdFusion-license-doesn-t-allow-for-SaaS-solution/td-p/10133205#11230719) the [first](https://community.adobe.com/t5/ColdFusion/What-the-heck-is-Adobe-thinking/td-p/8163818) complaint. Adobe has always charged ridiculously high licensing fees _because they can_.

What's more, Adobe won't lower their prices. Ever. When the last CF customer is gone, they will simply fire their ACF employees (you know, _all three_ of them) and focus their awful tactics on wrecking another customer-loved product, like Photoshop. Why? Because there is not a single person in Adobe management who loves ColdFusion. Not a single one who cares. Remember, Adobe did not *create* ColdFusion - they **purchased** it.

Ultimately, this is the reason for ACF's demise and my denouncement in this very blog post. No matter what Adobe did to ColdFusion, if they actually attempted to improve the product, or listen to developers, or design a sane pricing model, or show that they care in any way at all I would still be a fan.

But here I am, because Adobe couldn't care less what their own product is or does. Adobe ColdFusion is dying because Adobe. Period.

## My Response

I'm not just here to rain on the parade! (Sorry for the negativity, though.) I have an Answer - a Cause - and I'm not abandoning CFML. I'm just preferring the open-source, light-weight, so-much-better, listens-to-devs implementation called [Lucee](https://lucee.org/).

Here's what that means:

1. I will assume that **if** there is an official stance of Adobe on any topic, it is directly contrary to the wishes and needs of the ColdFusion community.
2. I refuse to support any version of Adobe in my open source products.
3. I refuse to document ACF "gotchas" when blogging or tweeting about CFML features.
4. I will avoid the term "ColdFusion" in favor of prefer "CFML" going forward.
5. I will take great pleasure in promoting Lucee as a lighter, more secure, and more performant ACF alternative.

PS. The above list only applies to my freelance/open-source work!

## Conclusion

I'm not just annoyed. I'm done. I'm not gonna throw hate at Adobe or any Adobe employee - that's both a waste of time and just not nice, but what I **will** do is prefer Lucee over all things ACF.