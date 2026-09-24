+++
date = '2021-08-19T16:13:57-04:00'
tags = [ 'cfml', 'coldfusion', 'hibernate', 'orm' ]
draft = false
title = 'Resolving Concurrent Exceptions in Hibernate Logger'
+++

Recently while working on a Hibernate ORM project, I ran into an interesting issue when an entity with relationships is saved inside a transaction.

```
    transaction{
      var myEntity = entityLoadByPK( "Person", theEntityID );
    
      myEntity.setAddress( otherEntity );
      myEntity.save();
    
      // throws "ConcurrentModificationException" on transaction end.
    }
```

_Note this is not a complete test case - simply an example of when the issue occurs._

When the transaction completes, Lucee tries to flush the entity modifications, but this fails with the following error:

```
    lucee.runtime.exp.NativeException: java.util.ConcurrentModificationException
    at java.base/java.util.HashMap$HashIterator.nextNode(HashMap.java:1493)
    at java.base/java.util.HashMap$EntryIterator.next(HashMap.java:1526)
    at java.base/java.util.HashMap$EntryIterator.next(HashMap.java:1524)
    at org.hibernate.internal.util.EntityPrinter.toString(EntityPrinter.java:112)
    at org.hibernate.event.internal.AbstractFlushingEventListener.logFlushResults(AbstractFlushingEventListener.java:128)
    at org.hibernate.event.internal.AbstractFlushingEventListener.flushEverythingToExecutions(AbstractFlushingEventListener.java:104)
    at org.hibernate.event.internal.DefaultFlushEventListener.onFlush(DefaultFlushEventListener.java:39)
    at org.hibernate.event.service.internal.EventListenerGroupImpl.fireEventOnEachListener(EventListenerGroupImpl.java:93)
    at org.hibernate.internal.SessionImpl.doFlush(SessionImpl.java:1362)
    at org.hibernate.internal.SessionImpl.flush(SessionImpl.java:1349)
    at org.lucee.extension.orm.hibernate.HibernateORMTransaction.end(HibernateORMTransaction.java:57)
    at lucee.runtime.orm.ORMConnection.setAutoCommit(ORMConnection.java:213)
    at lucee.runtime.orm.ORMDatasourceConnection.setAutoCommit(ORMDatasourceConnection.java:336)
    at lucee.runtime.db.DatasourceManagerImpl.end(DatasourceManagerImpl.java:350)
    at lucee.runtime.db.DatasourceManagerImpl.end(DatasourceManagerImpl.java:330)
    at lucee.runtime.tag.Transaction.doFinally(Transaction.java:160)
```

It turns out this issue is related to the Hibernate debug logger. In Lucee, Hibernate's log4j logger is set to a `DEBUG` level by default. That's fine, but it seems the logger actually _mutates_ the logged entities during logging. Thus we get a concurrent modification exception.

To resolve this, all we have to do is de-escalate the logging level from `DEBUG` to `WARN`.

```
    /**
     * Resolves Hibernate ConcurrentModificationException when flushing an entity save with one-to-many relationships.
     * 
     * @see https://access.redhat.com/solutions/29774
     */
    var Logger = createObject( "java", "org.apache.log4j.Logger" );
    var level = createObject( "java", "org.apache.log4j.Level" );
    var log = Logger.getLogger( "org.hibernate" );
    log.setLevel( level.WARN );
```

This should be done in the `Application.cfc` before ORM initializes - say, just below the `this.ormSettings{}` configuration block.

All thanks to [@jclausen](https://twitter.com/jclausen) for this awesome find and easy fix!