var app = angular.module("HomeApp", ["ngRoute"]);



app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
   
  })
  .when('/signUp', {
    templateUrl: 'signUp/signUp.html',
    controller: 'signUpCtrl'
  })
//   .when('/movies', {
//     templateUrl: 'Movies/movies.html',
//     controller: 'movieCtrl'
//   })
//      .when('/movies/:movieId', {
//     templateUrl: 'Movies/movieDetail.html',
//     controller: 'movieDetailsCtrl'
//   })
  
  .otherwise({
    redirectTo: '/'
  })
})
