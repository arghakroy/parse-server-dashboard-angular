
angular
  .module('parse-app')
  .controller('MainController',function($scope,$window,ngParse){

    var GameScore = ngParse.Object.extend("GameScore");

    $scope.addData=function(){
      var gameScore = new GameScore();

      gameScore.set("score", $scope.score);
      gameScore.set("playerName", $scope.name);
      gameScore.set("cheatMode", false);

      gameScore.save(null, {
        success: function(gameScore) {
            getData();
            alert('Data saved');
        },
        error: function(gameScore, error) {
          // Execute any logic that should take place if the save fails.
          // error is a Parse.Error with an error code and message.
          alert('Failed to create new object, with error code: ' + error.message);
        }
      });
    }

    function getData() {
        var query = new ngParse.Query(GameScore);

        query.find().then(function(results){
          var jsonArray = [];
          for(var i = 0; i < results.length; i++) {
             jsonArray.push(results[i].toJSON());
          }
          console.log(jsonArray);
          $scope.$apply(function(){
            $scope.results=jsonArray;
          });
        });
    }

    getData();

  });
