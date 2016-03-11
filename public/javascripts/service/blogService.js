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
        var blockSize = 3;
        var listscale = parseInt($scope.postInfo.listScale);
        var totPage = Math.ceil(totRecord/listscale);
        hlUtil.pager.settings = {
          page_no : pageNo,
          blockSize : blockSize,
          listscale : listscale,
          totCnt : totRecord,
          totPage : totPage,
          next : 'Newer',
          prev : 'Older',
          nextClass : 'next',
          prevClass : 'previous',
          rootId : 'paging',
          numUse : false
        };
        hlUtil.pager.pageRender();

        $("#".concat(settings.rootId)).find("li").on("page",function(event,page){
            alert(page)
        });

      }

    };
  }]);

})(config);
