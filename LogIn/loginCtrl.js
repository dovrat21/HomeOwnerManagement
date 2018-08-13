app.controller("loginCtrl", function ($scope,$log, $rootScope, $http, $location, userService) {


    $scope.email = "";
    $scope.password = "";
    $scope.invalidLogin = false;
    $scope.activeUser = null;

    $scope.currentUser = function () {
        return userService.getActiveUser();
    }

    $scope.user = {};
    $scope.user.isManager = true;


    $scope.signup = function (user) {
        $scope.invalidLogin = false;
        user.image_url = $scope.image.dataURL;
        $scope.invalidLogin = false;
        userService.addUser(user).then(function (resUser) {
        // $scope.activeUser = resUser.id;
            if ($scope.currentUser() === null)//otherwize he just add other tannent. he is stiil the active user
            {
                $scope.activeUser = resUser;
            }
            else{
                $scope.activeUser=$scope.currentUser();

            }
        $location.path('/tenantsList');
       
        }, function (error) {
            $scope.invalidLogin = true;
            $log.error(error);
        });
        $scope.isLoggedIn = true;

    };



    $scope.login = function () {
        $scope.invalidLogin = false;
        userService.login($scope.email, $scope.password).then(function (activeUser) {
            $scope.activeUser = activeUser;
            $location.path("/");
        }, function (error) {
            $scope.invalidLogin = true;
            $log.error(error);
        });


        $scope.isLoggedIn = true;
    };


})












