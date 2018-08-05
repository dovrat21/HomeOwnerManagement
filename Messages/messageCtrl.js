app.controller("messageCtrl", function($scope, $rootScope, $http, $location, messageService, userService) {


    
    $scope.messages = [];
    $scope.currentUser=userService.getActiveUser();
    
    $scope.addMessage = function(message) {
      var userId=$scope.currentUser.id;
      var userCommunity=$scope.currentUser.committee_id;
      messageService.addMessage(message,userId,userCommunity).then(function(responseMessages) {
          $scope.messages = responseMessages;
          // $location.path('/');
                   }, function(error) {
                    
          $log.error(error);
        });
    
     
      };








   
    messageService.getAll().then(function(messages) {
      $scope.messages = messages;

    //   messages.forEach(function(message) {
    //    var fromCummunity=message.from;
    //      $http.get(imageUrl).then(function(response) {
       
    //    var dogImg = response.data.message[0];
    //        var dogImgAlt = response.data.message[1];
           
    //        var dogObj = new Dog(dogType, dogImg, dogImgAlt);
    //         dogs.push(dogObj);
         
    //        async.resolve(dogs);
      
    //  }, function(error) {
    //    console.error(error);
    //    async.reject("failed to load cars.json");
    //  });
        
    // });
   
    }, function(error) {
      $log.error(error);
    });
});