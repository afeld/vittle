(function($){
  'use strict';

  // in order of preference
  // http://www.flickr.com/services/api/misc.urls.html
  var FLICKR_SIZES = ['n', 'm'].map(function(size){ return 'url_' + size; }),
    FLICKR_EXTRAS = FLICKR_SIZES.join(',');

  // http://www.flickr.com/services/api/misc.overview.html
  var isSecure = window.location.protocol === 'https:',
    ENDPOINT = isSecure ? 'https://secure.flickr.com/services' : 'http://api.flickr.com/services';

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
      var searchUrl = ENDPOINT + '/rest/?' + $.param({
        method: 'flickr.photos.search',
        api_key: 'e85aff8ce1c2fc44b92bccff30f92f7d',
        text: term,
        sort: 'relevance',
        format: 'json',
        nojsoncallback: '1',
        per_page: 1,
        media: 'photos',
        extras: FLICKR_EXTRAS
      });

      this.xhr = $.getJSON(searchUrl);
      return this.xhr.then(this._onXhrDone, this._onXhrFail);
    },

    _onXhrDone: function(data){
      if (data.stat === 'fail'){
        // special Flickr-style error (which is still a 200, for some reason)
        // http://www.flickr.com/services/api/response.json.html
        console.log(data.message);
        return $.Deferred().reject(data.message);
      } else {
        var photoObj = data.photos.photo[0];
        if (photoObj){
          // find the largest of the three image sizes
          var photoUrl;
          for (var i = 0; !photoUrl && i < FLICKR_SIZES.length; i++){
            photoUrl = photoObj[FLICKR_SIZES[i]];
          }
          if (isSecure){
            photoUrl = photoUrl.replace(/^http:/, 'https:');
          }
          return photoUrl;
        } else {
          return $.Deferred().reject('no images found');
        }
      }
    },

    _onXhrFail: function(xhr, status, error){
      var msg = status + ': ' + error;
      if (status !== 'abort'){
        console.log(msg);
      }
      return msg;
    },

    abortRequest: function(){
      if (this.xhr){
        this.xhr.abort();
      }
    }
  });
})(jQuery);
