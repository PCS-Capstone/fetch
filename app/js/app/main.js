var app    = app || {};

app.views  = app.views || {};
app.router = app.router || new App.Routers.Router();

App.Config.SearchParameters = {};

$(document).ready( function() {
  console.log(Backbone.history);
  Backbone.history.start();
  app.router.navigate(Backbone.history.getFragment(), {trigger: true});

  app.collection = new App.Collections.LostPets();
  // app. = google.maps.Map;

  /*
  *******************************
  CREATES HEADER NAVIGATION LINKS:
    -Redirects on click
  */
  $('#lost-pet').click(function() {
    app.router.navigate('search', {trigger: true});
  })
  $('#found-pet').click(function() {
    app.router.navigate('sighting', {trigger: true});
  });

/*  ------------------------------  */

});
