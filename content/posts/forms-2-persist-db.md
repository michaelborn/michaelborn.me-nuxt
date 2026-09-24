---
date: '2019-08-01T16:13:57-04:00'
tags: [ 'coldfusion', 'cfscript', 'cfml', 'mysql' ]
draft: false
title: "Form Processing in CFScript Part Two: Saving Form Entries to the Database"
---

If a tree falls in a woods with no one to hear, did it actually fall? Likewise, if a user submits a form but it is not persisted in some form, that form submission is **worthless**.

- [Saving Form Submissions to the Database](#saving-form-submissions-to-the-database)
  - [Method One: Storing the Form With a Hard-Coded Table Design](#method-one-storing-the-form-with-a-hard-coded-table-design)
  - [Method Two: Storing a Form as a JSON Packet](#method-two-storing-a-form-as-a-json-packet)
- [Conclusion](#conclusion)

Today we'll go over a very important, perhaps the **most** important step in form processing: saving the submitted form to a database.

## Saving Form Submissions to the Database

When processing form submissions, the first and most important step is to **persist** the data - to make sure that form data is saved and available for future reference. This post will show you how to store form data in a SQL database using two main approaches. Neither approach is difficult, but I found each useful in their own way and worthy of different use cases.

### Method One: Storing the Form With a Hard-Coded Table Design

Here's the simple method - simply save each form submission to a new row with a separate column for each form field.

After you build the HTML form, create a database table with an appropriate column for each form field:

```sql
CREATE TABLE contactForm(
  id VARCHAR(35) NOT NULL UNIQUE PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  dateSubmitted TIMESTAMP
);
```

Then in your form handler, it's as easy as using `queryExecute()` to insert the row.

```js
var sql = "
    INSERT INTO contactForm(id, name, email, message, dateSubmitted)
    VALUES(:id, :name, :email, :message, :dateSubmitted)
";
var params = {
    id: createUUID(),
    name: form["name"],
    email: form["email"],
    message: form["message"],
    date: { value: now(), cfsqltype: "timestamp" }
};
queryExecute( sql, params );
```

I'm personally a fan of declaring `sql` and `params` variables like this, but if you're an inline-only kind of guy you could write it like this:

```js
queryExecute( "
    INSERT INTO contactForm(id, name, email, message, dateSubmitted)
    VALUES(:id, :name, :email, :message, :dateSubmitted)
", {
    id: createUUID(),
    name: form["name"],
    email: form["email"],
    message: form["message"],
    date: { value: now(), cfsqltype: "timestamp" }
});
```

The cool thing about this approach is that Fixinator will now catch your SQLi vulnerabilities

This approach is simple and works well enough. The benefit to building a table schema to match the form is that storing and retrieving the data is simple and powerful thanks to good database integration. Basically, having our table design match the form design gives us powerful search, sort and query capabilities with no extra work.

### Method Two: Storing a Form as a JSON Packet

For larger forms, creating that table schema can be a pain. If that large form changes frequently, we're talking a **real** pain. I can't tell you how many table schemas I've created to match a contact or donation form, just to alter those tables when the form inevitably changes.

So for larger, more complex forms, I recommend storing the form submission as a JSON string. It's still useful to have the main fields (name and email) in dedicated table columns for sorting and searching, but JSON will be more than adequate for most other fields. Saving as JSON means that we don't need to create a custom field for every form input, and we can store form submissions _generically_ - less setup and less maintenance.

The storage table is much simpler to create:

```sql
CREATE TABLE formSubmissions(
  id VARCHAR(35) NOT NULL UNIQUE PRIMARY KEY,
  form TEXT,
  dateSubmitted TIMESTAMP
);
```

And inserting the form data as JSON is as simple as using `serializeJSON(form)`. When reading the form submission out of the table, we can use `deserializeJSON()` to decode the JSON string back to a CF struct. On Lucee, you may need to [enable "Preserve key case" in the Lucee admin](https://www.bennadel.com/blog/3667-understanding-struct-key-casing-using-serializejson-in-lucee-5-3-2-77.htm). Note that Adobe [ColdFusion 11 and up maintains key casing by default](https://coldfusion.adobe.com/2014/04/language-enhancements-in-coldfusion-splendor-improved-json-serialization/).

```js
var sql = "
    INSERT INTO formSubmissions(id, form, dateSubmitted)
    VALUES(:id, :form, :dateSubmitted)
";
var params = {
    id: createUUID(),
    form: serializeJSON(form),
    date: { value: now(), cfsqltype: "timestamp" }
};
queryExecute( sql, params );
```

One significant downside of this approach is that sorting and searching natively in the database becomes harder - perhaps significantly harder, depending on your database software. If you're using MySQL 5.7.8 or newer, though, the `JSON` data type makes sorting or filtering fairly easy:

```sql
SELECT id
    , JSON_EXTRACT(data, '$.name') AS name
    , JSON_EXTRACT(data, '$.email') AS email 
FROM formSubmissions
ORDER BY name ASC
```

I must note that this method is not perfect. Storing data as a big old JSON string does not exactly conform to [first normal form](https://en.wikipedia.org/wiki/First_normal_form), and attempting to sort or search by an extracted JSON field will likely come with a non-negligable performance hit. Regardless, I find this method handy due to the minimal maintenance. It's generally easier to edit an HTML form than the SQL table structure, and this approach means that a change in the first does not require a change in the second.

For more info, check out _[How to Use JSON Data Fields in MySQL Databases](https://www.sitepoint.com/use-json-data-fields-mysql-databases/)_.

## Conclusion

Persistence is not hard. This blog post was meant to highlight an easier approach to storing form entries; if you put a little thought into your form processing you can save a lot of maintenance time through the life of the form.
