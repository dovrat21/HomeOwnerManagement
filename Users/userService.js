app.factory("userService", function($http, $log, $q) {

     
    var users = [];
  
    function User(first_name, last_name, email, city , street, house_number, password, password_confirmation, isManager ) {
      this.first_name = first_name;
      this.last_namel = last_name;
      this.email = email;
      this.city = city;
      this.street = street;
      this.house_number = house_number;
      this.password = password;
      this.password_confirmation = password_confirmation;
      this.isManager = isManager;
    }
  
//    $http.get('Users/users.json').then(function(response) {
//            response.data.forEach(function(plainObj) {
//           var user = new User(plainObj.name, plainObj.birthday, plainObj.imgUrl.replace("https://image.tmdb.org/t/p/w300", ""), plainObj.imdb);
//         //   actor.imgUrl = plainObj.imgUrl.replace("https://image.tmdb.org/t/p/w300", "");
//         //   actor.imdb = plainObj.imdb.replace("https://www.imdb.com/name/", "");
//           users.push(user);
//           });
//         }, function(error) {
//           $log.error(error);
//         });
    // This function loads all the actors into the actors array
    // function getAll() {
    //     var async = $q.defer();
    // $http.get(dogsApiUrl).then(function(response) {
    //          dogsType = Object.keys(response.data.message);
    //          dogsType.push("all");
    //          dogsType.sort();
    //         async.resolve(dogsType);
    //         }, function(error) {
    //           $log.error(error);
             
    //           async.reject("failed to load cars.json");
    //         });
       
          
    //     return async.promise;
    //   }
  
  
   
    function addUser(user) {
       var async = $q.defer();
  
      user.isManager= users.length==0? true: false;
      var user = new User(user.first_name, user.last_name, user.email, user.city, user.street, user.house_number, user.password, user.password_confirmation, user.isManager);
      users.push(user)
    //   $http.post(userUrl).then(function(response) {
    //     var user = new User(user.first_name, user.last_name, user.email, user.city, user.street, user.house_number, user.password, user.password_confirmation, user.isManager);
  
    //     users.push(user);
    //     async.resolve(users);
    //   }, function(error) {
    //     console.error(error);
    //     async.reject("failed to load cars.json");
    //   });
  
    //   return async.promise;
    return users;
  
    }
  
    return {
   
    //   addAuser: getAll,
    addUser: addUser
  
    }
  
  });