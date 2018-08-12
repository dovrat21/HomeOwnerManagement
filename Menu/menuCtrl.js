app.controller("menuCtrl", function($scope, userService, $location) {
    
   
    $scope.currentUser=userService.getActiveUser();

    $scope.isActive = function (viewLocation) { 
        // alert(viewLocation);
        // alert($location.path());

        // return viewLocation === $location.path();
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