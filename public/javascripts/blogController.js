(function(){

  var blogApp = angular.module('blogApp', []);

  var ctrl = blogApp.controller('IndexBodyCtrl', ['$scope' , function ($scope) {
      alert('1');

  }]);
})();
