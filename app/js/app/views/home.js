/*========================================
                HOMEPAGE
========================================*/

App.Views.HomePage = Backbone.View.extend({
    tagName: 'div',
  className: 'home',

  render: function() {
    // var $foundButton = $('<button id="found-button" class="btn btn-default btn-lg">').html( 'Found a Pet' );
    // var $lostButton  = $('<button id="lost-button" class="btn btn-default btn-lg">').html( 'Lost a Pet' );
    var $body = $('body').addClass('home-img');

    // this.$el.append( [ $foundButton, $lostButton] );
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
