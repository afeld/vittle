(function($){
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

  window.Preview = {
    showImage: function(url){
      $thumb.attr('src', url);
      this.show();
    },
    clearImage: function(){
      $thumb.attr('src', '');
    },
    showSpinner: function(){
      this.clearImage();
      this.show();
    },
    show: function(){
      $thumb.show();
    },
    hide: function(){
      $thumb.hide();
    }
  };
})(jQuery);
