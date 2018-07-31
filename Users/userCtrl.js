
app.controller("userCtrl", function($scope, $rootScope, $http, $location, userService ) {


    
    $scope.users = [];
    $scope.invalidLogin = false;
    $scope.isLoggedIn=false;
   $scope.currentUser=null;
    userService.getAll().then(function(users) {
      $scope.users = users;
  
    }, function(error) {
      $log.error(error);
    })
  
//   $scope.currentuser=$scope.users[0];



 $scope.login = function(user){
    $scope.invalidLogin = false;
    userService.getAll().then(function(users) {
        $scope.users = users;
        var tenantList1 = users.filter(person => person.email === user.email);
        var tenantList2 = users.filter(person => person.password === user.password);
     
       if (tenantList2.length>0)
       {
           $scope.currentUser=user;
           $scope.invalidLogin = true;
           $location.path('/');

       }
       else
       {
           alert($scope.invalidLogin);
           $scope.invalidLogin = true;
        // $("#myModal").modal('show');

       }
    
      }, function(error) {
        $scope.invalidLogin = true;
        // $scope.invalidLogin = false;
        $log.error(error);
      })
     


 };
   
  $scope.addUser = function(user) {
      userService.addUser(user).then(function(users) {
        $scope.users = users;
        $scope.isLoggedIn=true;
        alert($scope.isLoggedIn);
        $location.path('/');

        alert($scope.isLoggedIn);
        $scope.isLoggedIn=true;
                 }, function(error) {
        $log.error(error);
      });
  
      $scope.searchText = "";
      $scope.searchResults = [];
      $scope.isLoggedIn=true;
  
  
    };
  

    $(function () {
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});
  
  });


