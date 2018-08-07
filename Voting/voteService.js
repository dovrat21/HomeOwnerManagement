app.factory("voteService", function ($http, $log, $q) {

    var votes = [];
    var activeVote = null;
    // var userUrl="https://my-homeownre-db.herokuapp.com/users";
    // var messageUrl="https://my-homeownre-db.herokuapp.com/messages";
    var voteUrl = "https://dovrat-project.herokuapp.com/votes";
    // https://my-homeowner-db.herokuapp.com/users
  
    function Vote(id, start_date, end_date, subject, body, vote_res, user_id,has_been_vote ) {
      this.id = id;
      this.start_date = start_date;
      this.end_date = end_date;
      this.subject = subject;
      this.body = body;
      this.vote_res = vote_res;
      this.user_id = user_id;
      this.has_been_vote = has_been_vote;
    }
    
    function deleteVoteSubject(voteId)
  {
    //  var VoteUrl="https://dovrat-project.herokuapp.com/votes/"
    var async = $q.defer();
    // $http.delete(messageUrl, {params: {id: messageId}}).then(function (data, status) {
      $http.delete(voteUrl + voteId).then(function (data, status) {
      votes=getAll();
      async.resolve(votes);
    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });
  
    return async.promise;
   
  }
  
  
  
    function addVoteSubject(vote, userId, userCommunity) {
      var async = $q.defer();
  
      $http.post(voteUrl, vote).then(function (data, status) {
  
        // activeUser = new User(data.data.first_name, data.data.last_name, data.data.email, data.data.city, data.data.street, data.data.house_number, data.data.appartment, data.data.committee_id, " ", data.data.password, data.data.password_confirmation, data.data.isManager);
        // activeMessage = new Message(data.data.id, data.data.title, data.data.priority, data.data.from);
        // activeMessage.from = userId;
        // activeMessage.committee_id = userCommunity;
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
        activeVote = new Message(data.data.id, data.data.start_date, data.data.end_date, data.data.subject, data.data.body, data.data.vote_res, userId,userCommunity);
       
        votes.push(activeVote);
        async.resolve(votes);
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
      deleteVoteSubject :deleteVoteSubject
  
    }
  
  
  
  
  
  
  });