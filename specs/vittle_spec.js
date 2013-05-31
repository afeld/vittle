describe('Vittle', function(){
  describe('#cleanText()', function(){
    var cleanTextFor = function(text){
      var $el = $('<div>' + text + '</div>'),
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

  describe('#tokens()', function(){
    var tokensFor = function(text){
      var $el = $('<div>' + text + '</div>'),
        vittle = new Vittle($el);

      return vittle.tokens();
    };

    it("should give an empty set for an empty string", function(){
      expect(tokensFor('    ')).to.eql([]);
    });

    it("should separate any text in parens", function(){
      expect(tokensFor('outer (inner)')).to.eql(['outer', 'inner']);
    });
  });
});
