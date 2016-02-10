# timestamp-service

## Free Code Camp Timestamp Microservice Project


This service returns a JSON-formatted timestamp for the supplied date:
```
{"unixtime":1454994000000,"natural":"February 9, 2016"}
```

Query the service with either a valid JavaScript date string or a number representing Unix epoch time:
```
http://host:8080/February%209,%202016
http://host:8080/February 9, 2016
http://host:8080/1454994000000
```

If an invalid date string or number is entered, the service will return null values:
```
{"unixtime":null,"natural":null}
```

###### References:
###### https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
###### Built upon Clementine.js:
###### https://github.com/johnstonbl01/clementinejs.git
