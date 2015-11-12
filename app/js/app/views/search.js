/*========================================
            Lost a Pet Views
=========================================*/

/*  Search Form
--------------------*/
App.Views.SearchForm = Backbone.View.extend({
    tagName: 'section',
  className: 'search',
   template: Handlebars.compile(App.Templates['template-searchform']),

  prePopulate : function(){
    this.$el.html( this.template());
    $('#master').html(this.$el);

    $("[name=animal-type]").val(App.Config.SearchParameters.animalType);
    $("[name=address]").val(App.Config.SearchParameters.address);
    $("[name=radius]").val(App.Config.SearchParameters.radius);
    $("[name=start-date]").val(App.Config.SearchParameters.startDate);
    $("[name=end-date]").val(App.Config.SearchParameters.endDate);
    $("[name=color-group]").val(App.Config.SearchParameters.colors);
  },

  render: function(){
    console.log('render')
    if (App.Config.SearchParameters.animalType !== undefined) {
      console.log('edit search');
      app.views.map.markers.length = 0;
      this.prePopulate();
    } else {
      console.log('new search')
      this.$el.html( this.template() );
      $('#master').html(this.$el);
    }

  },

  initialize: function( options ){
    var self = this;
    _.extend( this, options );
    this.render();

    var options = {
        types: ['geocode'],
        componentRestrictions: {country: 'USA'}
      };

    var autocomplete = new google.maps.places.Autocomplete(
      ( document.getElementById('address-bar') ), options);

    autocomplete.addListener('place_changed', convertToLatLng);

    function convertToLatLng () {
      var place = autocomplete.getPlace();
      App.Config.SearchParameters.location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      console.log( 'location:', App.Config.SearchParameters.location );
    }
  },

  events: {
    'submit form' : 'renderSearchResults',
    'click #start-date' : 'datepicker',
    'click #end-date' : 'datepicker'
  },

  datepicker: function(event) {
    console.log(event.target.id);
    $('#' + event.target.id).datepicker('show')
      .on('changeDate', function(ev){
        console.log(ev.date);
        $('#' + event.target.id).datepicker('hide');
      });
  },

  // validate: function() {
  //   console.log('validate')

  //   var $uploadWarning = $('<div class="alert alert-warning alert-dismissible col-sm-9 col-sm-offset-2 col-lg-8 col-lg-offset-2" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong> Missing Required Fields </strong></div>');
  //   var uploadWarningColor = '#FCF8E3';

  //   var forms = document.getElementsByTagName('section');
  //   console.log('forms', forms)
    
  //   for (var i = 0; i < forms.length; i++) {
  //     console.log(forms[i])
  //     forms[i].noValidate = true;

  //     forms[i].addEventListener('submit', function(event) {
  //       //Prevent submission if checkValidity on the form returns false.
  //       console.log('event listener', event)
  //       console.log('event.target', event.target.checkValidity())
  //       if (event.target.checkValidity() === false) {
  //           event.preventDefault();
  //           if ( $('#animal-type').val() === "") {
  //             console.log('no animal tyype')
  //             $('#animal-type').css('background-color', uploadWarningColor );
  //             $('#search-form').prepend($uploadWarning);
  //             $("html, body").animate({ scrollTop: 0 }, "slow");
  //             console.log('Form Validation Failed: No Animal Type Selected');
  //           } else if ( $('#address-bar').val() === undefined) {
  //             $('#address-bar').css('background-color', uploadWarningColor );
  //             $('#search-form').prepend($uploadWarning);
  //             $("html, body").animate({ scrollTop: 0 }, "slow");
  //             console.log('Form Validation Failed: No Address Selected');
  //           }
            
  //           //Implement you own means of displaying error messages to the user here.
  //       } else {
  //         console.log('else')
  //       }
  //     })
  //   }

  // },

    // var $uploadWarning = $('<div class="alert alert-warning alert-dismissible col-sm-9 col-sm-offset-2 col-lg-8 col-lg-offset-2" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong> Missing Required Fields </strong></div>');
    // var uploadWarningColor = '#FCF8E3';

    // if (app.searchParameters.location === undefined) {
    //     $('#address-bar').css('background-color', uploadWarningColor );
    //     $('#search-form').prepend($uploadWarning);
    //     $("html, body").animate({ scrollTop: 0 }, "slow");
    //     console.log('Form Validation Failed: No Address Selected');
    // } else {
    //   currentView.remove();

    //   app.collection.fetch({data : app.searchParameters,
    //     success: function(collection, response, options)
    //       {console.log('success', response); 
    //         if (response[0] === undefined) {
    //           router.navigate('noResults', {trigger: true});
    //         } else {
    //           router.navigate('results', {trigger: true});
    //         } 
    //       }
    //   // error: function(collection, response, options)
    //   // {console.log('error', response); router.navigate('noResults', {trigger: true})}
    //   });
    // }

  renderSearchResults: function(event){
    var self = this;
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];

    event.preventDefault();

    var prettyStartDate = $('input[name="start-date"]').val().split('/');
    prettyStartDate = (month[(prettyStartDate[0]) -1] + " " + prettyStartDate[1] +
      ', ' + prettyStartDate[2]);
    console.log('pretty start date', prettyStartDate);

    var prettyEndDate = $('input[name="end-date"]').val().split('/');
    prettyEndDate = (month[(prettyEndDate[0]) -1] + " " + prettyEndDate[1] +
      ', ' + prettyEndDate[2]);
    console.log('pretty end date', prettyEndDate);

    App.Config.SearchParameters = {
        startDate : $('input[name="start-date"]').val(),
          endDate : $('input[name="end-date"]').val(),
  prettyStartDate : prettyStartDate,
    prettyEndDate : prettyEndDate,
          address : $('input[name="address"]').val(),
         location : typeof App.Config.SearchParameters.location === 'string' ? 
                  App.Config.SearchParameters.location : 
                  JSON.stringify(App.Config.SearchParameters.location),
           radius : $('input[name="radius"]').val(),
       animalType : $('option:selected').val(),
           colors : $('input[name="color-group"]:checked').map( function(){ return this.value } ).toArray()
    };

    console.log( 'search Params', App.Config.SearchParameters );

      app.collection.fetch({data : App.Config.SearchParameters,
        success: function(collection, response, options)
          {console.log('success', response); 
            if (response[0] === undefined) {
              app.router.navigate('noResults', {trigger : true});
            } else {
              app.router.navigate('results', {trigger : true});
            }
          },
        error: function(collection, response, options)
        {console.log('error', response)}

        });
    // this.validate();
  
  }
});


/*  Search Results
--------------------*/
App.Views.Results = Backbone.View.extend({

    tagName: 'div',
  className: 'results-view',
   template: Handlebars.compile(App.Templates['template-results-list']),
    mapView: {},

  render: function() {
    console.log('results view');
    this.$el.html( this.template(App.Config.SearchParameters) );
    this.$el.prependTo('#master');

    var self = this;

    console.log(App.Config.SearchParameters);
    console.log( 'searchParameters.location: ', App.Config.SearchParameters.location);

    app.views.map = new App.Views.Map({
      collection : app.collection,
      center: App.Config.SearchParameters.location
    });

    app.collection.forEach(function(pet) {
      console.log('collection', self.collection)
      app.views.tile = new App.Views.Tile({
          model : pet
      });

      self.$el.append(app.views.tile.$el)

    });

  },

  initialize: function( options ) {
    console.log( 'Initializing ResultsView' );
    _.extend( this, options );
    this.render();
  },

  events: {
           "click #edit" : "editSearch",
    "click #map-button"  : "showMapView",
    "click #tile-button" : "showListView"
  },

  editSearch: function() {
    var self = this;
    var model;

    while(model = this.collection.first()){
      app.collection.remove(model);
    }

    app.router.navigate('search', {trigger : true, replace: true})

  },

  showMapView: function(event) {
    var self = this;
    $('.lost-pet').hide();
    $('#map').show();
    google.maps.event.trigger(app.map, 'resize'); //magically fixes window resize problem http://stackoverflow.com/questions/13059034/how-to-use-google-maps-event-triggermap-resize

    var bounds = new google.maps.LatLngBounds();
    app.map.setZoom(15);
    app.map.setCenter( JSON.parse(App.Config.SearchParameters.location) );

    app.views.map.markers.forEach(function(marker) {
      marker.setMap(app.map);
      bounds.extend(marker.getPosition());

      app.map.setCenter(bounds.getCenter());
      app.map.fitBounds(bounds);

      if (app.views.map.markers.length === 1) {
        app.map.setZoom(app.map.getZoom() - 4)
      } else {
        app.map.setZoom(app.map.getZoom() - 1)
      }

    });

    var $mapButton = $(event.target);
    $mapButton.toggle();

    var $tileButton = $('#tile-button');
    $tileButton.toggle();
  },

  showListView: function() {
    var self = this;
    $('#map').hide();
    $('.lost-pet').show();

    var $tileButton = $(event.target);
    $tileButton.toggle();

    var $mapButton = $('#map-button');
    $mapButton.toggle();

  }

});

App.Views.Tile = Backbone.View.extend({

    tagName: 'div',
  className: 'lost-pet',
   template: Handlebars.compile(App.Templates['template-tile-view']),

  render: function() {
    console.log('tile view render')
    this.$el.html( this.template(this.model.get('value') ) );
  },

  initialize: function( options ) {
    console.log( 'Initialize TileView' )
    _.extend( this, options );
    this.listenTo(this.model, 'remove', this.selfDestruct)

    this.render();
  },

  events: {
    "click .btn-description" : "showDescription",
    "click .btn-info" : "showMiniMap"
  },

  selfDestruct: function() {
    this.remove();
  },

  showMiniMap : function() {
    var self = this;

    var string = '<div class="modal"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div></div>';
    var $modal = $(string);
    var $map = $('#map');

    function moveMapToModal () {
      $('#master').find('.modal').remove();
      $modal.appendTo('#master');
      $modal.find('.modal-content').append($map);
    };

    function showModal () {
      $modal.find('.modal-content').css({
        'height':'50%',
        'width':'90%'
      });
      $modal.css({
        'display':'flex',
        'justify-content':'center',
        'padding-top':'2em',
        'background':'rgba(0,0,0,0.6)',
        'height':'100%'
      });
      $map.show();
    };

    function hideModal () {
      $modal.css({
        'display':'none'
      });
      $map.remove();
      $map.hide();
      $map.appendTo('.results-view');
    };

    moveMapToModal();
    showModal();
    $modal.find('button').click(hideModal);

    google.maps.event.trigger(app.map, 'resize');
    app.map.setCenter(this.model.get('value').location);
    app.map.setZoom(18);

    app.views.map.markers.forEach( function(marker){

      if ( marker.modelId !== self.model.get('path').key ) {
        marker.setMap(null);
      } else {
        marker.setMap(app.map);
      }
     
    })
  },

  showDescription : function(event){
    var $button = $(event.target);
    $button.closest('.lost-pet').find('.description').slideToggle();
    if ( $button.html() === '+' ){
      $button.html( '-' );
    }
    else {
      $button.html( '+' );
    }
  }


});

App.Views.Map = Backbone.View.extend({
       map: {},
        id: 'map',
   tagName: 'div',
   markers: [],

  render: function(){
    this.$el.hide();
    this.$el.appendTo('.results-view');
    console.log('MapView.render()' );
    console.log('==============\n', document.getElementById('map') )
    this.loadMap();

  },

  initialize: function( options ){
    console.log( 'Initialize MapView')
    _.extend( this, options );
    this.listenTo(this.model, 'remove', this.selfDestruct);
    this.render();

  },

  events: {
    // 'click close-button' : 'hideMap'
  },

  selfDestruct: function() {
    this.remove();
  },

  loadMap: function(){
    console.log( 'loadmap MapView')

    var center = JSON.parse( this.center );
    
    app.map = new google.maps.Map(document.getElementById('map'), 
      {center : center, zoom : 15, disableDefaultUI : true})

    this.populateMap();
  },

  populateMap: function(){
    console.log( 'populateMap MapView')
    
    var self = this;
    var template = Handlebars.compile(App.Templates['template-infowindow'])

    app.collection.each( function( model ) {
      // self.markers.length = 0;

      var marker = new google.maps.Marker({
        position: model.get('value').location, //are these being altered??
        map: app.map,
        modelId: model.get('path').key
      });

      self.markers.push(marker);

      var infowindow = new google.maps.InfoWindow({
        content: template(model.get('value'))
      });

      marker.addListener('mouseover', function() {
        infowindow.open(marker.get('map'), marker);
      });

      marker.addListener('mouseout', function(){
        infowindow.close(marker.get('map'), marker);
      });

    });
  }

});
