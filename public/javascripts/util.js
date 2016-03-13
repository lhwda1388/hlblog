var util = (function(){
  return {
    getKeyVal : function(key){
      var urlKeyVal = {};
      var searhString = window.location.search.substring(1);
      var asQuery = searhString.split("&")
      for(var i= 0; i < asQuery.length; i++){
        var asKeyVal = asQuery[i].split("=");
        urlKeyVal[asKeyVal[0]] = asKeyVal[1];
      }
      if(urlKeyVal[key])
      return urlKeyVal[key];
    },
    isValidate: function(formPath){
      var chk = true;
      $(formPath).find(".help-block").hide();
      $(formPath).find("input").each(function(i){
        if($(this).hasAttr("required") && $(this).val().length == 0){
          $(this).parent().find(".help-block").show();
          $(this).focus();
          chk = false;
          return false;
       }
      });
      return chk;
    }
  }
})();
