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
  .when('/addAllTenants', {
    templateUrl: 'Users/addAllTenants.html',
    
  })
//      .when('/movies/:movieId', {
//     templateUrl: 'Movies/movieDetail.html',
//     controller: 'movieDetailsCtrl'
//   })
  
  .otherwise({
    redirectTo: '/'
  })
})
