+++
date = '2019-03-28T16:13:57-04:00'
tags = [ 'coldfusion', 'cfml', 'beginners', 'commandbox' ]
draft = false
title = "Five Reasons to Learn CF in 2019"
+++

Now that you've read my [Why Coldfusion?](https://dev.to/mikeborn/why-cf-3jal) post (you HAVE, right?), let's do a simple Hello World just to try some sample CF code.

## Installing Commandbox

Installing Coldfusion is as easy as downloading [Commandbox](https://www.ortussolutions.com/products/commandbox#download) and dropping it in a folder. On Linux, you'll want to drop it in a folder somewhere in your `$PATH` - perhaps `/usr/bin`? Otherwise (Windows or Mac) just drop it in a folder and drag the box executable to your taskbar to give yourself a nice quick launcher icon.

## Hello World

Let's do a quick Hello World so we know what we're up against.

1. Create a `hello.cfm` file. Somewhere. (_Anywhere!_)
2. Edit that `hello.cfm`.
3. Type in the following code:

```html
<cfscript>
    writeOutput( 'Hello, World!' );
</cfscript>
```

Ok, so this is the gist of a modern Coldfusion markup (`.cfm`) file. This file is doing two things:

1. Using `<cfscript></cfscript>` to denote the Coldfusion script syntax

This is just CF's version of PHP's `<?php ... ?>` delimiters. Now, there is a fully-supported, fully-capable tag syntax, but I prefer the script syntax for pretty much everything but templating. I think on the whole, modern CF apps are better off using CFscript syntax - but that's just my opinion. Oh, and you only need this `<cfscript>` tag in `.cfm` files - anything in a component (a `.cfc` file)can launch right into script syntax.

1. Using the `writeOutput()` function to print a string value to the buffer

This is hopefully straightforward - we're writing output to the buffer. In this example, we're going to use CommandBox to run the file, so the output will be returned inline to the CommandBox CLI.

## Executing a CFM File in CommandBox

Here's how we run our `hello.cfm` file using CommandBox. First, you'll need to start Commandbox by clicking on the launcher or typing `box` in your Mac/Linux terminal. Once in CommandBox, we'll use the `execute` command to run the script and return the output:

```bash
execute hello.cfm
```

Boom! It's that easy to try Coldfusion*. There's no compiling, no building, and no downloading hundreds (or thousands) of dependencies - just run the script.

If you want to see exactly what that looks like, here you go.

![](https://thepracticaldev.s3.amazonaws.com/i/2zm6zixvxryjkxn9rai6.png)

_*Please note that this is not a production-ready format - for that you'd want to run `server start engine=lucee@5.2` to install and start the open-source Lucee server. Let me know if you'd like to see a tutorial about that as well - I'm happy to help you get started!_