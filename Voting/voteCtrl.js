app.controller("voteCtrl", function ($scope, $rootScope, $http, $location, voteService, userService) {

  $scope.currentVote = null;
  $scope.votesSubjects=[];
   
  $scope.getCurrentVoteId = function(vote) {
    $scope.currentVote = vote;
    alert($scope.currentVote);
   
    }

    $scope.currentUser = function () {
      return userService.getActiveUser();
    }
    
    
    $scope.addVote = function(currentVote){
      var voteRes=currentVote;
      var userId = $scope.currentUser().id;
      var currentVote =$scope.currentVote;
      voteService.addVote(voteRes, userId, currentVote).then(function (responseVote) {
        // $scope.votes = responseVote;
      
      }, function (error) {
  
        $log.error(error);
      });
  
  
    }           
    
    
    $scope.radioModel = 'Avoid';
    $scope.votes = [];
  
    $scope.query = "";
    $scope.today = function() {
      $scope.start_date = new Date();
    };
    $scope.today();
  
    $scope.clear = function() {
      $scope.start_date = null;
      $scope.end_date = null;
      
    };
  
    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };
  
    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };
  
    $scope.setDate = function(year, month, day) {
      $scope.end_date = new Date(year, month, day);
    };
  
    $scope.formats = ['dd.MM.yyyy'];
    $scope.format = $scope.formats[0];
  
  
    $scope.popup1 = {
      opened: false
    };
  
    $scope.popup2 = {
      opened: false
    };


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
      
      voteService.addVoteSubject(vote).then(function (responseVote) {
        $scope.votesSubjects=responseVote;
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
        $scope.votesSubjects=responseVote;
        // $location.path('/');
      }, function (error) {
  
        $log.error(error);
      });
  
  
    };
  
  
  
  
  
  
    voteService.getAll().then(function (votes) {
      $scope.votesSubjects = votes;
  
    }, function (error) {
      $log.error(error);
    });
  });