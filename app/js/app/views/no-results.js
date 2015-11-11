/*========================================
            No Results Found View
=========================================*/

App.Views.NoResults = Backbone.View.extend({
	tagName: 'section',
  className: 'no-results',
   template: Handlebars.compile(App.Templates['template-no-results']),

  render: function() {
    currentView = this;
    this.$el.html( this.template() )
    this.$el.appendTo('#master');
  },

  initialize: function( options ) {
  	_.extend(this, options)
  	this.render();
  },

  events: {
  	"click #no-results": "searchAgain"
  },

  searchAgain: function() {
  	var self = this;

  	this.remove();
    router.navigate('search', {trigger : true});

  }
})