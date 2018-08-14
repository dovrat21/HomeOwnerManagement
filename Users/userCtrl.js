
app.controller("userCtrl", function ($scope,$log, $rootScope, $http, $location, userService) {

   


    $scope.users = [];
    $scope.invalidLogin = false;
    $scope.isLoggedIn = false;
    $scope.currentUser = null;
    $scope.userToUpdate = null;

    $scope.currentUser = function () {
        return userService.getActiveUser();
      }


    $scope.sendUserToUpdate = function (user) {
        $scope.userToUpdate = user;

    }


    $scope.deleteUser = function (userId) {
        userService.deleteUser(userId).then(function (responseMessages) {
            $scope.users = responseMessages;
        }, function (error) {

            $log.error(error);
        });
    }

    $scope.update = function (userId, user) {
        user.image_url = $scope.userToUpdate.image_url;
        userService.update(userId, user, $scope.userToUpdate).then(function (responseMessages) {
            $scope.users = responseMessages;
            $scope.userToUpdate = null;
            $scope.user = null;
        }, function (error) {

            $log.error(error);
        });
    }

    userService.getAll().then(function (users) {
        if ($scope.userToUpdate === null || $scope.userToUpdate === undefined) {
            $scope.users = users;

        }
        else {
            $scope.users = $scope.userToUpdate;

        }

    }, function (error) {
        $log.error(error);
    })

    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'Dynamic Group Header - 1',
            content: 'Dynamic Group Body - 1'
        },
        {
            title: 'Dynamic Group Header - 2',
            content: 'Dynamic Group Body - 2'
        }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
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


