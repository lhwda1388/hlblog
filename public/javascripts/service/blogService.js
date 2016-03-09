var defaultPath = $(document.body).attr("data-defaultPath");
var config = {
    list : "/" + defaultPath + "/post/getPost",
    view : "/" + defaultPath + "/post/view/viewPost",
    save : "/" + defaultPath + "/post/set/setPost"
};
(function(config){
  'use strict';
  var app = blogctrl.app;
  app.factory('BlogService', ['$http', function ($http) {
    return {
      getList: function(url, param, $scope) {

        var convtParam = JSON.stringify(param);
        var res = {};
        $http.post(url, convtParam).success(function(response){
          res =  response.post;
          $scope.postlist.data = response.post;
          $scope.postInfo.cnt  = response.cnt;
        })
        .error(function(e){
        });
        return res;
      }

    };
  }]);

})(config);
