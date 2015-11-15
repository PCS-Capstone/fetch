'use strict';

describe('App.Models.LostPet', function () {

  it('should be a constructor', function () {
    expect(App.Models.LostPet).to.be.defined;
    expect(App.Models.LostPet).to.be.an.instanceof(Function);
  });

  describe('each instance', function () {

    beforeEach( function () {
      this.model = new App.Models.LostPet;
    });

    afterEach( function () {
      delete this.model;
    });

    it('should have no special defaults', function () {
      var plainModel = new Backbone.Model();
      expect(this.model.attributes).to.deep.equal(plainModel.attributes);
    });

    it('should accept new properties', function () {
      expect(this.model).to.be.an.instanceof(App.Models.LostPet);
      expect(this.model.get).to.be.instanceof(Function);
      expect(this.model.set).to.be.instanceof(Function);
      this.model.set('test', true);
      expect(this.model.get('test')).to.be.true;
    });
  });
});