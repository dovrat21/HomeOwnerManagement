app.controller("loginCtrl", function ($scope, $rootScope, $http, $location, userService) {


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












//     $scope.users = [];
//     $scope.invalidLogin = false;
//     $scope.isLoggedIn=false;
//    $scope.currentUser=null;
//     userService.getAll().then(function(users) {
//       $scope.users = users;

//     }, function(error) {
//       $log.error(error);
//     })

//   $scope.currentuser=$scope.users[0];



//  $scope.login = function(user){
//     $scope.invalidLogin = false;
//     userService.getAll().then(function(users) {
//         $scope.users = users;
//         var tenantList1 = users.filter(person => person.email === user.email);
//         var tenantList2 = users.filter(person => person.password === user.password);

//        if (tenantList2.length>0)
//        {
//            $scope.currentUser=user;
//         //    $location.path('/');

//        }
//        else
//        {
//            alert($scope.invalidLogin);
//            $scope.invalidLogin = true;
//         // $("#myModal").modal('show');

//        }

//       }, function(error) {
//         $scope.invalidLogin = true;
//         $log.error(error);
//       })



//  };

//   $scope.addUser = function(user) {
//     $scope.invalidLogin = false;
//       userService.addUser(user).then(function(users) {
//         $scope.users = users;
//         // $location.path('/');
//                  }, function(error) {
//                     $scope.invalidLogin = true;
//         $log.error(error);
//       });

//       $scope.searchText = "";
//       $scope.searchResults = [];
//       $scope.isLoggedIn=true;


//     };


//     $(function () {
//     $('.button-checkbox').each(function () {

//         // Settings
//         var $widget = $(this),
//             $button = $widget.find('button'),
//             $checkbox = $widget.find('input:checkbox'),
//             color = $button.data('color'),
//             settings = {
//                 on: {
//                     icon: 'glyphicon glyphicon-check'
//                 },
//                 off: {
//                     icon: 'glyphicon glyphicon-unchecked'
//                 }
//             };

//         // Event Handlers
//         $button.on('click', function () {
//             $checkbox.prop('checked', !$checkbox.is(':checked'));
//             $checkbox.triggerHandler('change');
//             updateDisplay();
//         });
//         $checkbox.on('change', function () {
//             updateDisplay();
//         });

//         // Actions
//         function updateDisplay() {
//             var isChecked = $checkbox.is(':checked');

//             // Set the button's state
//             $button.data('state', (isChecked) ? "on" : "off");

//             // Set the button's icon
//             $button.find('.state-icon')
//                 .removeClass()
//                 .addClass('state-icon ' + settings[$button.data('state')].icon);

//             // Update the button's color
//             if (isChecked) {
//                 $button
//                     .removeClass('btn-default')
//                     .addClass('btn-' + color + ' active');
//             }
//             else {
//                 $button
//                     .removeClass('btn-' + color + ' active')
//                     .addClass('btn-default');
//             }
//         }

//         // Initialization
//         function init() {

//             updateDisplay();

//             // Inject the icon if applicable
//             if ($button.find('.state-icon').length == 0) {
//                 $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
//             }
//         }
//         init();
//     });
// });

//   });


