
var blogctrl = (function(){
  'use strict';
  var app = angular.module('blogApp', []);

  app.controller('postCtrl', ['$scope' ,'BlogService', function ($scope, blogService) {
    $scope.postInfo = {};
    $scope.postInfo.page_no = 1;
    $scope.postInfo.listScale = 10;
    $scope.postInfo.board_no = 1;
    $scope.postInfo.search_text = "";
    blogService.getList($scope.postInfo);
  }]).controller('naviCtrl', ['$scope' ,  function ($scope) {


  }]).controller('categoryCtrl', ['$scope' , function ($scope) {


  }]).controller('footerCtrl', ['$scope' , function ($scope) {


  }]);

  return {
    app : app
  };

})();
