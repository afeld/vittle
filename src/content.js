(function($){
  'use strict';

  $('#menu').on('mouseenter', '[name="product"]', _.debounce(function(){
    var vittle = new Vittle(this);
    console.log(vittle.tokens());
    vittle.getImageUrl(function(url){
      console.log(url);
    });
  }, 800));
})(Zepto);
