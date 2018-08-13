app.factory("voteService", function ($http, $log, $q) {

  var votes = [];
  var votesSubjects = [];
  var activeVote = null;
  var activeVoteSubject = null;
    var voteUrl = "https://dovrat-project.herokuapp.com/votes";
  var voteProposalUrl = "https://dovrat-project.herokuapp.com/proposals";
  
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

  function deleteVoteSubject(vote) {
    var urlToDelete = "https://dovrat-project.herokuapp.com/proposals/"
    var async = $q.defer();
    $http.delete(urlToDelete + vote.id).then(function (data, status) {
      votesSubjects = getAll(vote.committee_id);
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
    voteSubject.start_date = newstartDate;
    voteSubject.end_date = newendDate;

    $http.post(voteProposalUrl, voteSubject).then(function (data, status) {
      activeVoteSubject = new Proposal(data.data.id, data.data.committee_id, data.data.start_date, data.data.end_date, data.data.subject, data.data.body);
      var relevant_Subject = votesSubjects.filter(function (el) {
        return el.committee_id == voteSubject.committee_id;
      });
      relevant_Subject.push(activeVoteSubject);
      async.resolve(relevant_Subject);
    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;

  }

  function addVote(vote) {
    var async = $q.defer();
     $http.post(voteUrl, vote).then(function (data, status) {
      var activeVote = new Vote(data.data.id, data.data.voteSubjectId, data.data.vote_res, data.data.user_id, data.data.has_been_vote);
      votes.push(activeVote);
      async.resolve(votes);
    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;

  }


  function getAllVotes() {
    var async = $q.defer();
    $http.get(voteUrl).then(function (response) {

      votes = response.data;
      // var relevantVote = votes.filter(function (el) {
      //   return el.committee_id == committee_id;
      // });
     
      async.resolve(votes);


    }, function (error) {
      $log.error(error);

      async.reject("failed to load proposals");
    });


    return async.promise;
  }





  function getAll(committee_id) {
    var async = $q.defer();
    $http.get(voteProposalUrl).then(function (response) {

      votesSubjects = response.data;
      var relevantSubject = votesSubjects.filter(function (el) {
        return el.committee_id == committee_id;
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
    getAllVotes : getAllVotes,
    addVoteSubject: addVoteSubject,
    addVote: addVote,
    deleteVoteSubject: deleteVoteSubject

  }






});