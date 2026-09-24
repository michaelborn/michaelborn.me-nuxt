+++
date = '2019-08-20T16:13:57-04:00'
tags = [ 'sql', 'localization' ]
draft = false
title = "Localizing Dates In Sql Server"
+++

Several months ago I added timezone handling to a CF app. This post is my best effort to document how to localize dates using MSSQL timezone functionality.

## Retrieving Timezones from MSSQL

First, we need to know what time zones we can use. [MSSQL uses the Windows timezones as stored in the registry](https://docs.microsoft.com/en-us/sql/relational-databases/system-catalog-views/sys-time-zone-info-transact-sql?view=sql-server-2017), and they can be retrieved from the `sys.time_zone_info` system view.

```sql
SELECT * FROM sys.time_zone_info
```

Do not try to interact with these time zones using a CFML timezone - the underlying Java timezones use a different timezone format and do not match the MSSQL/Windows timezone format.

Also, you may notice that the timezone list *does not include different timezones for daylight saving time*. For example, there is a single timezone record for `Eastern Standard Time`, or EST. `Eastern Daylight Time` is nowhere to be found, because this view automatically updates the `current_utc_offset` and `is_currently_dst` values based on the current time in that timezone.

## Retrieve Current UTC Offset From a Known Timezone

Next we use these time zones to get the **current** utc offset. Note I said **current** - do **not** store the UTC offset, because it will change for a given time zone twice a year at minimum. (e.g. daylight saving time.)

For this reason, we'll need to store the user's time zone and retrieve the UTC offset when you need the user's local time.

Here's a simple way to retrieve the current UTC offset for a known time zone:

```sql
SELECT current_utc_offset
FROM sys.time_zone_info
WHERE name='US Eastern Standard Time'
```

Obviously, in order to know which time zone to use you will need to allow the user to select their time zone so you can store that timezone with the user.

## Localize Dates To a Timezone Using AT TIME ZONE

[Use `AT TIME ZONE`](https://dzone.com/articles/dates-and-times-in-sql-server-at-time-zone) if you need to indicate the UTC offset of a datetime value:

```sql
GETDATE() AT TIME ZONE 'US Eastern Standard Time'
```

Basically, this lets us select a date which was stored with no UTC offset and add a UTC offset to it - provided we know the original time zone. This paves the way for us to then convert the date from its original timezone - using `AT TIME ZONE` - to another timezone - using [the `SWITCHOFFSET` function](https://database.guide/switchoffset-examples-in-sql-server/).

## SWITCHOFFSET

Once we have a `DATETIMEOFFSET` value, we can use `SWITCHOFFSET(DATETIMEOFFSET, time_zone)` to switch that datetime to match a user's local time:

```sql
SWITCHOFFSET(
    GETDATE() AT TIME ZONE 'US Eastern Standard Time',
    (
        SELECT current_utc_offset
        FROM sys.time_zone_info
        WHERE name='Central European Standard Time'
    )
)
```

## Conclusion

Unfortunately, this is not a full timezone localization writeup. Localization is very complex, and [the more I learn the less I know](julianstodd.wordpress.com/2011/12/21/the-more-i-learn-the-less-i-know-learning-about-ignorance/). But hopefully this brief overview of timezone handling using built-in MSSQL functionality will come in useful for *someone* - enjoy!