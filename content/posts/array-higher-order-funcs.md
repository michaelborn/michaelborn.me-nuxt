+++
date = '2019-05-07T16:13:57-04:00'
tags = [ 'coldfusion', 'cfml', 'lucee', 'lambdas' ]
draft = false
title = "Using ArraySome and ArrayEvery Higher-Order Functions in Lucee"
+++

In this post I'm going to take two *Lucee only* higher-order array functions, `arraySome()` and `arrayEvery()`, and explain their use and purpose. I'll also review the concept of a higher-order function, as well as the Super Cool (yet very little used) lambda expression available in Lucee 5.

## What Is a Higher-Order Function?

According to [Wikipedia](https://en.wikipedia.org/wiki/Higher-order_function), higher-order functions are functions that either 1. take a function as an argument or 2. return a function as a result. These two functions we'll be looking at, `arraySome()` and `arrayEvery()`, are just two of many "Higher order functions" defined in Coldfusion. Some other examples of higher-order functions in CF are `arrayMap()`, `listEach()` or `structFilter()`, all of which take a piece of data along with a function and apply the function to each data item in some way.

Now that we understand the concept a little, let's dig in to `arraySome()` and `arrayEvery()`!

## ArraySome

`arraySome()` executes a given function upon every element in a given array. If the function ever returns `true`, then `arraySome()` itself will return `true` - making this function great for conditionals.

Here's a quick example:

```js
var checkBadWord = function(badWord) {
    return form.comments CONTAINS badWord
};
var isVulgar = arraySome(allBadWords, checkBadWord);
```

This example runs the `checkBadWord` function upon every item in the `allBadWords` array. Then the submitted `comments` field posted from a comment form gets checked for the presence of the bad word, and if any are found the `isVulgar` variable is set to true.

For a full reference, go check out [CFDocs.org/arraysome](https://cfdocs.org/arraysome).

## ArrayEvery

Much like `arraySome()`, this `arrayEvery()` function is great for conditionals because it evaluates to a boolean - it iterates upon the provided array, executes the given function, and returns `true` if *all* iterations (closure executions) returned true.

Here's a real-world example of how you might use `arrayEvery()` to parse contact information:

```js
var contacts = [
    { name: "Michael", email: "info@test.com" },
    { name: "Travis", email: "xyz" },
];
var isValidEmail = function( contact ) {
    return isValid("email",contact.email);
}
if ( arrayEvery(contacts, isValidEmail) ) {
    // SEND EMAIL
}
```

This shows us how we can use `arrayEvery()` to confirm that *all* items in an array have a valid email address before we go blindly sending emails to those addresses.

## Lambda Expressions

Now that you know how these work, let's take another look at that code snippet and see if we can clean it up a little.

```js
var isValidEmail = function( contact ) {
    return isValid("email",contact.email);
}
if ( arrayEvery(contacts, isValidEmail) ) {
    // SEND EMAIL
}
```

As you can see, there's a decent bit of overhead with the function definition and so forth. This is the perfect case for a [lambda expression](https://docs.lucee.org/guides/lucee-5/lambda.html), introduced in Lucee 5. Lambda expressions offer a much shorter way to write functions, and are especially useful for functional programming. Let's see an example.

```js
if ( arrayEvery(contacts, (contact) => isValid("email",contact.email) ) ) {
    // SEND EMAIL
}
```

There - using lambda expressions is a much cleaner, shorter way to write the closure.

## Wrap Up

There you have it - a brief overview of higher-order functions, how to use `arraySome()` and `arrayEvery()`, and even how to use lambda expressions to streamline the code examples. Any questions? Feel free to[ contact me](https://michaelborn.me)!