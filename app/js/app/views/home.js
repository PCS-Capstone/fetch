/*========================================
                HOMEPAGE
========================================*/

App.Views.HomePage = Backbone.View.extend({
    tagName: 'div',
  className: 'home',

  render: function() {
    var $body = $('body').addClass('home-img');
    var $mask = $('<div>').addClass('mask');
    var $description = $('<h1>').html('Help connect lost pets to their humans');
    var $descDiv = $('<div>');

    $description.appendTo($descDiv);
    $descDiv.appendTo($mask);
    $mask.appendTo('body');
    this.$el.appendTo( '#master' );
  },

  initialize: function( options ){
    _.extend( options );
    this.render();
  },

  events: {
    'click #found-button' : 'renderUploadPage',
    'click #lost-button'  : 'renderSearchForm'
  },

  renderUploadPage: function(){
    app.router.navigate('sighting', {trigger: true});
  },

  renderSearchForm: function(){
    app.router.navigate('search', {trigger: true});
  }
});
