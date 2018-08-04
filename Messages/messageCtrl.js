app.controller("messageCtrl", function($scope, $rootScope, $http, $location, messageService ) {


    
    $scope.messages = [];
   
    messageService.getAll().then(function(messages) {
      $scope.messages = messages;
  
    }, function(error) {
      $log.error(error);
    });
});