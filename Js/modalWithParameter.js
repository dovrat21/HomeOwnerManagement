var app = angular.module('modalWithParameter', []);

// this represents the state of the dialog: a visible flag and the person being edited
// var EditPersonDialogModel = function () {
//   this.visible = false;
// };
// EditPersonDialogModel.prototype.open = function(vote) {
//   this.vote = vote;
//   this.visible = true;
// };
// EditPersonDialogModel.prototype.close = function() {
//   this.visible = false;
// };

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