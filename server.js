// server.js - test4np
// where your node app starts

// init project
var express = require('express');
var app = express();

if(process.env.NODE_ENV === 'development') {
  //Set environment variables for Dev
  const dotenv = require('dotenv').config()
  console.log('Development is running')
}

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


//Timestamp api
app.get("/api/timestamp", (req, res) => {
  const currentDate = new Date()
  res.json({"unix": currentDate.getTime(), "utc": currentDate.toUTCString()})
})

app.get("/api/timestamp/:date", (req, res) => {
  
  console.log(typeof req.params.date)

  //use regex to test for only 0-9 numbers, indicating unix timestamp as input
  const regex = /^\d+$/g
  const dateFormat = regex.test(req.params.date) ? parseInt(req.params.date) : req.params.date

  console.log('date typeof: ' + typeof dateFormat)
  
  const date = new Date(dateFormat)
  console.log(date)

  if(date!='Invalid Date') {
    //Valid Date
    res.json({"unix": date.getTime(), "utc": date.toUTCString()})
  } else {
    //Invalid Date
    res.json({"error": "Invalid Date"})
  }
  
  //const checkDate = Date.parse(req.params.date)
  

  // if(checkDate) {
  //   //Valid Date
  //   const dateOutput = new Date(checkDate)
  //   res.json({"unix": dateOutput.getTime(), "utc": dateOutput.toUTCString()})
  // } else {
  //   //Invalid Date
  //   res.json({"error": "Invalid Date"})
  // }


  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});