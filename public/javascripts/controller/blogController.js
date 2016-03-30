
var blogctrl = (function(){
  'use strict';
  var app = angular.module('blogApp', ['summernote']);
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
    $scope.postInfo.post_no = 1;
    $scope.postInfo.category_no = util.getKeyVal("category_no");
    $scope.postlist = {};
    $scope.postlist.data  = {};
    $scope.postInfo.search_text = "";
    $scope.postInfo.getListPath = "/" + defaultPath + "/post/getPost";
    $scope.BlogService = blogService;

    blogService.getList($scope);

    $scope.convertDate = function(dateStr){
      return util.convertDate(dateStr);
    }

    $scope.postDelete = function(post_no){
      $scope.postInfo.deletePath = "/" + defaultPath + "/post/deletePost";
      $scope.postInfo.post_no = post_no;
      blogService.postDelete($scope);
    }

  }]).controller('postDetailCtrl', ['$scope', function ($scope) {
    $scope.convertDate = function(dateStr){
      return util.convertDate(dateStr);
    }
  }]).controller('RegistCtrl', ['$scope' ,'BlogService', function ($scope, blogService) {
     $scope.init = function() {

     };
     $scope.enter = function() {

     };
     $scope.focus = function(e) {

     };
     $scope.blur = function(e) {

     };
     $scope.paste = function() {

     };
     $scope.change = function(contents) {
       $scope.content = contents;
       //console.log('contents are changed:', contents, $scope.editable);
     };
     $scope.keyup = function(e) {
       //console.log('Key is released:', e.keyCode);
     };
     $scope.keydown = function(e) {
       //console.log('Key is pressed:', e.keyCode);
     };
     $scope.imageUpload = function(files, editor) {
       //console.log('image upload:', files, editor);
       //console.log('image upload\'s editable:', $scope.editable);
     };
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


  }]).controller('modalCtrl', ['$scope' , function ($scope) {


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
