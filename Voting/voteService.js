app.factory("voteService", function ($http, $log, $q) {

  var votes = [];
  var activeVote = null;
  // var userUrl="https://my-homeownre-db.herokuapp.com/users";
  // var messageUrl="https://my-homeownre-db.herokuapp.com/messages";
  var voteUrl = "https://dovrat-project.herokuapp.com/votes/";
  // https://my-homeowner-db.herokuapp.com/users

  function Vote(id, start_date, end_date, subject, body, vote_res, user_id, has_been_vote) {
    this.id = id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.subject = subject;
    this.body = body;
    this.vote_res = vote_res;
    this.user_id = user_id;
    this.has_been_vote = has_been_vote;
  }

  function deleteVoteSubject(voteId) {
    var async = $q.defer();
    $http.delete(voteUrl + voteId).then(function (data, status) {

      votes = getAll();
      async.resolve(votes);
    }, function (error) {
      console.log(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;

  }



  function addVoteSubject(vote, userId, userCommunity) {
    var async = $q.defer();
    vote.end_date = vote.end_date.toLocaleDateString();
    vote.start_date = vote.start_date.toLocaleDateString();
    $http.post(voteUrl, vote).then(function (data, status) {
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
      var newDate = dd + '/' + mm + '/' + yyyy;
      activeVote = new Vote(data.data.id, data.data.start_date, data.data.end_date, data.data.subject, data.data.body, data.data.vote_res, userId, userCommunity);

      votes.push(activeVote);
      async.resolve(votes);
    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;

  }

  function addVote(voteRes, userId, currentVote) {
    var async = $q.defer();
    var voteObj = new Vote(currentVote.start_date ,currentVote.end_date,currentVote.subject, currentVote.body, voteRes, userId, true );        
    $http.post(voteUrl, voteObj).then(function (data, status) {
    var activeVote = new Vote(data.data.id, data.data.start_date, data.data.end_date, data.data.subject, data.data.body, data.data.vote_res, data.data.user_id, data.data.has_been_vote);
   
    async.resolve(activeVote);
    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;














  }



  //     function isLoggedIn() {
  //       return activeUser ? true : false;
  //   }

  //   function logout() {
  //       activeUser = null;
  //   }

  //  function getActiveUser(){
  //    return activeUser;
  //  }

  function getAll() {
    var async = $q.defer();
    $http.get(voteUrl).then(function (response) {
      votes = response.data;


      async.resolve(votes);
    }, function (error) {
      $log.error(error);

      async.reject("failed to load cars.json");
    });


    return async.promise;
  }


  return {

    getAll: getAll,
    addVoteSubject: addVoteSubject,
    addVote : addVote,
    deleteVoteSubject: deleteVoteSubject

  }






});