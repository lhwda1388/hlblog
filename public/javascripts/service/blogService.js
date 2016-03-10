var defaultPath = $(document.body).attr("data-defaultPath");
var config = {
    list : "/" + defaultPath + "/post/getPost",
    view : "/" + defaultPath + "/post/view/viewPost",
    save : "/" + defaultPath + "/post/set/setPost"
};
(function(config){
  'use strict';
  var app = blogctrl.app;
  var defaultPath = $(document.body).attr("data-defaultPath");
  app.factory('BlogService', ['$http', function ($http) {
    return {
      getList: function($scope) {

        var convtParam = JSON.stringify($scope.postInfo);
        $http.post($scope.postInfo.getListPath, convtParam).success(function(response){
          var count = parseInt(response.count);
          $scope.postlist     = {};
          $scope.postlist.data  = response.post;
          $scope.BlogService.getPager(parseInt($scope.postInfo.page_no), count, $scope);
        })
        .error(function(e){
        });

      },
      getPager: function(pageNo, totRecord, $scope){

        var blockSize = 1;
        var currentPage = pageNo == undefined ? 1 : pageNo;
        var recordSize = parseInt($scope.postInfo.listScale);
        var totalPage = Math.ceil(totRecord/recordSize);

        $('.pager').bootpag().off("page");
        $('.pager').bootpag({
          total: totalPage,
          page: currentPage,
          maxVisible: blockSize,
          leaps: false,
          wrapClass: 'pagination',
          activeClass: 'active',
          disabledClass: 'disabled',
          next: 'Older Posts &rarr;',
          prev: '&larr;Newer Posts',
          nextClass: 'next',
          prevClass: 'previous',
         }).on("page", function(event,  num){
           $scope.postInfo.page_no = num;
           $scope.BlogService.getList($scope);
         });

      }

    };
  }]);

})(config);
