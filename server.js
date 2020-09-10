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
  const checkDate = Date.parse(req.params.date)

  if(checkDate) {
    //Valid Date
    const date = new Date(checkDate)
    res.json({"unix": date.getTime(), "utc": date.toUTCString()})
  } else {
    //Invalid Date
    res.json({"error": "Invalid Date"})
  }


  
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});