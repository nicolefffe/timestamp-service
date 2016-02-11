'use strict';

var renderme = require("renderme");
var path = require("path");
var fs = require("fs");

module.exports = function (app) {

  app.get('/', function(request, response) {
    renderme({
      readme: fs.readFileSync(path.join(__dirname,'../..','README.md'),'utf-8'),
      readmeFilename: 'README.md'
      },
      function rendered(err, html) {
        if (err) { throw err; }
        else {
          response.end(html);
        }
      }
    );
  });

	app.get('/:date', function (req, res) {
		var time = req.params.date;
    time = time.replace(/\%20/g," ");
    var unixTime = new RegExp(/^[0-9]+/);

    var months = {
      "0": "January",
      "1": "February",
      "2": "March",
      "3": "April",
      "4": "May",
      "5": "June",
      "6": "July",
      "7": "August",
      "8": "September",
      "9": "October",
      "10": "November",
      "11": "December"
    };

    // If supplied time is a string of numbers, create new Date using the number
    if (unixTime.test(time)) {
      var date = new Date(parseInt(time));
      // If the number translated to a valid date, continue
      if (date.getMonth()) {
        var reply = {
          "unixtime": parseInt(time),
          "natural": months[date.getMonth().toString()] + " " + date.getDate() + ", " + date.getFullYear()
        };
      }
      // If the time string did not translate to a valid date, set values to null
      else {
        var reply = {
          "unixtime": null,
          "natural": null
        };
      }
    }

    // If the user supplied a valid date string, create a Date object using that string
    else if (Date.parse(time)) {
      var date = new Date(time);
      var reply = {
        "unixtime": Date.parse(time),
        "natural": months[date.getMonth().toString()] + " " + date.getDate() + ", " + date.getFullYear()
      };
    }

    // If a valid query was not supplied, return null values for unixtime and natural
    else {
      var reply = {
        "unixtime": null,
        "natural": null
      }
    }

    res.end(JSON.stringify(reply));
	});

};
