---
date: '2019-07-23T16:13:57-04:00'
tags: [ 'coldfusion', 'cfscript', 'cfml', 'validation' ]
draft: false
title: "Form Processing in CFScript Part One: Form Validation"
---

This series will teach you how to process form submissions using ColdFusion's CFScript syntax. In Part One I'll show you the basics of validating form submissions on the backend!

**Note:** This article (and entire series) assumes you are not using a frontend framework like Vue or ReactJS to generate and validate the form. If you are, great, but **do not** rely on client-side validation as it is too easily bypassed. See section on backend vs. frontend validation.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Intro to Form Validation](#intro-to-form-validation)
- [Form Validation: Backend Vs. Frontend](#form-validation-backend-vs-frontend)
- [Validating Field Length (Required Fields)](#validating-field-length-required-fields)
- [Validating Field Type](#validating-field-type)
  - [Static Type Checking](#static-type-checking)
  - [Iterative Type Checking](#iterative-type-checking)
- [Dealing with Validation Errors](#dealing-with-validation-errors)
- [Conclusion](#conclusion)

## Intro to Form Validation

When validating form submissions, there are two main things to keep in mind which should guide your overall validation strategy.

First, the main point of form validation is 1) to helpfully notify the user when they mistype a value, and 2) to prevent backend errors. (e.g. `cfmail()` will throw an error for some badly misformed email addresses). Besides that, validation should be used _as sparingly as possible_. This is because it's easy to be too strict and unintentionally exclude users with different zip codes, email addresses and phone numbers than we might expect.

Secondly, you can never force a user to input their personal information if they do not wish to! Requiring an `address` field, for example, will generate a significant amount of falsified info, like "1600 Pennsylvania Ave NW".

With that out of the way, let's take a look at a basic HTML form we're going to validate. Nothing fancy here, just a small contact form. Donation forms are much larger and require much stricter validation (and if you are processing payments through your server, I pray for you!)

```html
<form action="contact.cfm">
    <div class="field">
        <label for="name">Your Name</label>
        <input type="text" name="name" id="name" value="" />
    </div>
    <div class="field">
        <label for="email">Your Email</label>
        <input type="text" name="email" id="email" value="" />
    </div>
    <div class="field">
        <label for="message">Message</label>
        <textarea name="message" id="message"></textarea>
    </div>
    <div class="submit">
        <input type="submit" class="button button-primary" value="Send">
    </div>
</form>
```

Later on, we'll tweak this form to support the particular "flow" I prefer for backend validation.

## Form Validation: Backend Vs. Frontend

Form validation at the frontend level is **far** superior than equivalent validation at the backend level. Think of the User Experience - with frontend validation, you can get immediate feedback and avoid sending bad data in the first place. Backend validation is only necessary when the frontend is broken, disabled (Noscript mode) or purposely skirted around via some bot or hacker submitting HTTP requests to your backend.

For this reason, you could probably dispense with the pleasantries and ignore the need for decent UX when validating via the backend. I say "probably" - I still like to provide a nice UX for those legitimate users browsing with javascript disabled.

## Validating Field Length (Required Fields)

Validating a form field is not exactly nuclear science. For many fields(not all, but many), it is enough to ensure that the field value is not empty. When validating required fields, I use a variable to store a simple list of field names deemed "required", and if any of those fields are indeed empty we halt the processing and display an error to the user.

**Note:** I use member functions throughout this blog post. Member functions can be great as long as they are relatively short and importantly, _achieve only a single purpose_. Larger blocks of code, in my opinion, probably belong in a `for` loop - not a member function.

Here's what I'd use to validate required fields using some clever* member functions.

_*Cleverness is useful but dangerous; please use carefully. (And see note on member functions above.)_

```js
var requiredFields = "email,phone,message";
var invalidFields = "";
form.fieldnames.each((fieldname) => {
    if ( requiredFields.find(fieldname) && isEmpty(form[fieldname]) ) {
        writeOutput('<p class="alert alert-danger">Please fill out #fieldname#</p>');
        invalidFields.listAppend(fieldname);
    }
});
if ( invalidFields.len() ) {
    // halt processing and re-render the form.
    cfabort();
}
```

Fairly straightforward CFML here - iterate through all form fields, see if it is required, and if it is not provided spit out an error and halt processing. This is rather simplistic, but perfectly workable - skip down to "Dealing with Validation Errors" for an improved way to handle error messages.

## Validating Field Type

Validating the _type_ of data is much more difficult than validating the _presence_ of data.

### Static Type Checking

The simple way to do this is to use `isValid()` to check email, phone, zip or other standard inputs.

```js
if ( !isValid("email", form["email"]) ) {
    writeOutput('<p class="alert alert-danger">Please enter a valid email</p>');
}
if ( !isValid("telephone", form["phone"]) ) {
    writeOutput('<p class="alert alert-danger">Please enter a valid phone number</p>');
}
```

I say the **simple way** for a reason: *I personally do not recommend this option*. Why? Because [IsValid is not accurate for email validation](https://www.raymondcamden.com/2014/07/21/ColdFusion-isValid-Email-and-new-TLDs/), and the only way to guarantee that an email address is truly valid is to send the user an email. This is common practice in signup forms, for example.

I would avoid stringent validation for any localization-specific formats such as postal codes or phone numbers - there are simply too many variants. For any validation regex, there will almost certainly be issues with certain "valid" formats. That is my _opinion_ - you are free to use or reject it!

For simpler values like numerics, floats or strings, `isValid()` is fine. For example, we could validate a donation form's "amount" field to make sure it is a dollar value.

```js
if ( !isValid("float", form["amount"]) ) {
    writeOutput('<p class="alert alert-danger">Please enter a valid donation amount</p>');
}
```

### Iterative Type Checking

Now, instead of hard-coded field type checking, we could loop over an array of field names with type info:

```js
var formFields = [{
    name: "amount",
    type: "float"
},{
    name: "name",
    type: "string"
}];
formFields.each((field) => {
    if ( form[field.name] != "" && !isValid(field.type, form[field.name]) ) {
        writeOutput('<p class="alert alert-error">#field.name# must be a valid #field.type#</p>');
    }
});
```

I prefer this approach _if_ I'm going to generate the form dynamically via CFML, because I'll probably already have metadata about each field. For most smaller/non-generated HTML forms, who really cares if my code is a little repetitive?

## Dealing with Validation Errors

Most of the examples shown above display a Bootstrap alert immediately and abort or exit the form processing to show the message to the user. That is more than adequate _as long as we trust our frontend validation_. Validating on the frontend will filter out most real users from submitting invalid data in the first place.

However, we can improve on this model if we have the ability to generate the HTML form. Halting the request, displaying an error, and asking the user to click the back button is inconvenient and may clear the form, causing the user to lose all progress made. For a better flow, I usually stuff an `errors` array with error messages, then render the form with errors at the top (if the submission is invalid):

```js
var requiredFields = "email,phone,message";
var errors = [];
form.fieldnames.each((fieldname) => {
    if ( requiredFields.find(fieldname) && isEmpty(form[fieldname]) ) {
        errors.append("#fieldname# is required.");
    }
});
if ( errors.len() ) {
    // don't process the form; display it instead.
    include "form.cfm";
}
```

Once we have that array of error messages, we can easily display a Bootstrap alert for each error at the top of `form.cfm` like so:

```html
<cfif errors.len() >
    <cfloop list="#error#" index="error">
       <p class="alert alert-error">#error#</p>
    </cfloop>
</cfif>
<!--- render form --->
```

And finally, make sure to tweak the form by filling each input with the submitted `form.field` value. This allows the user to seamlessly  pick up after an invalid submission, letting them easily fill out a required field or correct an email typo.

```html
<form action="contact.cfm">
    <div class="field">
        <label for="name">Your Name</label>
        <input type="text" name="name" id="name" value="#encodeForHTMLAttribute(form.name)#" />
    </div>
    <div class="field">
        <label for="email">Your Email</label>
        <input type="text" name="email" id="email" value="#encodeForHTMLAttribute(form.email)#" />
    </div>
    <div class="field">
        <label for="message">Message</label>
        <textarea name="message" id="message">#encodeForHTMLAttribute(form.message)#</textarea>
    </div>
    <div class="submit">
        <input type="submit" class="button button-primary" value="Send">
    </div>
</form>
```

_PS. Make sure to encode all user-submitted data to prevent Cross-Site Scripting (XSS)!_

## Conclusion

Form validation is not hard, just tedious. Hopefully this helps you understand the basics of validation. When in doubt, be more permissive than you need to be, but *never trust user input*!

That wraps up Part One of Form Processing in CFScript. If you liked this or hated this, please comment below. :)
