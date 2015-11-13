/*========================================
            Successful Submission View
=========================================*/

App.Views.SuccessfulSubmission = Backbone.View.extend({
	tagName: 'section',
  className: 'success',
  template: Handlebars.compile(App.Templates['template-successful-submission']),

  render: function() {
    this.$el.html( this.template() );
    this.$el.appendTo('#master');
    this.google(app.lat, app.lng);

    $('#found-pet div').addClass('trigger-hover');
    $('#lost-pet div').removeClass('trigger-hover');
  },

  initialize: function( options ) {
    console.log('success init');
    console.log('lat', app.lat);
    console.log('lng', app.lng);
  	_.extend(this, options);
  	this.render();

  },

  google: function(xLat, xLng) {
    console.log('google')
    console.log('lat and lng', xLat, xLng)
  /* --------------------------------------------------------
     Google() is run following successful sighting submission;
      It displays local animal services agencies in google map; and
      Gives general guidance from the humane society/animal services should the animal be in person's possession
  ----------------------------------------------------------*/
    var map;
    var request;
    var place;
    var infoWindow;
    var marker;

    var center =

    //Adds Google Map of Animal Services/Shelters

    //Creates new Goole Map
    (function () {
      console.log('google map');
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: app.lat, lng: app.lng},
        zoom: 12
      });
      infowindow = new google.maps.InfoWindow();
      callback();
    })();

    console.log(map);

    //Sets options of Google Places Request;
      //For each result, a marker is made
    function callback() {
      request = {
        location: new google.maps.LatLng(xLat, xLng),
        radius: '100',
        query: ['animal rescue', 'humane society']
      };

    //Creates markers and attaches event listener to load infowindow upon marker click
      function createMarker(place) {
        marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      };

      //Creates markers for each result returned by the Google Places request declared below
      function getResults(results, status) {
        console.log(results);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      };

      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, getResults);

    }
  }

});
