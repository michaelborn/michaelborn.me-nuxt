+++
date = '2019-08-14T16:13:57-04:00'
tags = [ 'coldfusion', 'lucee', 'cfml', 'cfscript' ]
draft = false
title = "Form Processing in CFScript Part Three: Sending Email Notifications"
+++

In this series so far, we've looked at how to validate a form entry and how to save that form entry to the database. Today we'll see how we can notify a person (usually a site admin or editor) that a new form entry has been submitted and processed by simply sending an email.

Email works well for form notifications because the entire entry will usually fit in a single email, and replying to an email can send a message to the original user who filled out the form. Contrast that with SMS messages, which are limited in content length and do not support rich formatting or reply-to functionality.

## Sending Emails via Configured SMTP Server

If your web server also has an SMTP server installed (Postfix, anyone?) and configured in your ColdFusion or Lucee administrator, sending the email is as easy as specifying the to address, from address, and subject.

```js
cfmail(
    to="admin@mysite.com",
    from="noreply@mysite.com",
    subject="New form submission from #form.name#"
){
    // email contents go here
}
```

## Sending Emails via Mailgun SMTP

If you don't have an SMTP server installed or configured, you can use the `server`, `port`, `username` and `password` arguments to send via the Mailgun SMTP server, for example.

```js
cfmail(
    to="admin@mysite.com",
    from="noreply@mysite.com",
    subject="New form submission from #form.name#",
    server=server.system.environment.SMTP_HOST,
    port=server.system.environment.SMTP_PORT,
    username=server.system.environment.SMTP_USERNAME,
    password=server.system.environment.SMTP_PASSWORD
){
    // email contents go here
}
```

Here I'm using [environment variables stored in Lucee's `server.system.environment` struct](https://blog.simplicityweb.co.uk/109/lucee-5-simpler-access-to-environment-variables) to send via Mailgun's SMTP server. These environment variables could be set in the `/env/environment` file or your bash profile to look something like this:

```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USERNAME=postmaster@mail.mysite.com
SMTP_PASSWORD=123A923BCB6BGA7B*3
```

The exact functionality depends on your system, but generally these variables will be loaded into your environment on system startup or on profile startup.

## Setting the Email Reply To

Setting the `replyto` email address will let us reply to the user who filled out the form:

```js
cfmail(
    to="admin@mysite.com",
    replyto="#form.email#"
    from="noreply@mysite.com",
    subject="New form submission from #form.name#"
){
    // email contents go here
}
```

This is awesome because it allows admins to quickly respond to the original user. You simply can't do this when delivering via other mediums like SMS or Slack.

## CFMail Body Output

Here's where we output (or *render*) the form submission in the body of the email. This is pretty simple - we use the `writeOutput()` function to output HTML and the form values right in the email body:

```js
cfmail(
    to="admin@mysite.com",
    replyto="#form.email#"
    from="noreply@mysite.com",
    subject="New form submission from #form.name#"
){
    writeOutput("New form submission by #form.name#");
    writeOutput("#form.message#");
}
```

Note that the MIME type of the email will be `text/plain` by default. For rendering HTML in our email we'll need to set the mime type via `type="text/html"` or even just `type="html"`:

```js
cfmail(
    to="admin@mysite.com",
    replyto="#form.email#"
    from="noreply@mysite.com",
    subject="New form submission from #form.name#",
    type="html"
){
    writeOutput("New form submission by #form.name#");
    writeOutput("#form.message#");
}
```

## Avoiding XSS in Emails

Please don't output user-submitted data (form variables) without encoding them! The last thing you want to do is send a spammer's script tag (think `<script src="http://badwebsite.com/js/payload.js"></script>` tag) to your client's email address. That's what you call [Cross-Site-Scripting](https://www.acunetix.com/websitesecurity/cross-site-scripting/), and in CFML it's easy to avoid - just wrap every `#form.field#` with `encodeForHTML()`:

```js
cfmail(
    to="admin@mysite.com",
    replyto="#form.email#"
    from="noreply@mysite.com",
    subject="New form submission from #form.name#"
){
    writeOutput("New form submission by #encodeForHTML( form.name )#");
    writeOutput("#encodeForHTML( form.message )#");
}
```

There are a bunch of `encodeFor*()` functions designed for certain contexts, such as [`encodeForURL()`](https://cfdocs.org/encodeforurl) and [`encodeForHTMLAttribute()`](https://cfdocs.org/encodeforhtmlattribute). I can't demo all those, but I can write a more detailed XSS blog post if you'd like me to!

Note that our email templates are looking larger and more complex. Real-world code can be large, complex and messy, so let's clean it up by **not using CFScript**.

## The Best Dang Template Syntax

Outputting HTML from a scripting language is - *lets be honest* - **awkward**. It's awkward in Javascript (though much improved lately with template literals), it's awkward in PHP and it's certainly awkward in CFScript. Template engines like Twig, Jade, and Mustache solve this for other languages, but in ColdFusion we have the **best dang template syntax in the world**.

So why not use it? 

CFML lets us switch between script syntax and tag syntax as necessary - no libraries, no extra compiling and no need to learn a funky template syntax.

I recommend creating a `views/emails/` directory for email templates. Then each new email can be a separate file named after the contact form, like `views/emails/donate-thankyou.cfm` or `views/forms/forgotpassword.cfm`.

Here's a quick example:

```js
cfmail(
    to="admin@mysite.com",
    from="noreply@mysite.com",
    subject="New form submission from #form.name#"
){
    include "/views/forms/contact/email.cfm";
}
```

With this setup, our email-sending code looks much cleaner and the email template looks much better as well.

We can even create a standardized email header and footer in `_head.cfm` and `_foot.cfm` and include those from the main email template:

```html
<cfinclude template="./_head.cfm" />
<!---

        EMAIL BODY GOES HERE

--->
<cfinclude template="./_foot_.cfm" />
```

## Formatting Form Entries In An Email

For a quick get-er-done notification email, you can loop over `form.fieldnames` to dynamically output each form field:

```html
<p>
<cfloop list="#form.fieldnames#" index="field">
    <strong>#encodeForHTML( field )#:</strong>
    #encodeForHTML( form[ field ] )#<br>
</cfloop>
</p>
```

If you want high quality email templates, you might want something more like this:

```html
<h1>New form submission by #encodeForHTML( form.email )#</h1>
<p>Message: #encodeForHTML( form.message )#</p>
<p>
    Name: #encodeForHTML( form.name )#<br>
    Email: #encodeForHTML( form.email )#
</p>
```

## Email Attachments

Let's say we have a job application form with a place to upload a resume file:

```html
<form enctype="multipart/form-data" action="processApplication.cfm">
    <label for="resumeFile">Please add your resume in PDF format</label>
    <input type="file" id="resumeFile" name="resume">
    <!--- more form here --->
</form>
```

Files sent via a POST request are stored in the server's temp directory. To attach the file to the email, we first need to save the file to a semi-permanent location so it doesn't get cleaned up (i.e. deleted) before the spooled email is sent out. The [`fileUpload()`](https://cfdocs.org/fileupload) function works well for this:

```js
var uploadedFile = fileUpload( "/files/resume/", "resume", "application/pdf", "makeunique" );
```

Once we have the file saved we can attach the file to our email by using [`cfmailparam()`](https://cfdocs.org/cfmailparam):

```js
cfmail(
    to="admin@mysite.com",
    from="noreply@mysite.com",
    subject="New form submission from #form.name#"
){
    // Email body here
    cfmailparam( file="#uploadedFile.serverfile#" );
}
```

## Conclusion

Emails are fantastic for form notifications. CFML is fantastic for emails. This guide ended up much longer than I expected - hopefully you enjoyed it and can use it as a handy reference for your first CF app!