(function($){
  'use strict';

  var currentVittle;

  var cancelVittle = function(){
    if (currentVittle){
      currentVittle.abortRequest();
      currentVittle = null;
    }
  };

  var onProductHover = function(){
    cancelVittle();
    Preview.showSpinner();

    currentVittle = new Vittle(this);

    currentVittle.getImageUrl().then(
      function(url){
        Preview.showImage(url);
      },
      function(){
        Preview.showFail();
      }
    );
  };

  // http://cherne.net/brian/resources/jquery.hoverIntent.html
  $('body').hoverIntent({
    selector: '#menu [name="product"],#mostOrderedItems td.main a,#mostLikedItems td.main a',
    sensitivity: 4,
    over: onProductHover,
    out: function(){
      Preview.hide();
      cancelVittle();
    }
  });
})(jQuery);
