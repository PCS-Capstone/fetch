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
		app.search = new App.SearchForm({});
	},

	sighting: function() {
		console.log('sighting');
		app.uploadSighting = new App.Views.UploadSighting({loc : {lat : null, lng : null}, exif : null, breed : null });
	},

	results: function() {
		console.log('results');
		app.results = new App.Views.Results ({collection : app.collection});
	},

	noResults: function() {
		console.log('no results');
		app.noResults = new App.Views.NoResults({});
	},

	error: function() {
		console.log('error');
		app.error = new App.Views.Error({});
	},

	successful: function() {
		console.log('success');
		app.successfulSubmission = new App.Views.SuccessfulSubmission({});
	}
});


// make a global currentView property that sets the current view
// so every time a back button is pressed it removes the current view
// and renders new view from the route
