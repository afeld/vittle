(function($){
  'use strict';

  window.Vittle = function(el){
    this.$el = $(el);
  };

  $.extend(Vittle.prototype, {
    // remove leading/trailing whitespace and item number
    cleanText: function(){
      var text = this.$el.text();
      return text.trim().replace(/^[\d\.]*\s*/, '');
    },

    tokens: function(){
      var text = this.cleanText(),
        match = text.match(/[^\(\)]+/g) || [];

      // remove whitespace around each token
      for (var i = 0; i < match.length; i++){
        match[i] = match[i].trim();
      }

      return match;
    },

    getImageUrl: function(callback){
      var tokens = this.tokens(),
        term = tokens[tokens.length - 1];

      if (term){
        var searchUrl = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f84e509282558d46d32f367b0d7f501&text=' + encodeURIComponent(term) + '&sort=relevance&format=json&nojsoncallback=1&per_page=1&media=photos';
        $.getJSON(searchUrl, function(data){
          var photo = data.photos.photo[0];
          if (photo){
            var imageUrl = 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
            callback(imageUrl);
          } else {
            callback(null);
          }
        });
      } else {
        callback(null);
      }
    }
  });
})(Zepto);
