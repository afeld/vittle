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
    }
  });
})(Zepto);
