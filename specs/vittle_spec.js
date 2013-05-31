describe('Vittle', function(){
  describe('#cleanText()', function(){
    it("should remove leading numbers", function(){
      var $el = $('<div>5.5 Vegetarian Summer Rolls (Goil Cuon Chay)</div>'),
        vittle = new Vittle($el);

      expect(vittle.cleanText()).to.eql('Vegetarian Summer Rolls (Goil Cuon Chay)');
    });
  });
});
