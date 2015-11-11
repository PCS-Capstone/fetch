var app    = app || {};

app.views  = app.views || {};
app.router = app.router || new App.Routers.Router();

App.Config.SearchParameters = {};

$(document).ready( function() {
  Backbone.history.start({pushState: true});
  app.router.navigate('', {trigger: true});

  app.collection = new App.Collections.LostPets();
});
