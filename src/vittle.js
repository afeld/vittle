(function($){
  'use strict';

  // in order of preference
  // http://www.flickr.com/services/api/misc.urls.html
  var FLICKR_SIZES = ['n', 'm'].map(function(size){ return 'url_' + size; }),
    FLICKR_EXTRAS = FLICKR_SIZES.join(',');

  var searchCache = {};

  window.Vittle = function(el){
    this.$el = $(el);
  };

  $.extend(Vittle.prototype, {
    xhr: null,

    // remove leading/trailing whitespace and item number
    cleanText: function(){
      var text = this.$el.text();
      return text.trim().replace(/^[\d\.]*\s*/, '');
    },

    tokens: function(){
      var text = this.cleanText(),
        // split text by what's inside and outside of parens
        match = text.match(/[^\(\)]+/g) || [];

      // remove whitespace around each token
      return match.map(function(token){
        return token.trim();
      });
    },

    // returns a Promise
    getImageUrl: function(){
      var tokens = this.tokens(),
        term = tokens[tokens.length - 1],
        deferred;

      if (term){
        var cachedUrl = searchCache[term];
        if (cachedUrl){
          deferred = $.Deferred().resolve(cachedUrl);
        } else {
          deferred = this.searchFlickr(term);
          deferred.then(function(imageUrl){
            // store in cache
            searchCache[term] = imageUrl;
          });
        }
      } else {
        deferred = $.Deferred().reject('no terms found');
      }

      return deferred;
    },

    // returns a Promise
    searchFlickr: function(term){
      var searchUrl = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e85aff8ce1c2fc44b92bccff30f92f7d&text=' + encodeURIComponent(term) + '&sort=relevance&format=json&nojsoncallback=1&per_page=1&media=photos&extras=' + FLICKR_EXTRAS;

      this.xhr = $.getJSON(searchUrl);

      return this.xhr.then(function(data){
        var photo = data.photos.photo[0];
        if (photo){
          // find the largest of the three image sizes
          var imageUrl;
          for (var i = 0; !imageUrl && i < FLICKR_SIZES.length; i++){
            imageUrl = photo[FLICKR_SIZES[i]];
          }
          return imageUrl;
        } else {
          return $.Deferred().reject('no images found');
        }
      });
    },

    abortRequest: function(){
      if (this.xhr){
        this.xhr.abort();
      }
    }
  });
})(jQuery);
