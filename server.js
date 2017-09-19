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
    name: "Buzz Lightyear",
    photo: "http://akns-images.eonline.com/eol_images/Entire_Site/20151018/rs_300x300-151118104106-600.buzzlightyear-toy-story.jpg?downsize=600",
    scores: [5,5,4,3,3,2,4,4,5,1]
  },
  {
    name: "Nemo",
    photo: "https://vignette.wikia.nocookie.net/pixar/images/8/82/Nemo.png/revision/latest?cb=20110504131029",
    scores: [1,1,1,1,1,1,1,1,1,1]
  },
  {
    name: "Woody",
    photo: "https://lumiere-a.akamaihd.net/v1/images/uk_toystory_chi_woody_n_5b5a006f.png",
    scores: [5,5,5,5,5,5,5,5,5,5]
  },
  {
    name: "Lightning McQueen",
    photo: "https://upload.wikimedia.org/wikipedia/en/8/82/Lightning_McQueen.png",
    scores: [4,3,5,1,2,5,5,3,2,5]
  },
  {
    name: "Snow White",
    photo: "https://lumiere-a.akamaihd.net/v1/images/character_princess_snowwhite_b6c31f4d.jpeg?region=0,0,563,300",
    scores: [3,3,5,5,4,1,3,4,3,5]
  },
  {
    name: "Tarzan",
    photo: "http://weknowyourdreams.com/single/tarzan/tarzan-06",
    scores: [5,4,4,1,2,4,3,4,1,1]
  }
];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
  res.json(friends);
});

app.post("/api/friends", function(req, res) {
  var newFriend = req.body;
  var newFriendName = "";
  var newFriendPhoto = "";
  var totalDifference = 100;

  for (var i = 0; i < friends.length; i++) {
    var diff = 0;
    for (var j = 0; j < newFriend.scores.length; j++) {
      diff += Math.abs(friends[i].scores[j] - newFriend.scores[j]);
    }
    if (diff < totalDifference) {
      totalDifference = diff;
      newFriendName = friends[i].name;
      newFriendPhoto = friends[i].photo;
    }
  }

  friends.push(newFriend);
  res.json({name: newFriendName, photo: newFriendPhoto});
});

app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
