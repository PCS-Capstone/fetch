var app = {};
app.router = new App.Routers.Router();
App.Config.Counter = 0;

$(document).ready( function() {
  Backbone.history.start({pushState: true});
  app.router.navigate('', {trigger: true});

  app.collection = new App.Collections.LostPets();
  App.Maps = google.maps.Map();

});

window.addEventListener('popstate', function(e) {
	console.log(e)
	console.log("location " + document.location + ", state: " + JSON.stringify(e.state));

	//Check if browser is Safari or not
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0 && App.Config.Counter === 0) {
    	router.navigate(Backbone.history.getFragment(), {trigger: true, replace: true});
		App.Config.Counter += 1;
	} else {
		App.Config.CurrentView.remove();
		router.navigate(Backbone.history.getFragment(), {trigger: true, replace: true});
		App.Config.Counter += 1;
	}
});
