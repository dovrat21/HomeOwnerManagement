app.controller("messageCtrl", function ($scope, $rootScope, $http, $location, messageService, userService) {



    $scope.messages = [];
    $scope.currentUser = function () {
      return userService.getActiveUser();
    }
  
    $scope.query = "";
     // $scope.orderByDate = function() {
    //   $scope.messages.sort(function(a, b) {
    //     return (new Date(b.date)) - (new Date(a.date))
    //   })
  
    // }
  
    $scope.showImportantMessages = function () {
      $scope.query = "important";
  
    };
    $scope.showDefaultMessages = function () {
      $scope.query = "default";
  
    };
    $scope.showAll = function () {
      $scope.query = "";
  
    };
  
  
  
    $scope.filterMessages = function (message) {
      if (message.body) {
       
        if ($scope.query == "important") {
          if (message.priority === "important") {
            return true;
          }
  
        } else if ($scope.query == "default") {
          if (message.priority === "default") {
            return true;
          }
        } else if ($scope.query == "") {
          return true
  
        }
        else {
          
            if (message.body.toLowerCase().includes($scope.query.toLowerCase()) ||
              message.title.toLowerCase().includes($scope.query.toLowerCase())) {
              return true;
            } else {
              return false;
            }
         
        }
      }
    }
  
  
  
  
  
    $scope.addMessage = function (message) {
      var userId = $scope.currentUser.id;
      var userCommunity = $scope.currentUser.committee_id;
      messageService.addMessage(message, userId, userCommunity).then(function (responseMessages) {
        $scope.messages = responseMessages;
        $scope.message.title = "";
        $scope.message.body = "";
  
  
      }, function (error) {
  
        $log.error(error);
      });
  
  
    };
  
    $scope.deleteMessage = function (messageId) {
      messageService.deleteMessage(messageId).then(function (responseMessages) {
        $scope.messages = responseMessages;
        // $location.path('/');
      }, function (error) {
  
        $log.error(error);
      });
  
  
    };
  
  
  
  
  
  
    messageService.getAll().then(function (messages) {
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
  
    }, function (error) {
      $log.error(error);
    });
  });