var app    = app || {};

app.views  = app.views || {};
app.router = app.router || new App.Routers.Router();

// App.Config.Counter = 0;

$(document).ready( function() {
  Backbone.history.start({pushState: true});
  app.router.navigate('', {trigger: true});

  app.collection = new App.Collections.LostPets();
  App.Maps = google.maps.Map;
});
