# Code Snippets

## psql get date from timestamp

```sql
lightbnb=# select start_date::timestamp::date from reservations limit 2;
start_date 
------------
 2018-09-11
 2019-01-04

lightbnb=# select extract(day from start_date) from reservations limit 2;
 date_part 
-----------
        11
         4

```
