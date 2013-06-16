(function($){
  'use strict';

  var $menu = $('#menu'),
    currentVittle;

  var cancelVittle = function(){
    if (currentVittle){
      currentVittle.abortRequest();
      currentVittle = null;
      console.log('canceled');
    }
  };

  var onProductHover = function(){
    cancelVittle();
    Preview.showSpinner();

    currentVittle = new Vittle(this);
    console.log(currentVittle.tokens());

    currentVittle.getImageUrl().then(
      function(url){
        console.log(url);
        Preview.showImage(url);
      },
      function(error){
        console.log(error);
        Preview.hide();
      }
    );
  };

  // http://cherne.net/brian/resources/jquery.hoverIntent.html
  $menu.hoverIntent({
    selector: '[name="product"]',
    sensitivity: 4,
    over: onProductHover,
    out: function(){
      Preview.hide();
      cancelVittle();
    }
  });
})(jQuery);
