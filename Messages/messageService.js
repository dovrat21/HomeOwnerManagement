app.factory("messageService", function($http, $log, $q) {
 
    var messaages = [];
    // var userUrl="https://my-homeownre-db.herokuapp.com/users";
    var messageUrl="https://my-homeownre-db.herokuapp.com/messages";
    // https://my-homeowner-db.herokuapp.com/users
  
    function Message(id, title, body, priority, from) {
      this.id=id;
      this.title = title;
      this.body = body;
      this.priority = priority;
      this.from =from;
      
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
    $http.get(messageUrl).then(function(response) {
      messaages=response.data;
             
            async.resolve(messaages);
            }, function(error) {
              $log.error(error);
             
              async.reject("failed to load cars.json");
            });
       
          
        return async.promise;
      }


      return {

         getAll: getAll,
      
         }






    });