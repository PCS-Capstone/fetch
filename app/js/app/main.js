var app    = app || {};

app.views  = app.views || {};
app.router = app.router || new App.Routers.Router();

App.Config.SearchParameters = {};

$(document).ready( function() {
  Backbone.history.start();
  app.router.navigate(Backbone.history.getFragment(), {trigger: true});
  console.log( 'Current history fragment: ', Backbone.history.getFragment() );
  app.collection = new App.Collections.LostPets();

  /*
  CREATES HEADER NAVIGATION LINKS:
    -Redirects on click
  */
 
  $('#lost-pet').click(function() {
    app.router.navigate('search', {trigger: true});
  })
  $('#found-pet').click(function() {
    app.router.navigate('sighting', {trigger: true});
  });

  $('#fetch').click(function() {
    app.router.navigate('', {trigger: true})
  });

/*  ------------------------------  */
});
