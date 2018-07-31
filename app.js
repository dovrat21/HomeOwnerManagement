var app = angular.module("HomeApp", ["ngRoute"]);



app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
    controller: 'userCtrl'
   
  })
  .when('/signUp', {
    templateUrl: 'Users/signUp.html',
    controller: 'userCtrl'
  })
  .when('/personalPage', {
    templateUrl: 'Users/personalPage.html',
    controller: 'userCtrl'
    
  })
  .when('/login', {
    templateUrl: 'Users/login.html',
    controller: 'userCtrl'
    
  })
//      .when('/movies/:movieId', {
//     templateUrl: 'Movies/movieDetail.html',
//     controller: 'movieDetailsCtrl'
//   })
  
  .otherwise({
    redirectTo: '/'
  })
})
