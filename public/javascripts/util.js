var hlUtil = (function($){
  'use strict'
  var method = {};
  method.pager = {
    settings : {
                page_no : 1,
                blockSize : 1,
                listscale : 3,
                totCnt : 1,
                totPage : 1,
                next : 'Newer',
                prev : 'Older',
                nextClass : 'next',
                prevClass : 'previous',
                rootId : 'pager',
                numUse : false
    },
    pageRender : function(){
      var p = [];
      var settings = this.settings;
      var $this = this;
      var pd = settings.page_no == 1 ? "disabled" : "";
      var nd = settings.page_no >= settings.totPage ? "disabled" : "";
      var pno = settings.page_no > 1 ? (settings.page_no - 1) : 1;
      var nno = settings.page_no < settings.totPage ? (settings.page_no + 1) : settings.totPage;
      var fp = settings.page_no - ( ( settings.page_no - 1 ) % settings.blockSize );
      var lp = fp + ( settings.blockSize - 1 );

      if(settings.prev){
          p = p.concat(['<li data-pnum="', pno ,'" class="', settings.prevClass , ' ' , pd ,'"><a href="','javascript:void(0)','">', settings.prev , '</a></li>' ]);
      }
      if(settings.numUse){
        for(var i=fp; i < lp; i++){
          p = p.concat(['<li data-pnum="', i ,'" class=""><a href="','javascript:void(0)','">', i , '</a></li>' ]);
        }
      }
      if(settings.next){
        p = p.concat(['<li data-pnum="', nno ,'" class="', settings.nextClass , ' ' , nd ,'"><a href="','javascript:void(0)','">', settings.next , '</a></li>' ]);
      }
      var rootDoc = $("#".concat(settings.rootId));
      rootDoc.html(p.join(''));

      $("#".concat(settings.rootId)).find("li").click(function(){
        var page = $(this).attr("data-pnum");
        $(this).trigger("page",page);
      });


    }

  }
  return method;

})(jQuery);
