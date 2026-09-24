+++
date = '2019-07-08T16:13:57-04:00'
tags = [ 'coldfusion', 'lucee', 'cfml', 'sql' ]
draft = false
title = "Storing and Using DateTimeOffsets in Lucee"
+++

Recently at [Impelos](https://impelos.com/) I began storing dates using SQL Server's [DateTimeOffset](https://docs.microsoft.com/en-us/sql/t-sql/data-types/datetimeoffset-transact-sql?view=sql-server-2017) field, which allows us to store a date and time **with embedded UTC offset**. Unfortunately, I ran into several issues with Lucee's support for the data type.

This post details what I did to work around the issues and even details how to format the dates to an ISO 8601 JS-safe format.

## Problem One: UTC Offset Truncation

The first issue I ran into with the `DateTimeOffset` field had to do with losing the UTC offset on insert/update. When using the `datetime` cfsqltype, the UTC offset is truncated.

So instead of `2019-07-07 13:22:01 -5:00`, we get `2019-07-07 13:22:01 +0:00`. Notice the UTC offset is changed to UTC +0, but the date is never converted to UTC +0, or GMT. This causes the inserted time to be off by the full value of the UTC offset. Insert a datetime at 7PM UTC +1, and it indicates 7PM GMT, which is actually 8PM at UTC +1.

The workaround I settled on was to use a `varchar` cfsqltype and manually format the value to fit MSSQL's `datetimeoffset` format: `YYYY-MM-DD hh:mm:ss[.nnnnnnn] [{+|-}hh:mm]`.

Here's a quick example using `QueryExecute()`:

```js
var params = [
    datesaved: {
        value: dateTimeFormat(now(), "YYYY-mm-dd HH:nn:ss XXX"),
        cfsqltype: "varchar"
    },
    title: "My crazy title"
];
queryExecute( "UPDATE blogposts SET title=:title, datesaved=:datesaved", params );
```

This worked pretty well for me. Note that `XXX` is a mask sequence currently not documented on CFDocs.org. I found this on the documentation page for the [Java SimpleDateFormat](https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html) class, which Lucee uses under the hood. I'm planning to document that on CFDocs soon!

## Problem Two: DateTimeOffset Retrieved as Java Object

Here's the second issue. Querying for a datetimeoffset field or value actually returns a ... _wait for it_... Java object. Yep.

A simple query like this:

```js
var query = queryExecute("
    SELECT getUTCDate()
    AT TIME ZONE 'Central Standard Time'
");
```

returns the wonderful little object shown below:

![image of SQL query: "Select getutcdate() at time zone 'Central Standard Time' rendering as java object](https://thepracticaldev.s3.amazonaws.com/i/wvwy9y3xlbno2pixrstd.png)

In case you're wondering, serializing this as JSON does not explode spectacularly as I assumed it would (at least in ColdBox. I admit I did not try this with the native `serializeJSON()`.) This Datetime java object renders as the following struct:

```js
"column_0": {
    "Timestamp": "June, 13 2019 07:55:00 -0400",
    "MinutesOffset": 0
}
```

I tried to force this to a somewhat useable date format using the `toString` method:

```js
for ( var row in query ) {
    row["datesaved"] = row["datesaved"].toString()
}
```

but I soon received complaints that the frontend couldn't parse my date strings. In other words `row["datesaved"].toString()` did not output a JS-safe date.

## Formatting Dates in ISO 8601 Format

Just what date format does JS require? According to Stack Overflow:

> JavaScript officially supports a simplification of the ISO 8601 Extended Format. The format is as follows: YYYY-MM-DDTHH:mm:ss.sssZ. The letter T is the date/time separator and Z is the time zone offset specified as Z (for UTC) or either + or - followed by a time expression HH:mm. Some parts (e.g. the time) of that format can be omitted.

_[Answer to "What are valid Date Time Strings in JavaScript?"](https://stackoverflow.com/a/51715260/1525594)_

The easy way to marshall a date into proper ISO 8601 format would be the following:

```js
DateTimeFormat(now(), "YYYY-mm-dd'T'HH:nn:ss.SSSXXX");
```

Again, we're using the `XXX` mask to output a UTC offset like `-5:00`, and using single quotes to escape the `T` in the middle of the date string. This should put out a proper ISO 8601 date like so: `2019-07-05T17:16:29.029Z`. I'm still a little unsure on the milliseconds, as they don't look right to me, but I don't consider millisecond precision as super important, at least right now.

With that, my date woes are over for now. It’s been helpful to find extra date formatting masks I didn’t know about, and slightly frustrating to find two year-old bugs in the Lucee DateTimeOffset support.

_**Note:** Both issues are mentioned in the [Lucee Jira ticket #1680](https://luceeserver.atlassian.net/browse/LDEV-1680)._