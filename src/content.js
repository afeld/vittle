(function($){
  'use strict';

  var SELECTORS = {
    'seamless': '#menu [name="product"],#mostOrderedItems td.main a,#mostLikedItems td.main a',
    'menupages': '#restaurant-menu th',
    'foursquare': '#venueMenu .entry .title'
  };

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

  var domainParts = window.location.host.split('.'),
    secondLevelDomain = domainParts[domainParts.length - 2],
    selector = SELECTORS[secondLevelDomain];

  if (!selector){
    console.warn('could not find selector for ' + secondLevelDomain);
  }

  // http://cherne.net/brian/resources/jquery.hoverIntent.html
  $('body').hoverIntent({
    selector: selector,
    sensitivity: 4,
    over: onProductHover,
    out: function(){
      Preview.hide();
      cancelVittle();
    }
  });
})(jQuery);
