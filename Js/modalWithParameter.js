var app = angular.module('modalWithParameter', []);



var EditPersonDialogModel = function () {
    this.visible = false;
  };
  EditPersonDialogModel.prototype.open = function(person) {
    this.person = person;
    this.visible = true;
  };
  EditPersonDialogModel.prototype.close = function() {
    this.visible = false;
  };