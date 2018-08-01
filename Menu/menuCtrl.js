app.controller("menuCtrl", function($scope, userService, $location) {
    $scope.isUserLoggedIn = function() {
        return userService.isLoggedIn();
    }

    $scope.logout = function() {
        userService.logout();
        $location.path("/");
    }
})