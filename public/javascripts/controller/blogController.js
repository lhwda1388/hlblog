
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
	$scope.postInfo.searchText  = util.getKeyVal("searchText");
    $scope.postlist = {};
    $scope.postlist.data  = {};
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

  }]).controller('postDetailCtrl', ['$scope' ,'BlogService', function ($scope, blogService) {

	$scope.postInfo = {};
	$scope.postInfo.getDataPath = window.location.pathname + "/getData";
	$scope.BlogService = blogService;
	blogService.getPostDetail($scope);

	$scope.replyList = {};
    $scope.replyList.data  = {};
	$scope.postInfo.getReplyListPath = window.location.pathname + "/getReplyList";
	blogService.getReplyList($scope);

    $scope.convertDate = function(dateStr){
      return util.convertDate(dateStr);
    }
	$scope.goReply = function(){
		var replyContent = document.reply_form.reply_content.value;
		$scope.postInfo.replyContent = replyContent;
		$scope.postInfo.setReplyPath = window.location.pathname + "/setReply";
		blogService.setReply($scope);
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
  }]).controller('ModifyCtrl', ['$scope' ,'BlogService', function ($scope, blogService) {
	$scope.postInfo = {};
	$scope.postInfo.getDataPath = window.location.pathname + "/getData";
	$scope.BlogService = blogService;
	blogService.getModData($scope);

     $scope.init = function(obj) {

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


  }]).controller('categoryCtrl',['$scope' , 'BlogService', function ($scope, blogService) {
	var paramSText = util.getKeyVal("searchText");
	if(paramSText){
		paramSText = unescape(paramSText)
		$scope.searchText = paramSText;
	}
    $scope.goUrl = function(path, category_no){
		if(category_no){
			location.href = "/" + path + "?category_no=" + category_no;
		}else{
			location.href = "/" + path;
		}
    }
	$scope.goSearch = function(){
		
		var searchText  = escape(document.getElementById("searchText").value);
		var category_no = util.getKeyVal("category_no");
		
		var path = window.location.pathname;
		if(category_no){
			if(searchText){
				path += "?category_no="+category_no + "&searchText=" + searchText;
			}else{
				path += "?category_no="+category_no;
			}
		}else{
			if(searchText){
				path += "?searchText=" + searchText;
			}
		}
		location.href = path;
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
