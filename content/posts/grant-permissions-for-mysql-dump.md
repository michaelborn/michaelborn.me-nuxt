---
title: "TIL: GRANT Permissions for MySQLDump Backups"
date: '2018-10-18T03:13:38-04:00'
tags: [ 'mysql', 'til' ]
draft: false
---

Turns out that running `mysqldump` against a database takes more than just `SELECT` permissions. Use this `GRANT` command to grant the necessary privileges for dumping a database.

```
GRANT SELECT, LOCK TABLES, SHOW VIEW, TRIGGER ON myDatabase.* TO myUser@localhost IDENTIFIED BY 'password_string;
FLUSH PRIVILEGES
```

If you forget one of these, or need an extra GRANT, you may get an error like:

```
mysqldump: Got error: 1044: Access denied for user 'myUser'@'localhost' to database 'myDatabase' when using LOCK TABLES
```
