app.factory("messageService", function ($http, $log, $q) {

  var messaages = [];
  var activeMessage = null;
  // var userUrl="https://my-homeownre-db.herokuapp.com/users";
  // var messageUrl="https://my-homeownre-db.herokuapp.com/messages";
  var messageUrl = "https://dovrat-project.herokuapp.com/messages";
  // https://my-homeowner-db.herokuapp.com/users

  function Message(id, title, body, priority, from,committee_id,date) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.priority = priority;
    this.from = from;
    this.committee_id = committee_id;
    this.date = date;

  }
  

  function addMessage(message, userId, userCommunity) {
    var async = $q.defer();

    $http.post(messageUrl, message).then(function (data, status) {

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
      activeMessage = new Message(data.data.id, data.data.title, data.data.body, data.data.priority, userId, userCommunity, newDate);
     
      messaages.push(activeMessage);
      async.resolve(messaages);
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
    $http.get(messageUrl).then(function (response) {
      messaages = response.data;


      async.resolve(messaages);
    }, function (error) {
      $log.error(error);

      async.reject("failed to load cars.json");
    });


    return async.promise;
  }


  return {

    getAll: getAll,
    addMessage: addMessage

  }






});