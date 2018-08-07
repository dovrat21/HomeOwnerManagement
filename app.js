var app = angular.module("HomeApp", ["ngRoute", "imageupload","ui.bootstrap"]);
// var app = angular.module("HomeApp", ["ngRoute",'ngAnimate', 'ngSanitize', 'ui.bootstrap']);


app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
    controller: 'menuCtrl'
      
  })
  .when('/signUp', {
    templateUrl: 'Login/signUp.html',
    controller: 'loginCtrl'
  })
  .when('/tenantsList', {
    templateUrl: 'Users/tenantsList.html',
    controller: 'userCtrl'
    
  })
  .when('/login', {
    templateUrl: 'Login/login.html',
    controller: 'loginCtrl'
    
  })
  .when('/messagesList', {
    templateUrl: 'Messages/messagesList.html',
    controller: 'messageCtrl'
    
  })
  .when('/vote', {
    templateUrl: 'Voting/votingList.html',
    controller: 'voteCtrl'
    
  })
//      .when('/movies/:movieId', {
//     templateUrl: 'Movies/movieDetail.html',
//     controller: 'movieDetailsCtrl'
//   })
  
  .otherwise({
    redirectTo: '/'
  })
})
