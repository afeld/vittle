(function($){
  'use strict';

  var $thumb = $('<img/>'),
    spinnerUrl = chrome.extension.getURL('assets/ajax-loader.gif'),
    failUrl = chrome.extension.getURL('assets/red-x.svg');

  $thumb.css({
    position: 'fixed',
    bottom: 0,
    left: 0,
    border: '1px solid black',
    'background-color': 'white',
    'background-position': 'center center',
    'background-repeat': 'no-repeat',
    'background-size': '16px', // size of the ajax-loader
    'box-shadow': '0 0 15px 3px',
    'min-width': '50px',
    'min-height': '50px',
    'max-width': '220px',
    'max-height': '210px'
  });

  $thumb.appendTo('body');

  // singleton
  window.Preview = {
    showImage: function(url){
      $thumb.attr('src', url);
      this.show();
    },
    clearImage: function(){
      $thumb.attr('src', '');
    },
    showSpinner: function(){
      this.setBackgroundImage(spinnerUrl);
      this.clearImage();
      this.show();
    },
    showFail: function(){
      this.setBackgroundImage(failUrl);
      this.show();
    },
    setBackgroundImage: function(url){
      $thumb.css('background-image', 'url("' + url + '")');
    },
    show: function(){
      $thumb.show();
    },
    hide: function(){
      $thumb.hide();
    }
  };

  // hide it initially
  Preview.hide();
})(jQuery);
