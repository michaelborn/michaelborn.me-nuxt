---
date: '2019-06-28T16:13:57-04:00'
tags: [ 'coldfusion', 'cfml', 'cfscript' ]
draft: false
title: "CFScript Gotchas and Syntax Guides"
---

Now, script syntax is *usually* straightforward, but as with any language, sometimes it's easy to get confused over certain things in script syntax. In this post I'll cover a quick list of common "gotchas" in CFScript, document the proper syntax for each, and finally link to a list of CFScript guides which may help you start writing CFScript today.

## Common "Gotchas" in CFScript

* Too many pound signs
* Missing semicolons
* New operators
* Assignment instead of equality operator
* Strict equality operator

### Too Many Pound Signs

Don't do this:

```js
if ( #isBroken# ) {
    writeOutput( "Hello #name#!" );
    writeOutput( #age# );
}
```

Why not? Because the pound signs are only necessary within strings. I suppose the correct term is "string evaluation", because your variable needs to be evaluated and the contents placed within the string.

Here's the proper syntax for that above example:

```js
if ( isBroken ) {
    writeOutput( "Hello #name#!" );
    writeOutput( age );
}
```

For a more detailed writeup, check out Mark Kruger's ["Bamboozled by Pound Sign Decisions"](https://www.coldfusionmuse.com/index.cfm/2011/2/10/when.do.i.use.pound.signs) blog post.

### Missing Semicolons

This is a fairly easy one. Semicolons are used to terminate a CFScript statement, and are **required** in ACF up to CF2016. Semicolons are optional now in CF2018, as well as Lucee. So if you get a cryptic _"Invalid construct. on line x"_ error, you may want to check your semicolons!

### New Operators

If you're using CFML's JS-like syntax, you should use the new JS-like operators as well, no? This is a matter of preference, but I feel that these operators are more "standard" in all languages and a consistent, improved experience for CF devs.

* Instead of `NOT`, use `!`
* Instead of `EQ`, use `==`
* Instead of `NEQ`, use `!=`
* Instead of `GT`, use `>`
* Instead of `LT`, use `<`
* Instead of `GTE`, use `>=`
* Instead of `LTE`, use `<=`
* Instead of `OR`, use `||`
* Instead of `AND`, use `&&`

Older tag-based operators:

```js
if ( NOT json.success OR arrayLen(validation.errors) GT 0 ) {
    // do something
}
```

Newer, JS-like operators:

```js
if ( !json.success || arrayLen(validation.errors) > 0 ) {
    // do something
}
```

PS. `ArrayLen()` always returns a non-negative integer. There's really no need to check that it's greater than zero, because [any non-zero integer will evaluate to true in CFML. Whereas zero always evaluates to false](https://www.coldfusionmuse.com/index.cfm/2010/2/5/Booleans.and.Coldfusion). So you can shrink that conditional further like so:

```js
if ( !json.success || arrayLen(validation.errors) ) {
    // do something
}
```

## Using the Assignment Operator Instead of Equality Operator

I feel like this is a rite of passage for all developers. If you accidentally use the assignment operator (`=`) instead of the equality operator (`==`) in a conditional, you will get some very interesting results.

For example, this code will always print `True!` in Lucee. 

```js
if ( a = 1 ) {
  writeOutput("True!");
} else {
  writeOutput("False!");
}
```

That is a tough bug to find, because it _looks_ right upon first scan. So be intentional about how you write your conditionals!

## Strict Equality Operator

This is almost trick question - there **is** no "strict equality" operator in CFML!

So don't do this, because it just won't work:

```js
if ( myVar === "theValue" ) {
    // do something
}
```

If you must enforce a type, use `isValid()`.

## CFScript Syntax Guides

I thought I'd put together a quick (non-exhaustive) list of CFScript syntax guides that may help folks on their journey to modern CF. You may want to bookmark a few of these, like Tony Junkes' comparison of tag and script syntax, as well as Ortus' "100 Minutes" full-on CFScript guide, and finally a cheat sheet by Pete Freitag. As you can see, there is a **lot** of CFScript documentation out there.

* [CFML Tag to Script Conversions](https://github.com/tonyjunkes/cfml-tags-to-cfscript) by Tony Junkes
* [CFScript Cheat Sheet](https://www.petefreitag.com/cheatsheets/coldfusion/cfscript/) by [Pete Freitag](https://www.petefreitag.com)
* [Learn Modern CFML in 100 Minutes](https://modern-cfml.ortusbooks.com/) by the [Ortus Solutions](https://cfdocs.org)
* [CFScript Syntax Guide](https://cfdocs.org/script) on [CFDocs.org](https://cfdocs.org)
* [Guide to CFScript](https://github.com/adamcameron/cfscript/blob/master/cfscript.md) by Adam Cameron
* [CFScript Usage](https://helpx.adobe.com/coldfusion/cfml-reference/coldfusion-tags/tags-r-s/cfscript.html) by Adobe
* [Using CFScript Statements](https://helpx.adobe.com/coldfusion/developing-applications/the-cfml-programming-language/extending-coldfusion-pages-with-cfml-scripting/using-cfscript-statements.html), also by Adobe
* [The CFScript Language](https://helpx.adobe.com/coldfusion/developing-applications/the-cfml-programming-language/extending-coldfusion-pages-with-cfml-scripting/the-cfscript-language.html), yet _another_ Adobe CFScript guide

Hope this helps - thank you for reading!
