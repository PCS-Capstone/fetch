App.Collections.LostPets = Backbone.Collection.extend({
  model: App.Models.LostPet,
  url : '/pet',
  initialize: function(){}
});
