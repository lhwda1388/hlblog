var config = {
    list : "/post/getPost",
    view : "/post/view/viewPost",
    save : "/post/set/setPost"
};
(function(config){
  'use strict';
  var app = blogctrl.app;
  app.factory('BlogService', ['$http', function ($http) {
    return {
      getList: function(param) {
        var convtParam = JSON.stringify(param);
        $http.post(config.list, convtParam).success(function(data){

        })
        .error(function(e){})
      }

    };
  }]);

})(config);
