(function($){
  'use strict';

  var $thumb = $('<img style="position:fixed; bottom:0; left:0; max-width: 220px;"/>');
  $thumb.appendTo('body');

  var $menu = $('#menu'),
    currentVittle;

  var cancelVittle = function(){
    if (currentVittle){
      currentVittle.abortRequest();
      currentVittle = null;
      console.log('canceled');
    }
  };

  $menu.on('mouseenter', '[name="product"]', _.debounce(function(){
    cancelVittle();

    currentVittle = new Vittle(this);
    console.log(currentVittle.tokens());

    currentVittle.getImageUrl().then(
      function(url){
        console.log(url);
        $thumb.attr('src', url);
        $thumb.show();
      },
      function(error){
        console.log(error);
      }
    );
  }, 800));

  $menu.on('mouseleave', 'li', function(){
    cancelVittle();
    $thumb.hide();
  });
})(jQuery);
