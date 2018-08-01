app.factory("userService", function($http, $log, $q) {

  var activeUser = null;
    var users = [];
    var userUrl="https://my-homeownre-db.herokuapp.com/users";
  
    function User(id,first_name, last_name, email, city , street, house_number, password, password_confirmation, isManager ) {
      this.id=id;
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


    function isLoggedIn() {
      return activeUser ? true : false;
  }

  function logout() {
      activeUser = null;
  }

 function getActiveUser(){
   return activeUser;
 }

    function getAll() {
        var async = $q.defer();
    $http.get(userUrl).then(function(response) {
      users=response.data;
             
            async.resolve(users);
            }, function(error) {
              $log.error(error);
             
              async.reject("failed to load cars.json");
            });
       
          
        return async.promise;
      }
  
      function login(email, password) {
        var async = $q.defer();

        var loginURL = userUrl +"?email=" + email + "&password=" + password;
        $http.get(loginURL).then(function(response) {
            if (response.data.length > 0) {
                activeUser = new User(response.data[0].id, response.data[0].first_name, response.data[0].last_name, response.data[0].email, response.data[0].city, response.data[0].street, response.data[0].house_number, response.data[0].password,response.data[0].password_confirmation, response.data[0].isManager);
                async.resolve(activeUser);
            } else {
                async.reject("invalid credentials");
            }
        }, function(err) {
            async.reject(err);
        });

        return async.promise;
    }

   
    function addUser(user) {
       var async = $q.defer();
  
      user.isManager= users.length==1? true: false;
     
      
      $http.post(userUrl,user).then( function(data,status) {
        
        var user = new User(data.data.first_name, data.data.last_name, data.data.email, data.data.city, data.data.street, data.data.house_number, data.data.password, data.data.password_confirmation, data.data.isManager);
        user.isManager= users.length===0? true: false;
        users.push(user);
        async.resolve(user);
      }, function(error) {
        console.error(error);
        async.reject("failed to load cars.json");
      });
  
      return async.promise;
    
  
    }
  
    return {

   login : login,
   getActiveUser: getActiveUser,
   isLoggedIn, isLoggedIn,
   logout : logout,
    getAll: getAll,
    addUser: addUser
  
    }
  
  });