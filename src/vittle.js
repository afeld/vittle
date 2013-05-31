Vittle = function(el){
  this.$el = $(el);
};

$.extend(Vittle.prototype, {
  // remove leading/trailing whitespace and item number
  cleanText: function(){
    var text = this.$el.text();
    return text.trim().replace(/^[\d\.]*\s*/, '');
  },

  tokens: function(){
    
  }
});
