app.factory("userService", function ($http, $log, $q) {

  var activeUser = null;
  var users = [];
  var userUrl = "https://dovrat-project.herokuapp.com/users";

  function User(id, first_name, last_name, email, city, street, house_number, appartment, committee_id, imageUrl, password, password_confirmation, isManager) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.city = city;
    this.street = street;
    this.house_number = house_number;
    this.appartment = appartment;
    this.committee_id = committee_id;
    this.imageUrl = imageUrl;
    this.password = password;
    this.password_confirmation = password_confirmation;
    this.isManager = isManager;
  }

  function isLoggedIn() {
    return activeUser ? true : false;
  }

  function logout() {
    activeUser = null;
  }

  function getActiveUser() {
    return activeUser;
  }

  function getAll() {
    var async = $q.defer();
    $http.get(userUrl).then(function (response) {
      users = response.data;
      var currentUsercommunity = getActiveUser().committee_id;
      var relevantUsers = users.filter(function (el) {
        return el.committee_id == currentUsercommunity;
      });

      async.resolve(relevantUsers);
    }, function (error) {
      $log.error(error);

      async.reject("failed to load cars.json");
    });


    return async.promise;
  }

  function login(email, password) {
    var async = $q.defer();

    var loginURL = userUrl + "?email=" + email + "&password=" + password;
    $http.get(loginURL).then(function (response) {

      if (response.data.length > 0) {
        activeUser = new User(response.data[0].id, response.data[0].first_name, response.data[0].last_name, response.data[0].email, response.data[0].city, response.data[0].street, response.data[0].house_number, response.data[0].appartment, response.data[0].committee_id, " ", response.data[0].password, response.data[0].password_confirmation, response.data[0].isManager);
        activeUser.image_url = response.data[0].image_url;
        activeUser.image_url = response.data[0].image_url;
        async.resolve(activeUser);
      } else {
        async.reject("invalid credentials");
      }
    }, function (err) {
      async.reject(err);
    });

    return async.promise;
  }
  function deleteUser(userId) {
    var urlToDelete = "https://dovrat-project.herokuapp.com/users/"
    var async = $q.defer();
    $http.delete(urlToDelete + userId).then(function (data, status) {
      users = getAll();
      async.resolve(users);
    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;

  }


  function addUser(user) {
    var async = $q.defer();

    $http.post(userUrl, user).then(function (data, status) {
        if (user.isManager) {
        activeUser = new User(data.data.id, data.data.first_name, data.data.last_name, data.data.email, data.data.city, data.data.street, data.data.house_number, data.data.appartment, data.data.committee_id, " ", data.data.password, data.data.password_confirmation, data.data.isManager);
        activeUser.image_url = data.data.image_url;
        users.push(activeUser);
        async.resolve(activeUser);
      }
      else {
        var userToAdd = new User(data.data.id, data.data.first_name, data.data.last_name, data.data.email, data.data.city, data.data.street, data.data.house_number, data.data.appartment, data.data.committee_id, " ", data.data.password, data.data.password_confirmation, data.data.isManager);
        userToAdd.image_url = data.data.image_url;
        users.push(userToAdd);
        async.resolve(userToAdd);
      }

    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;


  }




  function update(userId, userFixed, userOld) {
    var async = $q.defer();
    var urlToUpdate = "https://dovrat-project.herokuapp.com/users/";
    var updatedUser = new User(userId,
      userFixed.first_name === undefined ? userOld.first_name : userFixed.first_name,
      userFixed.last_name === undefined ? userOld.last_name : userFixed.last_name,
      userFixed.email === undefined ? userOld.email : userFixed.email,
      userFixed.city === undefined ? userOld.city : userFixed.city,
      userFixed.street === undefined ? userOld.street : userFixed.street,
      userFixed.house_number === undefined ? userOld.house_number : userFixed.house_number,
      userFixed.appartment === undefined ? userOld.appartment : userFixed.appartment,
      userFixed.committee_id === undefined ? userOld.committee_id : userFixed.committee_id,
      // userFixed.image_url===undefined? userOld.image_url:userFixed.image_url, 
      userFixed.password === undefined ? userOld.password : userFixed.password,
      userFixed.password_confirmation === undefined ? userOld.password_confirmation : userFixed.password_confirmation,
      userFixed.isManager === undefined ? userOld.isManager : userFixed.isManager);

    updatedUser.image_url = userOld.image_url;

    $http.put(urlToUpdate + userId, updatedUser).then(function (data, status) {


      var updateUser = new User(data.data.id, data.data.first_name, data.data.last_name, data.data.email, data.data.city, data.data.street, data.data.house_number, data.data.appartment, data.data.committee_id, data.data.imageUrl, data.data.password, data.data.password_confirmation, data.data.isManager);
      updateUser.image_url = data.data.image_url;
      users = getAll();
      async.resolve(users);
      async.resolve(activeUser);
    }, function (error) {
      console.error(error);
      async.reject("failed to load cars.json");
    });

    return async.promise;


  }


  return {

    login: login,
    deleteUser: deleteUser,
    update: update,
    getActiveUser: getActiveUser,
    isLoggedIn, isLoggedIn,
    logout: logout,
    getAll: getAll,
    addUser: addUser

  }

});