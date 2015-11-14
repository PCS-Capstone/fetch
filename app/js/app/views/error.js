/*========================================
            Error with Upload View
=========================================*/

App.Views.Error = Backbone.View.extend({
	tagName: 'section',
  className: 'error',
   template: Handlebars.compile(App.Templates['template-upload-error']),

  render: function() {
    this.$el.html( this.template() )
    this.$el.prependTo('#master');
  },

  initialize: function( options ) {
  	_.extend(this, options)
  	this.render();
  },

  events: {
  	'click #error': 'reTry'
  },

  reTry: function(){
    app.router.sighting();
    $("#reveal-form").show();
  }

})
