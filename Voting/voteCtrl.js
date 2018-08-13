app.controller("voteCtrl", function ($scope, $rootScope, $http, $location, voteService, userService) {

  $scope.currentVote = null;
  $scope.votesSubjects = [];
  $scope.votes = [];
  $scope.voteIsOver = false;
  $scope.alreadyVote = false;


  $scope.labels = ["בעד", "נגד", "נמנע"];
  $scope.options = { legend: { display: true } };
  $scope.data = [];
  // $scope.votesss = [{
  //   "id": 1,
  //   "voteSubjectId": "0",
  //   "vote_res": "Avoid",
  //   "user_id": 0,
  //   "has_been_vote": "true"
  // }, {
  //   "id": 1,
  //   "voteSubjectId": "0",
  //   "vote_res": "Reject",
  //   "user_id": 0,
  //   "has_been_vote": "true"
  // }, {
  //   "id": 1,
  //   "voteSubjectId": "0",
  //   "vote_res": "Agree",
  //   "user_id": 0,
  //   "has_been_vote": "true"
  // }, {
  //   "id": 1,
  //   "voteSubjectId": "0",
  //   "vote_res": "Reject",
  //   "user_id": 0,
  //   "has_been_vote": "true"
  // }, {
  //   "id": 1,
  //   "voteSubjectId": "0",
  //   "vote_res": "Agree",
  //   "user_id": 0,
  //   "has_been_vote": "true"
  // }];


  $scope.updateChart = function () {
    var agree = 0;
    var reject = 0;
    var avoid = 0;
    var allVotes = null;


    // var committee_id= $scope.currentUser().committee_id;
    // var allVotes=$scope.votes;
    if ($scope.votes.length > 0) {
      alert($scope.votes.length);
      var relevantVote = $scope.votes.filter(function (el) {
        return el.committee_id == $scope.currentUser().committee_id;
      });
     
   
   
   
    }

   

    // }, function (error) {
    //   $log.error(error);
    // });



    // for (var i = 0; i < $scope.votesss.length; i++) {
    //   if ($scope.votesss[i].vote_res === "Agree") {
    //     ++agree;
    //   } else if ($scope.votesss[i].vote_res === "Avoid") {
    //     ++avoid
    //   }
    //   else {
    //     reject++;
    //   }
    // }

    // return [agree, avoid,reject];
  };


  $scope.votePrerequisite = function (vote) {
    $scope.currentVote = vote;
    $scope.voteIsOver = false;
    $scope.yetToCome = false;
    $scope.alreadyVote = false;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    var todayFix = mm + '/' + dd + '/' + yyyy;
    var a = new Date(todayFix);

    var b = new Date(vote.end_date.split('/')[1] + "/" + vote.end_date.split('/')[0] + "/" + vote.end_date.split('/')[2]);

    var c = new Date(vote.start_date.split('/')[1] + "/" + vote.start_date.split('/')[0] + "/" + vote.start_date.split('/')[2]);

    if (a > b) {
      $scope.voteIsOver = true;
    }
    else if (c > a) {
      $scope.yetToCome = true;
    }
    else if (vote.has_been_vote) {
      $scope.alreadyVote = true;

    }

  }

  $scope.currentUser = function () {
    return userService.getActiveUser();

  }


  $scope.addVote = function (vote) {
    var voteRes = vote;
    var userId = $scope.currentUser().id;
    var currentVote = $scope.currentVote;
    voteService.addVote({ voteSubjectId: currentVote.id, vote_res: voteRes, user_id: userId, committee_id: currentVote.committee_id, has_been_vote: true }).then(function (responseVotes) {
      $scope.votes = responseVote;

    }, function (error) {

      $log.error(error);
    });


  }


  $scope.radioModel = 'Avoid';
  $scope.votes = [];

  $scope.query = "";
  $scope.today = function () {
    $scope.start_date = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.start_date = null;
    $scope.end_date = null;

  };

  $scope.open1 = function () {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function () {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function (year, month, day) {
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



  $scope.showFutureVotes = function () {
    $scope.query = "futureVotes";

  };
  $scope.showRelevantVotes = function () {
    $scope.query = "relevant";

  };
  $scope.showAll = function () {
    $scope.query = "";

  };

  $scope.showOverVotes = function () {
    $scope.query = "over";

  };


  $scope.filterVotes = function (vote) {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    var todayFix = mm + '/' + dd + '/' + yyyy;
    var a = new Date(todayFix);

    var b = new Date(vote.end_date.split('/')[1] + "/" + vote.end_date.split('/')[0] + "/" + vote.end_date.split('/')[2]);

    var c = new Date(vote.start_date.split('/')[1] + "/" + vote.start_date.split('/')[0] + "/" + vote.start_date.split('/')[2]);

    if ($scope.query == "futureVotes") {
      if (c > a) {
        return true;
      }

    } else if ($scope.query == "relevant") {
      if (a < b && c < a) {
        return true;
      }
    } else if ($scope.query == "over") {
      if (a > b) {
        return true;
      }
    }
    else {
      return true;
    }

  }



  $scope.addVoteSubject = function (vote) {
    var userId = $scope.currentUser().id;
    var userCommunity = $scope.currentUser().committee_id;
    vote.committee_id = userCommunity;
    voteService.addVoteSubject(vote).then(function (responseVotes) {
      $scope.votesSubjects = responseVotes;
      $location.path('/vote');
      $scope.vote.start_date = "";
      $scope.vote.end_date = "";
      $scope.vote.subject = "";
      $scope.vote.body = "";

    }, function (error) {

      $log.error(error);
    });

    $location.path('/vote');
  };

  $scope.deleteVoteSubject = function (vote) {
    voteService.deleteVoteSubject(vote).then(function (responseVotes) {
      $scope.votesSubjects = responseVotes;
      $location.path('/vote');
    }, function (error) {

      $log.error(error);
    });

    $scope.votesSubjects = responseVotes;
  };

  voteService.getAllVotes().then(function (votes) {
    $scope.votes = votes;
  }, function (error) {
    $log.error(error);
  });
  // $scope.getAllVotes = function () {
  //   // $scope.currentUser().committee_id
  //   voteService.getAllVotes().then(function (votes) {
  //     $scope.votes = votes;

  //   }, function (error) {
  //     $log.error(error);
  //   });



  // };

  voteService.getAll($scope.currentUser().committee_id).then(function (votes) {
    $scope.votesSubjects = votes;

  }, function (error) {
    $log.error(error);
  });
});