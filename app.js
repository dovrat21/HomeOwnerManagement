var app = angular.module("HomeApp", ["ngRoute"]);



app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
   
  })
  .when('/signUp', {
    templateUrl: 'Users/signUp.html',
    controller: 'userCtrl'
  })
  .when('/personalPage', {
    templateUrl: 'Users/personalPage.html',
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
