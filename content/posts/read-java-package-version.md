---
date: '2022-09-21T16:13:57-04:00'
tags: [ 'cfml', 'coldfusion', 'java' ]
draft: false
title: 'How to Get the Version of Any Java Package from CFML'
---

The [Apache POI library](https://poi.apache.org/) is an awesome tool for messing with spreadsheets. You can read spreadsheet data, get header rows, total row count, all sorts of wacky stuff. Julian Halliwell's excellent [spreadsheet-cfml library](https://github.com/cfsimplicity/spreadsheet-cfml) uses it to great effect.

But when I try to use Apache POI standalone, I got an error that a method didn't exist:

```bash
No matching Method/Function for org.apache.poi.hssf.usermodel.HSSFSheet.getTables() found
```

It would seem that Lucee bundles an older version of Apache POI by default. (UPDATE: [Turns out this is only present due to the Apache Tika bundle, which _is_ shipped with Lucee. Thanks Julian Halliwell for that tip!](https://twitter.com/cfsimplicity/status/1572226273870778376)

But what version would that be?

We could easily find out from the Lucee admin page, of course. Provided it is enabled.

But why not try to grab the POI bundle version in code? From our CFML?

## Reading a Java Package Version in Lucee

It all starts with the java class:


```js
createObject( "java", "org.apache.poi.hssf.usermodel.HSSFSheet" )
```

We then grab the java classloader tied to this class:

```js
createObject( "java", "org.apache.poi.hssf.usermodel.HSSFSheet" )
                        .getClass()
                        .getClassLoader()
```

Once we have that, we need to grab the OSGI bundle:

```js
createObject( "java", "org.apache.poi.hssf.usermodel.HSSFSheet" )
                        .getClass()
                        .getClassLoader()
                        .getBundle()
```

And finally, grab the version as a string:

```js
var version = createObject( "java", "org.apache.poi.hssf.usermodel.HSSFSheet" )
                        .getClass()
                        .getClassLoader()
                        .getBundle()
                        .getVersion()
                        .toString()
```

Voila! We have our package version! It seems Lucee ships with Apache POI 2.5.1, released in November 2005. _**Wow**_.

### UPDATE: Using Lucee's BundleInfo() method

Julian Halliwell (author of the awesome Spreadsheet CFML library) pointed out that Lucee has a `bundleInfo()` function which does the same thing:

> Great post! Lucee has a BundleInfo() BIF which also returns other useful info. - _Julian Halliwell, @cfsimplicity_

Using bundleInfo() would look something like this:

```js
var version = createObject( "java", "org.apache.logging.log4j.LogManager" ) ).version;
```

Honestly, this is much nicer than my implemen

## Reading a Java Package Version from Adobe ColdFusion

However, in Adobe CF (ACF) this fails because ACF does not architecture packages via OSGI. (Not to my knowledge, that is.) We need to find another method… and it turns out reading package details is even simpler in Adobe.

First, we instantiate the Java Package library:

```js
createObject( "java", "java.lang.Package" );
```

From there, we get the Apache POI package:

```js
createObject( "java", "java.lang.Package" )
            .getPackage( "org.apache.poi" );
```

Once we have the POI package, we can grab the implementation version:

```js
var version = createObject( "java", "java.lang.Package" )
                    .getPackage( "org.apache.poi" )
                    .getImplementationVersion();
```

And that’s it!

## A Cross-Engine Solution

Sadly, neither of these solutions work in both Lucee and Adobe ColdFusion due to the differences in Java package bundling approaches between the two engines.

The best we can get would be something like this:

```js
/**
 * Grab installed version of the bundled Apache POI library.
 */
public string function getApachePOIVersion(){
    if ( server.system.keyExists( "lucee" ) ){
        createObject( "java", "org.apache.poi.hssf.usermodel.HSSFSheet" )
            .getClass()
            .getClassLoader()
            .getBundle()
            .getVersion()
            .toString()
    } else {
        return createObject( "java", "java.lang.Package" )
                            .getPackage( "org.apache.poi" )
                            .getImplementationVersion();
    }
}
```

Sadly, I see little hope for a cross-engine solution that works _generically_ on package names. In Adobe you can grab the package version by package name… but in Lucee you must search for a specific package class.

## The POI Version Class

Caveat: Apache POI ships with a “Version” class in versions 3.x. So my example is a bit pointless for Apache POI v3 and newer. If you’re on ACF 10+, you can use the provided Version class to grab the version - no Java Package gymnastics required:

```js
    createObject( "java", "org.apache.poi.Version" ).getVersion()
```

That’s not the point of this blog post, though. This post aims to assist you in reading the installed version of **any Java package** - not just those with a handy `my.package.Version` class.

Till next time!
