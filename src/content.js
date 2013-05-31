(function($){
  'use strict';

  $('#menu').on('mouseenter', '[name="product"]', function(){
    var vittle = new Vittle(this);
    console.log(vittle.tokens());
  });
})(Zepto);
