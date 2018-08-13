var friends = require("../data/friends");

module.exports = function(app) {
  // Return friends objects from friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    //console.log(req.body.scores);

    // Receive user details from body
    var newUser = req.body;

    for(var i = 0; i < newUser.scores.length; i++) {
      newUser.scores[i] = parseInt(newUser.scores[i]);
    }

    var bestMatch = 0;
    var scoreDifference = 50;

    // Loop through freinds
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      //loop through scores
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(newUser.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      // if there is a new minimum it becomes total difference
      if(totalDifference < scoreDifference) {
        bestMatch = i;
        scoreDifference = totalDifference;
      }
    }

    // after finding match, add user to friend array
    friends.push(newUser);

    // send back to browser the best friend match
    res.json(friends[bestMatch]);
  });
};