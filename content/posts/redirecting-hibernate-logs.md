---
date: '2021-08-30T16:13:57-04:00'
tags: [ 'cfml', 'coldfusion', 'hibernate', 'log4j' ]
draft: false
title: 'Redirecting Hibernate Logs to the CommandBox Console'
---

In my last blog post, I covered [how to adjust the Hibernate log level with Log4j](hibernate-logger-concurrent-exception.md).

This helped us avoid a concurrent modification exception due to logging certain database entities with the `DEBUG` logger, but it also sets us up for further interaction with log4j configuration. This week we're going a step farther to take all log4j messages emitted by the HIbernate logger and redirect them to the console. This console is what is shown when you run `box server log --follow` in CommandBox.

> _Not sure what Log4j is? [Tweet at me](https://twitter.com/michaelborn_me) and I'll happily cover basic Log4j usage in a blog post._

To begin, we need a Log4j "Logger" object which we can use to grab the Hibernate logger. 

```js
var Logger = createObject( "java", "org.apache.log4j.Logger" );
var hibernateLog = Logger.getLogger( "org.hibernate" );
```

Our `log` variable now contains a reference to the root hibernate logger. All log messages emitted from any class in Hibernate will pass through this logger.

We can set the logging level - for development, we may want `WARN` or `DEBUG`:

```js
var level = createObject( "java", "org.apache.log4j.Level" );
hibernateLog.setLevel( level.DEBUG );
```

_**Note:** Be aware that the `DEBUG` log level may cause issues on entity save - see [Resolving Concurrent Exceptions in Hibernate Logger](https://michaelborn.me/entry/resolving-concurrent-exceptions-in-hibernate-logger)._

Now that we have the logger we can reuse one of Lucee's existing log4j appenders to configure log output. This is basically piggybacking on Lucee to pass all `org.hibernate` logs through the "console" appender to `System.Out`.

```js
var printWriter = getPageContext().getConfig().getOutWriter();
var layout = createObject( "java", "lucee.commons.io.log.log4j.layout.ClassicLayout");
var consoleAppender = createObject( "java", "lucee.commons.io.log.log4j.appender.ConsoleAppender" ).init( printWriter, layout );
```

Then finally, we can tell log4j to use Lucee's console appender for all Hibernate logs:

```js
hibernateLog.addAppender( consoleAppender );
```

Put it all together, and here's what you get:

```js
public function setHibernateLogging(){
  /**
   * Resolves Hibernate ConcurrentModificationException when flushing an entity save with one-to-many relationships.
   * 
   * @see https://access.redhat.com/solutions/29774
   * @see https://michaelborn.me/entry/resolving-concurrent-exceptions-in-hibernate-logger
   */
  var Logger = createObject( "java", "org.apache.log4j.Logger" );
  var level = createObject( "java", "org.apache.log4j.Level" );
  var hibernateLog = Logger.getLogger( "org.hibernate" );
  hibernateLog.setLevel( level.WARN );

  /**
   * Redirect all Hibernate logs to system.out
   */
  if ( listFindNoCase( "Lucee", server.coldfusion.productname ) ) {
    var printWriter = getPageContext().getConfig().getOutWriter();
    var layout = createObject( "java", "lucee.commons.io.log.log4j.layout.ClassicLayout");
    var consoleAppender = createObject( "java", "lucee.commons.io.log.log4j.appender.ConsoleAppender" ).init( printWriter, layout );
    hibernateLog.addAppender( consoleAppender );
  }
}
```

This method should be placed in `Application.cfc` early in the application lifecycle. If this method is run during the page request or in `onRequestStart()`, then Hibernate has already initialized and you have lost a lot of valuable output.

Once this method is in place, we can take advantage of it from CommandBox:

```js
box server log --follow
```

This is fantastically great for picking up better log details on, say, an invalid ORM entity.
