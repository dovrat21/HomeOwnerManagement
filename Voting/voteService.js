app.factory("voteService", function ($http, $log, $q) {

  var votes = [];
  var votesSubjects = [];
  var activeVote = null;
  var activeVoteSubject = null;
  // var userUrl="https://my-homeownre-db.herokuapp.com/users";
  // var messageUrl="https://my-homeownre-db.herokuapp.com/messages";
  var voteUrl = "https://dovrat-project.herokuapp.com/votes";
  var voteProposalUrl = "https://dovrat-project.herokuapp.com/proposals";
  // https://my-homeowner-db.herokuapp.com/users
  // https://my-homeowner-db.herokuapp.com/users

  function Vote(id, voteSubjectId, vote_res, user_id, has_been_vote) {
    this.id = id;
    this.voteSubjectId = voteSubjectId;
    this.vote_res = vote_res;
    this.user_id = user_id;
    this.has_been_vote = has_been_vote;

  }

  function Proposal(id, start_date, end_date, subject, body, committee_id) {
    this.id = id;
    this.committee_id = committee_id,
      this.start_date = start_date;
    this.end_date = end_date;
    this.subject = subject;
    this.body = body;

  }

  function deleteVoteSubject(voteId) {
    var urlToDelete = "https://dovrat-project.herokuapp.com/proposals/"
    var async = $q.defer();
    $http.delete(urlToDelete + voteId).then(function (data, status) {
      votesSubjects = getAll();
      async.resolve(votesSubjects);
    }, function (error) {
      console.log(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;

  }



  function addVoteSubject(voteSubject) {
    var async = $q.defer();
   
    var dd = voteSubject.start_date.getDate();
    var mm = voteSubject.start_date.getMonth() + 1; //January is 0!
    var yyyy = voteSubject.start_date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var newstartDate = dd + '/' + mm + '/' + yyyy;

    dd = voteSubject.end_date.getDate();
    mm = voteSubject.end_date.getMonth() + 1; //January is 0!
    yyyy = voteSubject.end_date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    var newendDate = dd + '/' + mm + '/' + yyyy;
    voteSubject.start_date= newstartDate;
    voteSubject.end_date = newendDate;

    $http.post(voteProposalUrl, voteSubject).then(function (data, status) {
    activeVoteSubject = new Proposal(data.data.id, data.data.committee_id, data.data.start_date, data.data.end_date, data.data.subject, data.data.body);

      votesSubjects.push(activeVoteSubject);
      async.resolve(votesSubjects);
    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;

  }

  function addVote(voteRes, userId, currentVote) {
    var async = $q.defer();
    var voteObj = new Vote(currentVote.voteSubjectId, voteRes, userId, true);

    $http.post(voteUrl, voteObj).then(function (data, status) {
      var activeVote = new Vote(data.data.id, data.data.voteSubjectId, data.data.vote_res, data.data.user_id, data.data.has_been_vote);
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

 

  function getAll(committee_id) {
    var async = $q.defer();
    $http.get(voteProposalUrl).then(function (response) {
      
      votesSubjects = response.data;
       var relevantSubject = votesSubjects.filter(function (el) {
        return el.committee_id == committee_id ;
      });
      async.resolve(relevantSubject);
    }, function (error) {
      $log.error(error);

      async.reject("failed to load proposals");
    });


    return async.promise;
  }


  return {

    getAll: getAll,
    addVoteSubject: addVoteSubject,
    addVote: addVote,
    deleteVoteSubject: deleteVoteSubject

  }






});