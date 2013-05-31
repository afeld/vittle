describe('Vittle', function(){
  describe('#cleanText()', function(){
    var cleanTextFor = function(start){
      var $el = $('<div>' + start + '</div>'),
        vittle = new Vittle($el);

      return vittle.cleanText();
    };

    it("should remove leading numbers", function(){
      expect(cleanTextFor('5.5 Summer Rolls')).to.eql('Summer Rolls');
    });

    it("should remove surrounding whitespace", function(){
      expect(cleanTextFor('    Yummy thing ')).to.eql('Yummy thing');
    });
  });
});
