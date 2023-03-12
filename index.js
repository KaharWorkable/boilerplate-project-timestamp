// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  res.json({
    unix : new Date().getTime(),
    utc : new Date().toUTCString()
  })
});

app.get("/api/:timestamp", function (req, res) {
  const timestamp = req.params.timestamp;

  if(!isNaN(timestamp) && timestamp.length === 13){
    res.json({
      unix : timestamp,
      utc : new Date(parseInt(timestamp)).toUTCString()
    })
  }
  else if(!isNaN(timestamp) && timestamp.length !== 13){
    res.json({
      error : "Invalid Date"
    })
  }else if(isNaN(timestamp)){
    const date = new Date(timestamp);
    if(date.toString() === "Invalid Date"){
      res.json({
        error : "Invalid Date"
      })
    }
    else{
      res.json({
        unix : date.getTime(),
        utc : date.toUTCString()
      })
    }
  }

  if(new Date(timestamp).toString() === "Invalid Date"){
    res.json({
      error : "Invalid Date"
    })
  }else{
    res.json({
      unix : new Date(timestamp).getTime(),
      utc : new Date(timestamp).toUTCString()
    })
  }

});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
