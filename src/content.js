(function($){
  'use strict';

  var $thumb = $('<img style="position:fixed; bottom:0; left:0; max-width: 220px;"/>');
  $thumb.appendTo('body');

  $('#menu').on('mouseenter', '[name="product"]', _.debounce(function(){
    var vittle = new Vittle(this);
    console.log(vittle.tokens());
    vittle.getImageUrl(function(url){
      console.log(url);
      if (url){
        $thumb.attr('src', url);
      }
    });
  }, 800));
})(Zepto);
