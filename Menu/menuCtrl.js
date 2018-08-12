app.controller("menuCtrl", function($scope, userService, $location) {
    
   
    

    $scope.isActive = function (viewLocation) { 
         return $location.path();

    };

    $scope.isUserLoggedIn = function() {
        return userService.isLoggedIn();
    }

    $scope.logout = function() {
        userService.logout();
        $location.path("/");
    }


   
    $scope.currentUser=function(){
        return userService.getActiveUser();
    }
    
   
})