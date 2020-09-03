// server.js - test4np
// where your node app starts

// init project
var express = require('express');
var app = express();
const dotenv = require('dotenv').config() //Change for production, only load on dev

console.log(process.env.LISTEN_PORT)

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Timestamp api
app.get("/api/timestamp", (req, res) => {
  const currentDate = new Date()
  res.json({"unix": currentDate.getTime(), "utc": currentDate.toUTCString()})
})



// listen for requests :)
var listener = app.listen(process.env.LISTEN_PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});