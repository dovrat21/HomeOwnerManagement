app.controller("menuCtrl", function($scope, userService, $location) {
    $scope.currentUser=userService.getActiveUser();
   
    $scope.currentUser=function(){
        return userService.getActiveUser();
    }
    
    $scope.isUserLoggedIn = function() {
        return userService.isLoggedIn();
    }

    $scope.logout = function() {
        userService.logout();
        $location.path("/");
    }
})