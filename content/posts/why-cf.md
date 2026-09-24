---
date: '2019-03-20T16:13:57-04:00'
tags: [ 'coldfusion', 'cfml', 'beginners' ]
draft: false
title: "Why I Program in Coldfusion"
---

I get asked this a bunch. _Why are you programming in Coldfusion, anyway?_ Isn't Coldfusion [_dead_](https://mrphilmunro.wordpress.com/2014/05/05/is-coldfusion-dead/)? Isn't it _closed-source_? Isn't it _expensive_?

1. Nope, Coldfusion is [not](https://blog.reybango.com/2006/10/26/is-coldfusion-really-dead/) [dead](https://wris.com/blog/2018/04/04/coldfusion-is-not-dead).
2. Nope, I use and prefer [Lucee, the open-source Coldfusion engine](https://lucee.org/).
3. Nope, not expensive. (See above.) Lucee is free! (as in beer.)

In two words, I use Coldfusion because it is Easy, and it is Powerful.

## What is Coldfusion?

What the heck _is_ Coldfusion, anyway? Coldfusion is a programming language which runs on the Java Virtual Machine (JVM), which means that it compiles to Java and can run anywhere Java can. (Windows, Mac, and Linux.) Coldfusion is cool because it has many high-level tools baked in which make it *super* easy to get stuff done. You can index and search documents or web pages, create spreadsheets and PDFs, connect to a server via IMAP or POP or FTP or LDAP - there's just a TON baked right into the language with zero library or extension headaches to install.

When most folks think of Coldfusion, they think of the version they used in '05 with `<cfdiv>` and `<cftable>` and all that good stuff. Be serious. That legacy junk has been frowned upon for a long time. The real Coldfusion is a JS-like syntax with full object-oriented functionality coming straight from Java - `final` and `static` functions, accessors, etc - and functional programming features such as threading, async and locking. To me, that's what Coldfusion really is.

## Coldfusion is Super Easy

Can anyone tell me what this is?

```js
var ducks = [{name: "Donald"},{name: "Daffy"}];
var names = [];
for( var duck in ducks ) {
    names.append( duck.name );
}
```

Nope, not Javascript - that's Coldfusion's script syntax. If you're familiar with JS you should be able to pick up Coldfusion no problem.

There's also a totally different syntax which closely mirrors the HTML markup style. For devs who know HTML but don't know JS (likely a shrinking crowd), you have at least the option of getting started with that markup syntax. This alone makes it very easy for new devs to get started with CF - Hamilton College mentioned this psychology of onboarding new devs, and it evidently worked - the new college website [won a Webby award last year](https://www.rasia.io/blog/case-study-hamilton-college.html).

## Coldfusion is Super Powerful

I built a website for a painter several years ago using PHP and Bolt CMS. One additional request the client had was to embed a watermark into every image served on the website. Try as I might, I could not get this done within the client's minimal budget - PHP's image processing functionality is somewhat minimal without addon extensions such as GD.

In CF, there is a single function which allows this: `imagePaste()`. Take a watermark image and paste it onto a second image, in the upper left corner. Write the image to a file. Done.

```js
var watermark = imageRead( "images/myBrand.jpg" );
var thePhoto = imageRead( "images/upload.jpg" );
imagePaste( thePhoto, watermark, 0, 0);
imageWrite( thePhoto, "images/final/upload.jpg" );
```

This is nothing mind-blowing - it's merely straightforward code supported natively by Coldfusion with no need for external libraries.

Here's how you do an HTTP call in Coldfusion.

```js
cfhttp( url="https://api.chucknorris.io/jokes/random" ) {}
```

One line of code. Uno. That's it. The JSON is stored in `cfhttp.fileContent`. There's no additional libraries needed - no jQuery, no Axios, and no weird function names (_cough [`file_get_contents()`](https://stackoverflow.com/questions/959063/how-to-send-a-get-request-from-php_).

Not convinced? Take a look at this. In Coldfusion, sending emails is a single function.

```js
cfmail( to="me@example.com", from="test@you.com", subject="This is an email" ) {
    writeOutput('Hello from your website!');
}
```

ONE LINE. (plus email body.) Need to add an attachment? That's two lines. 


```js
cfmail( to="me@example.com", from="test@you.com", subject="Daily Report" ) {
    cfmailparam( file="/assets/generated/report.pdf" );
}
```

Just for comparison, [here's how you send an email in PHP](https://www.tutdepot.com/php-e-mail-attachment-script/). Look, I'm not here to bash PHP. Much. 😄 I get that it does a lot of things well, once you drop in your library of choice. My point is that CF has no need for third-party libraries in most cases.

## Why Not Coldfusion?

Coldfusion is not “just another” programming language - it is a simple, super-powerful one with familiar syntax, great Java integration and easy straightforward configuration. Why CF? Well... why not?
