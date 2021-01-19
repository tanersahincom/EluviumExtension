import * as $ from 'jquery';
var randomizeInputValue = function(el){
  if ($(el).length != 0){
    switch( $(el)[0].nodeName.toLowerCase() ) {
      case "input":
        var type = $(el).attr('type');
        var value = username;
        if(type == 'password')
        {
          value = password;
        }
        $(el).focus().val(value);
        break;
    }  
  }
};

chrome.runtime.sendMessage({
}, function(){
  $("input:enabled").not(':button,:hidden,input[type=submit],input[readonly]').each(function(){
    randomizeInputValue(this);
  }); 
});  