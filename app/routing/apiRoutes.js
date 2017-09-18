var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var friends =[
  {
    name: "Isaac",
    photo: "https://static.pexels.com/photos/126407/pexels-photo-126407.jpeg",
    scores: [
      5,
      5,
      4,
      3,
      3,
      2,
      4,
      4,
      5,
      1
    ]
  }
];

app.listen(port, function() {
  console.log("App listening on PORT " + port);
});

app.get("/api/friends", function(req, res) {
  res.json(friends);
});
