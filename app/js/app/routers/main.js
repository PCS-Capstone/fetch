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
      delete app.views[view];
    };
  },

  recordHash: function(){
    console.log(this.hashLog);
    this.hashLog.push(Backbone.history.getHash());
  },

  hashLog : [],

	index: function() {
    this.recordHash();
    this.removeAllViews();
    $('li div').removeClass();
		app.views.home = new App.Views.HomePage({});
	},

	search: function() {
    this.recordHash();
  	this.removeAllViews();
		app.views.search = new App.Views.SearchForm({});
	},

	sighting: function() {
    this.recordHash();
		this.removeAllViews();
		app.views.uploadSighting = new App.Views.UploadSighting({loc : {lat : null, lng : null}, exif : null, breed : null });
	},

	results: function() {
    this.recordHash();
    this.removeAllViews();
    
    if (this.hashLog[this.hashLog.length - 2] !== "search") {
      console.log('redirecting home');
      this.navigate('', {trigger: true});
    } else {
    console.log('returning results');
    app.views.results = new App.Views.Results ({collection : app.collection});
    };
	},

	noResults: function() {
    this.recordHash();
		this.removeAllViews();
    if (this.hashLog[this.hashLog.length - 2] !== "search") {
      this.navigate('', {trigger: true});
    } else {
		app.views.noResults = new App.Views.NoResults({});
    };
	},

	error: function() {
    this.recordHash();
		this.removeAllViews();
    if (this.hashLog[this.hashLog.length - 2] !== "sighting") {
      this.navigate('', {trigger: true});
    } else {
		app.views.error = new App.Views.Error({}); 
    };
	},

	successful: function() {
    this.recordHash();
		this.removeAllViews();
    if (this.hashLog[this.hashLog.length - 2] !== "sighting") {
      this.navigate('', {trigger: true});
    } else {
		app.views.successfulSubmission = new App.Views.SuccessfulSubmission({});
    };
	}
});


// make a global currentView property that sets the current view
// so every time a back button is pressed it removes the current view
// and renders new view from the route
