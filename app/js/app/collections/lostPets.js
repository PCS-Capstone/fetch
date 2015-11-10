App.Collections.LostPets = Backbone.Collection.extend({
  model: new App.Models.LostPet,
  url : '/pet',
  initialize: function(){}
});
