(function($){
  'use strict';

  $('#menu').on('mouseenter', '[name="product"]', function(){
    var $el = $(this),
      text = $el.text();

    console.log('before: "' + text + '"');
    // remove leading/trailing whitespace and item number
    text = text.trim().replace(/^[\d\.]*\s*/, '');
    console.log('after: "' + text + '"');
  });
})(Zepto);
