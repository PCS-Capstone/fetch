var app    = app || {};

app.views  = app.views || {};
app.router = app.router || new App.Routers.Router();

App.Config.SearchParameters = {};

$(document).ready( function() {
  Backbone.history.start({pushState: true});
  app.router.navigate('', {trigger: true});

  app.collection = new App.Collections.LostPets();
  // app. = google.maps.Map;

  /*
  *******************************
  CREATES HEADER NAVIGATION LINKS:
    -Redirects on click;
    -Sets window timer to continuously check for current url path:
      -If url path corresponds to either search/sighting, a "hover" class
        class is applied on the nav link (white background);
      -Also removes "hover" class from non-active link
  */
  $('#lost-pet').click(function() {
    app.router.navigate('search', {trigger: true});
  })
  $('#found-pet').click(function() {
    app.router.navigate('sighting', {trigger: true});
  });

  window.setInterval(function() {
    if (  (window.location.pathname.split('/')[1] === "search") || (window.location.pathname.split('/')[1] === "results") )  {
      $('#lost-pet div').addClass('trigger-hover');
      $('#found-pet div').removeClass('trigger-hover')
    }
    else if (window.location.pathname.split('/')[1] === "sighting") {
      $('#found-pet div').addClass('trigger-hover');
      $('#lost-pet div').removeClass('trigger-hover');
    }
    else {
      $('header div').removeClass('trigger-hover');
    }
  }, .5)

/*  ------------------------------  */

// window.addEventListener('popstate', function(e) {
// 	console.log(event)
// 	app.router.navigate(Backbone.history.getFragment(), {trigger: true});
// });


});
