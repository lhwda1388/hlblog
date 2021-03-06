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
    },
    convertDate : function(dateStr){
      var fullDate = new Date(dateStr);
      var year = fullDate.getFullYear();
      var month = fullDate.getMonth() + 1;
      var date = fullDate.getDate();
      if(month < 10) month = "0".concat(month);
      if(date < 10) date = "0".concat(date);

      return year + "." + month + "." + date;
    },
    imgUpload : function(file, editor, welEditable){
      var formData = new FormData();
      formData.append("uploadFile", file);
      $("#form1").ajaxSubmit({
  			type : "post",
  			url : "/etcs/imageUpload",
  			data : {},
  			success : function(data){
          if(data.resCode == "0000"){
                editor.insertImage(welEditable, data.url);
          }
  			}
  		});
     /* $.ajax({
          data : formData,
          type : "POST",
          url : "/imageUpload",
          cache : false,
          contentType : false,
          processData : false,
          success : function(data) {
              if(data.resCode == "0000"){
                editor.insertImage(welEditable, data.url);
              }
          }
      });
      */

    },
    setBodyScrollH : function (standardCls, targetCls){
  		var standard_h = $(standardCls).height();
  		var target_h   = $(targetCls).height();
  		//if(target_h < standard_h) $(targetCls).height(standard_h);
	 }
  }
})();
