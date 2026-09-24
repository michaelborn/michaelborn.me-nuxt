+++
date = '2019-07-15T16:13:57-04:00'
tags = [ 'coldfusion', 'lucee', 'cfml', 'jdbc' ]
draft = false
title = "Creating an MS Access Lucee Extension"
+++

I turned a simple task (migrate data from an MS Access database) into a Lucee extension which wraps the UCanAccess JDBC driver.

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Querying an Access File from CFML](#querying-an-access-file-from-cfml)
- [JDBC Is Awesome!](#jdbc-is-awesome)
- [Why A Lucee Extension?](#why-a-lucee-extension)
- [Creating the Lucee Extension](#creating-the-lucee-extension)
- [Packaging a Lucee Extension with CommandBox and ForgeBox](#packaging-a-lucee-extension-with-commandbox-and-forgebox)
- [Using the UCanAccess Lucee Extension](#using-the-ucanaccess-lucee-extension)
- [Connecting To MS Access the Hard Way](#connecting-to-ms-access-the-hard-way)
- [Conclusion](#conclusion)

## Querying an Access File from CFML

At work last week, I had need to migrate data from a Microsoft Access database file (ugh!) to a more "desireable" platform. I haven't used Microsoft Access since I was in high school, and since I don't even have Microsoft Office installed on my development machine I needed a way to connect to this database from CFML.

A few Google searches led me to [UCanAccess](http://ucanaccess.sourceforge.net/site.html), a JDBC driver for Microsoft Access built on [Jackcess](https://jackcess.sourceforge.io/). The documentation was easy enough to follow, though I confused myself with the wrong jar's class path, and soon I had a working connection to the database file.

## JDBC Is Awesome!

Turns out JDBC is pretty awesome! I think it's cool that I can run standard ANSI SQL (some of which Access doesn't natively support) on a proprietary database file for a Microsoft program which _isn't even installed on my system_. And all of it is the **exact same developer experience** as if I was using MySQL or MSSQL. (Minus perhaps a performance hit.)

But I digress. After I was done with the data import, I decided to wrap up the UCanAccess jars into a Lucee extension. Why?

## Why A Lucee Extension?

It's pretty simple: Lucee extensions allow you to add new CFML features, administrator UI, or java libraries in an easy plug-and-play process. No more downloading `.zip` files or copying `.jar` files into your codebase. A Lucee extension is an **especially** easy setup in the case of a JDBC driver, because all we need to do is deliver a handful of jars to the Lucee engine and instruct Lucee to recognize them collectively as a JDBC driver.

## Creating the Lucee Extension

I started by downloading Julian Halliwell's [`lucee-mariadb`](https://github.com/cfsimplicity/lucee-mariadb) extension as a base. (Thanks, Julian!) After some adjustments, my repository looked like this:

* `extension/` - Houses the Lucee extension source code.
* `box.json` - Places the extension on Forgebox.io and defines scripts for building and releasing the extension to Forgebox.
* `buildExtension.cfc` - Generates a new .zip and .lex file whenever the extension version changes in `box.json`.
* `README.md` - Proper documentation is essential!

The contents of the `extension/` folder look like this:

* `context/`
  * `admin/`
    * `dbdriver/`
      * `UCanAccess.cfc` - Adds ability for admin users to create a UCanAccess datasource in the Lucee Admin.
* `jars/` - house any jar files which need to be loaded into Lucee.
* `META-INF/`
  * `logo.png` - The logo is shown when browsing extensions in the Lucee Admin.
  * `MANIFEST.MF` - Manifest file defines Lucee extension configuration.

I modified the `MANIFEST.MF` file to specify the extension name and a few JDBC settings. I followed the ["Extensions in Lucee 5"](https://docs.lucee.org/guides/lucee-5/extensions.html) documentation on this, which was a huge help all throughout this process.

```
Manifest-Version: 1.0
Built-Date: 2019-07-11 09:00:00
version: "0.0.1"
id: "007CA05C-E789-4769-A8B8C266E5675F7A"
name: "UCanAccess"
description: "JDBC Driver for the MS Access database."
category: "Datasource"
lucee-core-version: "5.0.0.019"
start-bundles: false
jdbc: "[{'label':'UCanAccess','id':'ucanaccess','connectionString':'jdbc:ucanaccess:///{file}','class':'net.ucanaccess.jdbc.UcanaccessDriver'}]"
```

Next I placed the UCanAccess `.jar` file and its four dependency jars in the `jar/` folder.

Next I renamed the `context/admin/dbdriver/MariaDB.cfc` file to `UCanAccess.cfc` and modified it to replace any mention of MariaDB with UCanAccess. I'm not even certain what this file is for, but I think it's probably configuring the extension as a "proper" JDBC driver and adding the ability to create a UCanAccess datasource from the Lucee admin UI.

_**Note:** I haven't tested this datasource UI yet. I've got a feeling I'll need to update my `UCanAccess.cfc` dbdriver file to replace the MariaDB connection properties with [UCanAccess connection properties](http://ucanaccess.sourceforge.net/site.html#examples). Makes sense, I just haven't gotten there yet._

At this point, the extension was "done". Simply creating a zip file of the `extension` folder and uploading it into the Lucee Admin is all that is needed to install the extension. We could also create a `.zip` file, change the file extension to `.lex`, and drop it in the Lucee context's `deploy/` folder

## Packaging a Lucee Extension with CommandBox and ForgeBox

The tricky part of creating this extension was packaging it. I created a CommandBox task named `buildExtension.cfc` which creates the `.zip` and `.lex` files for Lucee consumption and commits the files to the repository.

```js
component {

    function run() {
        generateZips();
        commitUpdates()
    }

    function generateZips() {
        cfzip( action="zip", source="extension", file="lucee-ucanaccess.zip", overwrite="true" ) {}
        cfzip( action="zip", source="extension", file="lucee-ucanaccess.lex", overwrite="true" ) {}

        print.line( "Generated lucee-ucanaccess.zip and lucee-ucanaccess.lex" );
    }

    function commitUpdates(){
        var gitStatus = command( '!git' )
            .params( 'status' )
            .run( returnOutput=true );
        
        // git add will error (thus halting the release) if these files are unchanged.
        // So only proceed if `git status` says there are changed files. :)
        if ( gitStatus DOES NOT CONTAIN "lucee-ucanaccess" ) {
            print.redLine( "Nothing new to release" );
            return;
        }

        command( '!git' )
            .params( 'add lucee-ucanaccess.*' )
            .run();

        command( '!git' )
            .params( 'add lucee-ucanaccess.zip' )
            .run();
        
        command( '!git' )
            .params( 'commit -m "Add new release .lex and .zip"' )
            .run();
        
        print.greenLine( "New release with .lex and .zip" );
    }
}
```

I tested that the task works by running `task run buildExtension` from CommandBox. Once I had that working, I added the following `scripts` to my `box.json`:

```js
"scripts":{
    "postVersion":"package set location='https://bitbucket.org/michaelborn_me/ucanaccess/src/v`package version`/lucee-ucanaccess.zip'",
    "onRelease":"task run buildExtension && publish",
    "postPublish":"!git push --follow-tags"
}
```

Aside: I acquired these package scripts from Brad Wood after he mentioned them in the [CFML slack](http://cfml-slack.herokuapp.com/). (_Reason #999 for following Brad Wood very closely in Slack..._) They're also documented in the [CommandBox Package Scripts](https://commandbox.ortusbooks.com/package-management/package-scripts). I include some variant of these scripts in every package I write, because they make publishing new Forgebox releases super easy and consistent.

These scripts automate the Forgebox release process by using the `package version` or `bump` commands in CommandBox. I can run `bump --major`, `bump --minor`, `bump --patch`, or even `package version 0.7.2` in CommandBox and CommandBox will:

1. create and commit a git tag referencing the new version number
2. run my `postVersion` script to set the download URL
3. run my `onRelease` script to 
   1. compress the `extension/` folder into installable `.zip` and `.lex` files, and
   2. publish the new release
4. push up any code changes, including my new git tag version number.

Just like that, I ran `bump --minor` and my new Lucee Extension zoomed off to ForgeBox!

## Using the UCanAccess Lucee Extension

Three easy steps to installing the extension:

1. Add a new Extension Provider in your Lucee Server admin pointing to `https://forgebox.io`
2. Find the "UCanAccess" extension in the "Not installed" section
3. Click the extension and click "Install"

I've admitted earlier in this blog post that I haven't tested datasource creation from the Lucee Admin yet. Until I get that working, the easiest way to create a UCanAccess datasource is manually in your `Application.cfc`:

```js
msAccessDB = {
   class: "net.ucanaccess.jdbc.UcanaccessDriver",
   connectionString: "jdbc:ucanaccess://C:\Users\me\my\FILENAME.accdb"
};
```

Once you do that, you should be able to use the datasource to connect to an MS Access database file and run queries:

```js
var query = queryExecute( "SELECT COUNT(*) FROM pages", {}, { datasource: "msAccessDB" } );
```

And just like that, you are benefiting from the power of JDBC and Lucee Extensions. (And UCanAccess. And Jackcess. And myself, of course!)

## Connecting To MS Access the Hard Way

If you want to ignore all my hard work and do this the **hard way** (perhaps you are on Adobe ColdFusion?), you can follow this process to connect to an MS Access database:

1. Download and extract [the UCanAccess .zip file](https://sourceforge.net/projects/ucanaccess/files/latest/download)
2. Navigate to `UCanAccess-{version}.bin/`, and copy these five `.jar` files to your project `lib/` folder:
   1. `ucanaccess-{version}.jar`
   2. `lib/commons-lang-{version}.jar`
   3. `lib/commons-logging-{version}.jar`
   4. `lib/hsqldb.jar`
   5. `lib/jackcess-2.1.11.jar`
3. In `Application.cfc`, set `this.javaSettings.loadPaths = [ "./lib/" ];` to instruct Lucee or ACF to load up the jar files
4. In `Application.cfc` (Lucee) or the Adobe CF Administrator, add a datasource with the following two properties:
   1. References the class path as `net.ucanaccess.jdbc.UcanaccessDriver`
   2. Set a connection string starting with `jdbc:ucanaccess://` and ending with the full path to your MS Access database file.

Now be warned, I'm not certain this works at all in Adobe CF. It has been a few years since I've use the ACF Admin to create a datasource, and it _may not_ support custom JDBC connection strings and class paths - I don't know! Feel free to educate me on this - I'll happily update this blog article.

In Lucee you can drop a datasource struct into your `Application.cfc` which looks like this:

```js
msAccessDB = {
   class: "net.ucanaccess.jdbc.UcanaccessDriver",
   connectionString: "jdbc:ucanaccess://C:\Users\me\my\FILENAME.accdb"
};
```

## Conclusion

* Java libraries are awesome, and being able to use them from CFML is awesome.
* Big shoutout to UCanAccess and Jackcess.
* Lucee Extensions are actually pretty easy, at least for packaging jars.

Thanks for reading!