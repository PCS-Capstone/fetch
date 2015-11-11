App.Routers.Router = Backbone.Router.extend({
	routes: {
		      '' : 'index',
     	'search' : 'search',
	  'sighting' : 'sighting',
	   'results' : 'results',
	 'noResults' : 'noResults',
	'successful' : 'successful',
		 'error' : 'error'
	},

	index: function() {
		console.log('index');
		app.home = new App.Views.HomePage({});
	},

	search: function() {
		console.log('search');
		App.Config.CurrentView.remove();
		app.search = new App.Views.SearchForm({});
	},

	sighting: function() {
		console.log('sighting');
		App.Config.CurrentView.remove();
		app.uploadSighting = new App.Views.UploadSighting({loc : {lat : null, lng : null}, exif : null, breed : null });
	},

	results: function() {
		console.log('results');
		App.Config.CurrentView.remove();
		app.results = new App.Views.Results ({collection : app.collection});
	},

	noResults: function() {
		console.log('no results');
		App.Config.CurrentView.remove();
		app.noResults = new App.Views.NoResults({});
	},

	error: function() {
		console.log('error');
		App.Config.CurrentView.remove();
		app.error = new App.Views.Error({});
	},

	successful: function() {
		console.log('success');
		App.Config.CurrentView.remove();
		app.successfulSubmission = new App.Views.SuccessfulSubmission({});
	}
});


// make a global currentView property that sets the current view
// so every time a back button is pressed it removes the current view
// and renders new view from the route
