var app = angular.module("HomeApp", ["ngRoute", "imageupload","ui.bootstrap.demo", "ui.bootstrap", "modalWithParameter", "chart.js"]);
// var app = angular.module("HomeApp", ["ngRoute",'ngAnimate', 'ngSanitize', 'ui.bootstrap']);


app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
    controller: 'menuCtrl'
      
  })
  .when('/signUp', {
    templateUrl: 'LogIn/signUp.html',
    controller: 'loginCtrl'
  })
  .when('/tenantsList', {
    templateUrl: 'Users/tenantsList.html',
    controller: 'userCtrl'
    
  })
  .when('/login', {
    templateUrl: 'LogIn/login.html',
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
