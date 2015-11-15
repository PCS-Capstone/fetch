'use strict';

describe('App.Collections.LostPets', function () {

  it('should be a constructor', function () {
    expect(App.Collections.LostPets).to.be.defined;
    expect(App.Collections.LostPets).to.be.an.instanceof(Function);
  });

  describe('each instance', function () {
    beforeEach(function () {
      this.collection = new App.Collections.LostPets([{}, {}, {}]);
    });

    afterEach(function () {
      delete this.collection;
    });

    it('is a Backbone collection', function () {
      expect(this.collection).to.be.defined;
    });
    
    it('should make lost pets', function () {
      expect(this.collection).to.be.an.instanceof(App.Collections.LostPets);
      expect(this.collection).to.have.length(3);
      expect(this.collection.model).to.equal(App.Models.LostPet);
      expect(this.collection.at(0)).to.be.an.instanceof(App.Models.LostPet);
      expect(this.collection.at(0).get).to.be.an.instanceof(Function);      
    });

    it('should be able to add new models', function () {
      this.collection.add({});
      expect(this.collection).to.have.length(4);
    });

    it('should be able to remove models', function () {
      this.collection.remove(this.collection.at(3));
      expect(this.collection).to.have.length(3);
    });

    it('should be able to talk to the server', function () {
      expect(this.collection.url).to.be.defined;
      expect(this.collection.url).to.equal('/pet');
    });
  });
});