/*========================================
            Lost a Pet Views
=========================================*/

/*  Search Form
--------------------*/
App.SearchForm = Backbone.View.extend({
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
    App.Config.CurrentView = this;

    if (App.Config.SearchParameters) {
      this.prePopulate();
    } else {
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
      App.Config.SearchParameters.location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
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

    // console.log('address',  $("[name=address]").val().split(','))
    var self = this;
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];

    event.preventDefault();

    var shortAddress = $('input[name="address"]').val().split(',');
    shortAddress.splice((shortAddress.length)-1);

    // var prettyStartDate = $('input[name="start-date"]').val().split('/');
    // prettyStartDate = (month[(prettyStartDate[0]) -1] + " " + prettyStartDate[1] +
    //   ', ' + prettyStartDate[2]);
    // console.log('pretty start date', prettyStartDate);

    // var prettyEndDate = $('input[name="end-date"]').val().split('/');
    // prettyEndDate = (month[(prettyEndDate[0]) -1] + " " + prettyEndDate[1] +
    //   ', ' + prettyEndDate[2]);
    // console.log('pretty end date', prettyEndDate);

    // var startDate = $('input[name="start-date"]').val().split('/');
    // startDate = startDate[2] + '-' + startDate[0] + '-' + startDate[1];
    // console.log('db start date', startDate);

    // var endDate = $('input[name="end-date"]').val().split('/');
    // endDate = endDate[2] + '-' + endDate[0] + '-' + endDate[1];
    // console.log('db end date', endDate);

    App.Config.SearchParameters = {
        startDate : $('input[name="start-date"]').val(),
          endDate : $('input[name="end-date"]').val(),
  prettyStartDate : null,
    prettyEndDate : null,
          address : shortAddress,
         location : JSON.stringify(app.searchParameters.location),
           radius : $('input[name="radius"]').val(),
       animalType : $('option:selected').val(),
           colors : $('input[name="color-group"]:checked').map( function(){ return this.value } ).toArray()
    };

    console.log( 'search Params', App.Config.SearchParameters );

      app.collection.fetch({data : App.Config.SearchParameters,
        success: function(collection, response, options)
          {console.log('success', response); 
            if (response[0] === undefined) {
              app.router.navigate('noResults', {trigger: true});
            } else {
              app.router.navigate('results', {trigger: true});
            }
          }
        });
    // this.validate();

    // if(app.searchParameters)

    // this.remove();
    // console.log('location', app.searchParameters.location)


    // console.log( 'searchForm on submit location:', self.location)

    // only works upon first try, does not work with edit because
    // there's only one fetch call.
    // We want to use conditional prior to ResultsView being rendered
    // if there are no search results found
    // where do we put it?

  
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
    App.Config.CurrentView = this;
    this.$el.html( this.template(App.Config.SearchParameters) );
    this.$el.prependTo('#master');

    var self = this;

    console.log(App.Config.SearchParameters);
    console.log( 'searchParameters.location: ', App.Config.SearchParameters.location);

    console.log('JSON PARSE', JSON.parse(App.SearchParameters.location));

    app.mapView = new App.Views.Map({
      collection : app.collection,
      center: App.SearchParameters.location
    });

    app.collection.forEach(function(pet) {
      console.log('collection', self.collection)
      app.tileView = new App.Views.Tile({
          model : pet
          // mapView : app.mapView
      });
      self.$el.append(app.tileView.$el)

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

    App.Config.SearchParameters.location = JSON.parse(App.Config.SearchParameters.location);

    App.Config.CurrentView.remove();
    app.router.navigate('search', {trigger : true, replace: true})

  },

  showMapView: function(event) {

    var self = this;
    $('.lost-pet').hide();
    $('#map').show();
    google.maps.event.trigger(self.mapView.map, 'resize'); //magically fixes window resize problem http://stackoverflow.com/questions/13059034/how-to-use-google-maps-event-triggermap-resize

    app.mapView.map.setZoom(15);
    // console.log( app.searchParameters.location );
    // console.log( typeof self.searchParameters.location)
    app.mapView.map.setCenter( JSON.parse(App.Config.SearchParameters.location) );
    
    // http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-markers-visible-markers
    var bounds = new google.maps.LatLngBounds();

    app.mapView.markers.forEach( function(marker){
      marker.setMap(app.mapView.map);
      bounds.extend(marker.getPosition());
    });

    app.mapView.map.setCenter(bounds.getCenter());
    app.mapView.map.fitBounds(bounds);
    app.mapView.map.setZoom(app.mapView.map.getZoom()-1);

  //   console.log('ResultsView.showMapView()')
  //   // console.log( 'searchParams:', this.searchParameters );
  //   // console.log( 'searchParams.location:', this.searchParameters.location );

  //   var $tileView = $('.lost-pet');
  //   $tileView.remove();

    var $mapButton = $(event.target);
    $mapButton.toggle();

    var $tileButton = $('#tile-button');
    $tileButton.toggle();
  },

  showListView: function() {
    var self = this;
    $('#map').hide();
    $('.lost-pet').show();
  //   var $mapView = $('#map')
  //   $mapView.remove();

    var $tileButton = $(event.target);
    $tileButton.toggle();

    var $mapButton = $('#map-button');
    $mapButton.toggle();

  //   var self = this;

  //   this.collection.forEach(function(pet) {
  //     var tileView = new TileView({
  //         model: pet,
  //         parent: self,
  //         mapView: self.mapView
  //     });

  //     self.$el.append(tileView.$el)
  //   });

  }

});

App.Views.Tile = Backbone.View.extend({

    tagName: 'div',
  className: 'lost-pet',
   template: Handlebars.compile(App.Templates['template-tile-view']),

  render: function() {
    this.$el.html( this.template(this.model.get('value')) );
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

    google.maps.event.trigger(app.mapView.map, 'resize');
    app.mapView.map.setCenter(this.model.get('value').location);
    app.mapView.map.setZoom(18);
    app.mapView.markers.forEach( function(marker){

      // console.log( marker.modelId );
      // console.log( self.model.get('path').key );
      if ( marker.modelId !== self.model.get('path').key ) {
        marker.setMap(null);
      } else {
        marker.setMap(self.mapView.map);
      }
      // var markerLat = marker.position.lat();
      // var markerLng = marker.position.lng();

      // var location = self.model.get('value').location;
      // var modelLat = location.lat;
      // var modelLng = location.lng;

      // console.log(markerLat);
      // console.log(modelLat);
      // console.log(markerLat!==modelLat);

      // console.log(markerLng);
      // console.log(modelLng);
      // console.log(markerLng!==modelLng);

      // (markerLat !== modelLat) || (markerLng !== modelLng) ? marker.setMap(null) : console.log(marker.map);

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
  // template: Handlebars.compile( $('#template-map').html() ),

  render: function(){
    // console.log('Rendeirng MapView');
    // console.log('MapView.$el', this.$el);
    // var $closeButton = $('<button id="close-button" class="btn btn-default btn-danger">').html('x');
    // this.$el.append($closeButton);
    // this.$el.toggleClass('hidden');
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
    // console.log('self destruct map view');
    this.remove();
  },

  loadMap: function(){
    //console.log( 'loadmap MapView')
    // console.log( 'MapView.loadMap()' );
    // console.log( 'loadMap center: ', this.center );

    var center = JSON.parse( this.center );
    // console.log( 'MapView.center = ', this.center)
    //console.log( '#map before making Gmap =', document.getElementById('map') );
    // console.log( 'MapView.map=', this.map)
    // console.log( 'google works=', google.maps.Map)
    // this.map = new google.maps.Map(document.getElementById('map'), {
    //   center: center,
    //   // center: {"lat":45.528932,"lng":-122.68564600000002},
    //   zoom: 15, //need to incorporate radius math.
    //   disableDefaultUI: true
    // });

    app.map = new App.Map({center : center, zoom : 15, disableDefaultUI : true})

    //console.log( 'MapView.map', this.map );
    //console.log( this.map.center );
    // console.log( 'MapView.map DOM', document.getElementById('map') );

    this.populateMap();
  },

  populateMap: function(){
    //console.log( 'populateMap MapView')
    // console.log( 'MapView.populateMap()' );
    var self = this;
    var template = Handlebars.compile($ ('#template-infowindow').html())
    // console.log( 'map =', self.map );
    //var image = 'public/images/binoculars.png'
    //loop through the collection
    //make a marker for each model in the collection

    // each not forEach? Backbone colleciton method
    //_.each (this.collection, )
    app.collection.each( function( model ){
      // console.log( 'loop => model attributes:', model.attributes );
      // console.log( 'function?', model.get );
      //console.log( 'loop => model:', model.get('value').location )
      //console.log(model)
      var marker = new google.maps.Marker({
        position: model.get('value').location, //are these being altered??
        //icon: image,
        map: self.map,
        modelId: model.get('path').key
        // animation: google.maps.Animation.DROP
      });
      //console.log(model.get('path').key);
      //console.log(marker.modelId);

      self.markers.push(marker);

      var infowindow = new google.maps.InfoWindow({
        content: template(model.get('value'))
        // content: '<img src="' + model.get('value').imageUrl + '" style="max-width:75px">' + model.get('value').colors + ' ' + model.get('value').animalType + ' @ ' + model.get('value').dateTime + '</br>' + model.get('value').description
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
