/*========================================
            Error with Upload View
=========================================*/

App.Views.Error = Backbone.View.extend({
	tagName: 'section',
  className: 'error',
   template: Handlebars.compile( $('#template-upload-error').html()),

  render: function() {
    App.Config.CurrentView = this;
    this.$el.html( this.template({}) )
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
    App.Config.CurrentView.remove();
    app.router.navigate('sighting')
    $("#reveal-form").show();
  }
	
})