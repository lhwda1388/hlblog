
var blogctrl = (function(){
  'use strict';
  var app = angular.module('blogApp', []);
  var defaultPath = $(document.body).attr("data-defaultPath");

  app.controller('postCtrl', ['$scope' ,'BlogService', function ($scope, blogService) {
    $scope.postInfo = {};
    $scope.postInfo.page_no = 1;
    $scope.postInfo.listScale = 3;
    $scope.postInfo.board_no = 1;
    $scope.postlist = {};
    $scope.postlist.data  = {};
    $scope.postInfo.search_text = "";
    $scope.postInfo.getListPath = "/" + defaultPath + "/post/getPost";
    $scope.BlogService = blogService;

    blogService.getList( $scope);

    $scope.convertDate = function(dateStr){
      var fullDate = new Date(dateStr);
      var year = fullDate.getFullYear();
      var month = fullDate.getMonth() + 1;
      var date = fullDate.getDate();
      if(month < 10) month = "0".concat(month);

      return year + "." + month + "." + date;
    }

  }]).controller('naviCtrl', ['$scope' ,  function ($scope) {


  }]).controller('categoryCtrl', ['$scope' , function ($scope) {


  }]).controller('footerCtrl', ['$scope' , function ($scope) {


  }]);

  return {
    app : app
  };

})();
