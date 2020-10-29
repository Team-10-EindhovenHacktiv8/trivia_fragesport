var fs = require('fs')
var request = require('request');

// The parameters.
var token = '9ZSAKSRCNIQ778TM1SE80XPYZRMEQOWQ';
var url = encodeURIComponent('http://localhost:8080');
var width = 1920;
var height = 1080;
var output = 'image';

// Create the query URL.
var query = "https://screenshotapi.net/api/v1/screenshot";
query += `?token=${token}&url=${url}&width=${width}&height=${height}&output=${output}`;

// Call the API and save the screenshot.
request.get({url: query, encoding: 'binary'}, (err, response, body) => {
    fs.writeFile("", body, 'binary', err => {
        if (err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
});