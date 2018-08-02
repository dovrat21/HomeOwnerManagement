var app = angular.module("HomeApp", ["ngRoute", "imageupload"]);
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
//      .when('/movies/:movieId', {
//     templateUrl: 'Movies/movieDetail.html',
//     controller: 'movieDetailsCtrl'
//   })
  
  .otherwise({
    redirectTo: '/'
  })
})
