App.Routers.Router = Backbone.Router.extend({
	routes: {
		      '' : 'index',
     	'search' : 'search',
	  'sighting' : 'sighting',
	   'results' : 'results',
	'no-results' : 'noResults',
	'successful' : 'successful',
		 'error' : 'error'
	},

  removeAllViews: function () {
    for (var view in app.views){
      app.views[view].remove();
    };
  },

	index: function() {
    if(Object.keys(app.views).length){
      this.removeAllViews();
    }
		app.views.home = new App.Views.HomePage({});
	},

	search: function() {
    	this.removeAllViews();
		app.views.search = new App.Views.SearchForm({});
	},

	sighting: function() {
		this.removeAllViews();
		app.views.uploadSighting = new App.Views.UploadSighting({loc : {lat : null, lng : null}, exif : null, breed : null });
	},

	results: function() {
		this.removeAllViews();
		app.views.results = new App.Views.Results ({collection : app.collection});
	},

	noResults: function() {
		this.removeAllViews();
		app.views.noResults = new App.Views.NoResults({});
	},

	error: function() {
		this.removeAllViews();
		app.views.error = new App.Views.Error({});
	},

	successful: function() {
		this.removeAllViews();
		app.views.successfulSubmission = new App.Views.SuccessfulSubmission({});
	}
});


// make a global currentView property that sets the current view
// so every time a back button is pressed it removes the current view
// and renders new view from the route
