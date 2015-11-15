'use strict';

App.Routers.Main = Backbone.Router.extend({
	routes: {
		        '' : 'index',
     	'search' : 'search',
	  'sighting' : 'sighting'
	},

  removeAllViews: function () {
    for (var view in app.views){
      app.views[view].remove();
      delete app.views[view];
    };
    $('#master').empty();
  },

	index: function() {
    this.removeAllViews();
    app.views.home = new App.Views.HomePage({});
    $('li div').removeClass();
	},

	// ../main.js - line 20
  search: function() {
    $('#footer').remove();
    $('.mask').remove();      


    this.removeAllViews();
    app.views.search = new App.Views.SearchForm({});
    
	},
  // ../main.js - line 23
	sighting: function() {
    $('#footer').remove();
    if( $('.mask') ){
      $('.mask').remove();      
    }

    this.removeAllViews();
    app.views.uploadSighting = new App.Views.UploadSighting({loc : {lat : null, lng : null}, exif : null, breed : null });
	},

  // ../views/search.js - line 184
	results: function() {
    this.removeAllViews();
    app.views.results = new App.Views.Results ({collection : app.collection});
	},

  // ../views/search.js - line 182
	noResults: function() {
    this.removeAllViews();
    app.views.noResults = new App.Views.NoResults({});
	},

  // ../views/sighting.js - line 471
	error: function() {
    this.removeAllViews();
    app.views.error = new App.Views.Error({});
	},

  // ../views/sighting.js - line 466
	successful: function() {
    this.removeAllViews();
    app.views.successfulSubmission = new App.Views.SuccessfulSubmission({});
	}
});

