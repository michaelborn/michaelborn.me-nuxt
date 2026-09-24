+++
date = '2019-06-26T16:13:57-04:00'
tags = [ 'coldfusion', 'cfml', 'cfscript' ]
draft = false
title = "Switching from Tag to Script"
+++

# Switching from Tag to Script

Look, I write in CFScript. Most of the CF devs I look up to write in CFScript. But maybe you don't. Here's where I convince you CFScript is worth the jump and, for that matter, just _how_ to "jump" to CFScript.

## Why Switch to CFScript

Why on earth would you want to convert your app to script syntax? I can think of three main reasons:

1. Script syntax is more condensed (shorter) and thus quicker to read and write
2. Most CF open source packages are in script syntax, making it harder to find useful tag syntax snippets
3. Paradigm shift into proper separation of logic and presentation

## Script Syntax is More Condensed

Compare this simple UDF in tag syntax:

```html
<cffunction name="renderView" returnType="void" access="private" hint="Render a CFM template in the views folder.">
    <cfargument name="filename" type="string" required="true" hint="the name of the file to execute with NO .cfm on the end.">
    <cfinclude template="#getViewsFolder() & arguments.filename#.cfm">
</cffunction>
```

vs. script syntax:

```js
/**
 * Render a CFM template in the views folder.
 * @filename the name of the file to execute with NO .cfm on the end.
*/
private void function renderView( required string filename ) {
    include "#getViewsFolder() & arguments.filename#.cfm";
}
```

The difference is clear: Script syntax is shorter, cleaner, and easier to read. I understand there may be a few instances where tag syntax is more clear and explicit, but... well... I can't think of any!

## More Open Source Packages and Snippets in Script Syntax

Besides the syntactical differences, script syntax is preferred by most modern CF devs and open source packages these days. So it'll be harder to pick up a new tool or code snippet if you don't know script syntax or your app is still in tags.

## The Paradigm Shift: Separation of Logic and Presentation

CF has been plagued by a ["legacy of legacy"](https://michaelborn.me/entry/cf-a-legacy-of-legacy), and much of that has to do with embedding queries, business logic, and HTML (presentation) into a single .cfm file. This poor programming practice rests largely on the heads of cowboy coders, but I posit this spaghetti mess is all made possible by the sheer existence of CFML's tag syntax. Because it *looks* like HTML, devs tended to keep their queries, ifs and loops *with* their HTML, and the "pot of leftovers"-like programming paradigm was born.

Today, devs can alter that paradigm by switching to CFScript. Writing in script syntax forces devs to change the way they output HTML. Believe me, one week of this: 

```js
function renderEmail( string args ) {
    writeOutput('
        <html>
        <head>
          <title>#args.title#</title>
        </head>
        <body>
        <ul>
    ');
    for( var person in args.people ) {
        writeOutput('#person.name# did something');
    }
    writeOutput('</ul></body></html>');
}
```
and you will quickly be dumping that HTML into a `.cfm` file and writing this instead:

```js
function renderEmail( string args ) {
    include "views/email.cfm";
}
```

Ta-da! Instantly you have started down the path of proper MVC.

## Converting to Script

So if you want to make "the jump" and convert your existing apps to CFscript, here's what I would do:

1. Don't blindly convert *everything* to script syntax unless you you have a **very** solid test suite in place and you are *willing to break stuff*.
2. Start by converting single functions in your CFCs. Stick a big ole `<cfscript></cfscript>` in there and each time you edit or refactor a function, simply convert it to script syntax and drop it in the script block. You can use cfscript.me for this (see below) or rewrite it by hand.
3. Don't convert your HTML templates to script! Instead, separate the logic out into a separate file (preferably a class) in script syntax. Leave all HTML-generating code (in a `.cfm` file) in tag syntax.
4. Once larger portions of your app have been converted, consider using the [cfscript.me command](https://www.forgebox.io/view/cfscriptme-command) to convert the rest of your app to script syntax.

### CFScript.me

[CFScript.me](http://cfscript.me) is a great tool for manually converting individual files and smaller snippets of code from tag to script syntax.

![Screenshot of cfscript.me website with a block of tag syntax code on the left and generated script syntax on the right](https://thepracticaldev.s3.amazonaws.com/i/k20ucmcqsa2pwqzkm8k5.png)

CFSript.me works well for smaller blocks of code, although it is not feature-complete (has a number of [outstanding issues](https://github.com/foundeo/toscript/issues) with unsupported tag syntax).

### CFScriptMe Command

If you've got a whole project you need to convert to script syntax, I would use the [CFScriptMe](https://www.forgebox.io/view/cfscriptme-command) CLI command . **Please** do not run this without (1) a backup in Git, and (2) a test suite to verify the code actually *works* when you're done. As a third sanity check, use CFLint to lint your script syntax when you are done.

```bash
box install cfscriptme-command
box cfscriptme <path>
```

You can run cfscriptme-command on a single file:

```bash
box cfscriptme cfc/myFile.cfc
```

or on an entire folder:

```bash
box cfscriptme models
```

## Conclusion

You do not **have** to switch to CFScript. But I **highly** recommend it for the reasons outlined in this article. If you need help switching to CFScript, reach out and let me know. If you have other thoughts on this article, there's a comment form at the bottom. Thanks for reading!