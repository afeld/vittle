(function($){
  'use strict';

  var $thumb = $('<img/>'),
    spinnerUrl = chrome.extension.getURL('assets/ajax-loader.gif');

  $thumb.css({
    position: 'fixed',
    bottom: 0,
    left: 0,
    'background-color': 'white',
    'background-image': 'url("' + spinnerUrl + '")',
    'background-position': 'center center',
    'background-repeat': 'no-repeat',
    'min-width': '50px',
    'min-height': '50px',
    'max-width': '220px'
  });

  $thumb.appendTo('body');

  var $menu = $('#menu'),
    currentVittle;

  var cancelVittle = function(){
    $thumb.attr('src', '');

    if (currentVittle){
      currentVittle.abortRequest();
      currentVittle = null;
      console.log('canceled');
    }
  };

  var onProductHover = function(){
    cancelVittle();
    // show the spinner
    $thumb.show();

    currentVittle = new Vittle(this);
    console.log(currentVittle.tokens());

    currentVittle.getImageUrl().then(
      function(url){
        console.log(url);
        $thumb.attr('src', url);
      },
      function(error){
        console.log(error);
        // hide the spinner
        $thumb.hide();
      }
    );
  };

  // http://cherne.net/brian/resources/jquery.hoverIntent.html
  $menu.hoverIntent({
    selector: '[name="product"]',
    sensitivity: 4,
    over: onProductHover,
    out: function(){
      cancelVittle();
      $thumb.hide();
    }
  });
})(jQuery);
