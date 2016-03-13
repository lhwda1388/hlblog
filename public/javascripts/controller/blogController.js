
var blogctrl = (function(){
  'use strict';
  var app = angular.module('blogApp', ['textAngular']);
  var defaultPath = $(document.body).attr("data-defaultPath");

  app.controller('indexCtrl', ['$scope' ,'BlogService', function ($scope, blogService) {
    $scope.blogUrlInfo = {};
    $scope.blogUrllist = {};
    $scope.blogUrllist.data  = {};
    $scope.blogUrlInfo.getListPath =  "/etcs/getBlogUrlList";
    blogService.getBlogUrlList($scope);

  }]).controller('postCtrl', ['$scope' ,'BlogService', function ($scope, blogService) {

    $scope.postInfo = {};
    $scope.postInfo.page_no = 1;
    $scope.postInfo.listScale = 3;
    $scope.postInfo.board_no = 1;
    $scope.postInfo.category_no = util.getKeyVal("category_no");
    $scope.postlist = {};
    $scope.postlist.data  = {};
    $scope.postInfo.search_text = "";
    $scope.postInfo.getListPath = "/" + defaultPath + "/post/getPost";
    $scope.BlogService = blogService;

    blogService.getList($scope);

    $scope.convertDate = function(dateStr){
      var fullDate = new Date(dateStr);
      var year = fullDate.getFullYear();
      var month = fullDate.getMonth() + 1;
      var date = fullDate.getDate();
      if(month < 10) month = "0".concat(month);

      return year + "." + month + "." + date;
    }

  }]).controller('RegistCtrl', ['$scope' ,'BlogService', function ($scope, blogService) {
    $scope.orightml = '';
    $scope.htmlcontent = $scope.orightml;
    $scope.disabled = false;
    $scope.BlogService = blogService;

  }]).controller('naviCtrl', ['$scope' ,  function ($scope) {


  }]).controller('categoryCtrl', ['$scope' , function ($scope) {
    $scope.goUrl = function(path, category_no){
      if(category_no){
        location.href = "/" + path + "?category_no=" + category_no;
      }else{
        location.href = "/" + path;
      }
    }

  }]).controller('footerCtrl', ['$scope' , function ($scope) {


  }]);

  app.filter('renderHtml', ['$sce', function($sce){
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }]);


  return {
    app : app
  };

})();
