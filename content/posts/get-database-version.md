---
title: "TIL: Get (Oracle) Database Version"
date: '2019-02-20T08:58:52-05:00'
tags: [ 'oracle', 'til' ]
draft: false
---

I've been working with Oracle lately, and the first Oracle-specific thing I had to do was check the version.

This easy answer comes from [TechOnTheNet][1]

```sql
SELECT * FROM v$version;
```

[1]: https://www.techonthenet.com/oracle/questions/version.php
