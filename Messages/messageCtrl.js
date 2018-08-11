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
  
    messageService.addMessage({title: message.title,body: message.body, priority:message.priority, from: $scope.currentUser().id, committee_id:$scope.currentUser().committee_id,
      date: newDate}).then(function (responseMessages) {
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
      var currentUsercommunity=$scope.currentUser().committee_id;
      var relevantmessages = messages.filter(function (el) {
        return el.committee_id == currentUsercommunity ;
      });
      $scope.messages = messages;
  }, function (error) {
    $log.error(error);
  });
});