var app = angular.module("HomeApp", ["ngRoute"]);



app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
   
  })
//   .when('/actors', {
//     templateUrl: 'Actor/actors.html',
//     controller: 'actorCtrl'
//   })
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
