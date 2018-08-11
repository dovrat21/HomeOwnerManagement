app.factory("messageService", function ($http, $log, $q) {

  var messaages = [];
  var activeMessage = null;
  // var userUrl="https://my-homeownre-db.herokuapp.com/users";
  // var messageUrl="https://my-homeownre-db.herokuapp.com/messages";
  var messageUrl = "https://dovrat-project.herokuapp.com/messages";
  // https://my-homeowner-db.herokuapp.com/users

  function Message(id, title, body, priority, from,committee_id, date) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.priority = priority;
    this.from = from;
    this.committee_id = committee_id;
    this.date = date;

  }
  
function deleteMessage(messageId)
{
  var messageToDelte="https://dovrat-project.herokuapp.com/messages/"
  var async = $q.defer();
  // $http.delete(messageUrl, {params: {id: messageId}}).then(function (data, status) {
    $http.delete(messageToDelte + messageId).then(function (data, status) {
    messaages=getAll();
    async.resolve(messaages);
  }, function (error) {
    console.error(error);
    async.reject("failed to load cars.json");
  });

  return async.promise;
 
}

  function addMessage(message) {
    var async = $q.defer();
       $http.post(messageUrl, message).then(function (data, status) {
       var activeMessage = new Message(data.data);
       messaages.push(activeMessage.id);
       async.resolve(messaages);
    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;
   
  }


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
    addMessage: addMessage,
    deleteMessage :deleteMessage

  }






});