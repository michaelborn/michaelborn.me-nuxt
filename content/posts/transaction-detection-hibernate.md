---
date: '2021-08-12T16:13:57-04:00'
tags: [ 'cfml', 'coldfusion', 'hibernate', 'orm' ]
draft: false
title: 'Cross-engine transaction detection in Hibernate v3+'
---

### UPDATE: Now with Adobe support!

So, this is embarrassing. This article _claimed_ to offer a one-liner with Adobe and Lucee compatibility, but I completely neglected to actually _test_ it on ACF before I wrote the blog post. (I thought I'd tested it... evidently not.) I realized this a week after attempting to use my "cross-compatible" transaction detection code that **it's not cross-compatible at all!**

Bottom line: I updated the article with a properly-tested, fully cross-engine-compatible snippet to detect transactional context **on both Adobe CF and Lucee**. You're welcome.

-----

We do a lot of ORM work at Ortus, and recently I have been on a bit of a Hibernate binge. One of the important things to note when working with Hibernate is that ORM queries may behave differently _inside_ a transaction block than they do _outside_ a transaction block. More importantly, the transactional handling in, say, Lucee 5.3 begins to break down when working with nested transactions.

I digress, but let's just say it's important to know when the current code is inside a transaction context.

Previously, the best knowledge we had said to run this on Adobe:

```js
    // ADOBE ONLY!
    var isInTransaction = createObject("java", "coldfusion.tagext.sql.TransactionTag").getCurrent()
```

and something like this on Lucee:

```js
    // LUCEE ONLY!
    var isInTransaction = getPageContext().getDataSourceManager().isAutoCommit() ? false : true;
```

But digging through the [Hibernate Session docs](https://docs.jboss.org/hibernate/stable/core/javadocs/org/hibernate/engine/spi/SharedSessionContractImplementor.html#isTransactionInProgress--), I found a wonderful little method called `isTransactionInProgress`. And just like that, here's a CFML method to wrap it and consistently detect the transactional context:

```js
boolean function isInTransaction(){
    if ( listFindNoCase( "Lucee", server.coldfusion.productname ) ) {
        return ORMGetSession().isTransactionInProgress();
    } else {
        return ORMGetSession().getActualSession().isTransactionInProgress();
    }
}
```

That little beauty works

1.  across CFML engines from Lucee to Adobe ColdFusion
2.  across multiple Hibernate versions from v3.x through v5.x

Now, to be fair, I haven't really stress-tested this. It's _possible_ there are a few situations where Hibernate doesn't yet know a transaction has begun. But so far... it works, and works well!

Until next time!
