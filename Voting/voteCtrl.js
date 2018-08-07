app.controller("voteCtrl", function ($scope, $rootScope, $http, $location, voteService, userService) {



    $scope.votes = [];
    $scope.currentUser = function () {
      return userService.getActiveUser();
    }
  
    $scope.query = "";
     // $scope.orderByDate = function() {
    //   $scope.messages.sort(function(a, b) {
    //     return (new Date(b.date)) - (new Date(a.date))
    //   })
  
    // }
  
    // $scope.showImportantMessages = function () {
    //   $scope.query = "important";
  
    // };
    // $scope.showDefaultMessages = function () {
    //   $scope.query = "default";
  
    // };
    // $scope.showAll = function () {
    //   $scope.query = "";
  
    // };
  
  
  
    // $scope.filterMessages = function (message) {
    //   if (message.body) {
       
    //     if ($scope.query == "important") {
    //       if (message.priority === "important") {
    //         return true;
    //       }
  
    //     } else if ($scope.query == "default") {
    //       if (message.priority === "default") {
    //         return true;
    //       }
    //     } else if ($scope.query == "") {
    //       return true
  
    //     }
    //     else {
          
    //         if (message.body.toLowerCase().includes($scope.query.toLowerCase()) ||
    //           message.title.toLowerCase().includes($scope.query.toLowerCase())) {
    //           return true;
    //         } else {
    //           return false;
    //         }
         
    //     }
    //   }
    // }
  
  
  
  
  
    $scope.addVoteSubject = function (vote) {
      var userId = $scope.currentUser.id;
      var userCommunity = $scope.currentUser.committee_id;
      voteService.addVoteSubject(vote, userId, userCommunity).then(function (responseVote) {
        $scope.votes = responseVote;
        $scope.vote.start_date = "";
        $scope.vote.end_date = "";
        $scope.vote.subject = "";
        $scope.vote.body = "";
   
      }, function (error) {
  
        $log.error(error);
      });
  
  
    };
  
    $scope.deleteVoteSubject = function (voteId) {
      voteService.deleteVoteSubject(voteId).then(function (responseVotes) {
        $scope.votes = responseVotes;
        // $location.path('/');
      }, function (error) {
  
        $log.error(error);
      });
  
  
    };
  
  
  
  
  
  
    voteService.getAll().then(function (votes) {
      $scope.votes = votes;
  
    }, function (error) {
      $log.error(error);
    });
  });