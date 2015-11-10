/*========================================
                HOMEPAGE
========================================*/

App.Views.HomePage = Backbone.View.extend({
    tagName: 'div',
  className: 'home',

  render: function() {
    App.Config.CurrentView = this;
    var $foundButton = $('<button id="found-button" class="btn btn-default btn-lg">').html( 'Found a Pet' );
    var $lostButton  = $('<button id="lost-button" class="btn btn-default btn-lg">').html( 'Lost a Pet' );

    this.$el.append( [ $foundButton, $lostButton] );
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
    App.Config.CurrentView.remove();
    app.router.navigate('sighting', {trigger: true});
  },

  renderSearchForm: function(){
    App.Config.CurrentView.remove();
    app.router.navigate('search', {trigger: true});
  }
});
