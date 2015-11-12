/*========================================
           Found a Pet Views
------------------------------------------
  Variables:

loc {lat: null, lng: null}
breed : null
exif : null
========================================*/

App.Views.UploadSighting = Backbone.View.extend({

    tagName: 'div',
  className: 'upload',
   template: Handlebars.compile(App.Templates['template-upload-sighting']),

  render: function() {
    this.$el.html( this.template() );
    $('#master').append(this.$el);
    /*  -----
      For the form's hours and minutes, this creates the options of 1-12(hour) and 0-59(minute)
    ----- */
    for (var i = 0; i <= 12; i++) {
      var $hourSelectOption = $('<option class="form-control">');
      if (i === 0) {
        $hourSelectOption.attr('value', "");
        $hourSelectOption.html('Select Hour');
        $('#hour-select').append($hourSelectOption);
      }
      else {
        $hourSelectOption.attr('id', 'hourSelectOption' + i);
        $hourSelectOption.attr('value', ""+ i);
        $hourSelectOption.html(i);
        $('#hour-select').append($hourSelectOption);
        $hourSelectOption.attr('class', 'hourSelectOption');
      }
    }
    for (var j = 0; j < 60; j++) {
      var $minuteSelectOption = $('<option class="form-control">');
      $minuteSelectOption.attr('id', 'minuteSelectOption' + j);
      $minuteSelectOption.attr('class', 'minuteSelectOption');
      //Adds an initial zero if the minute number is below 10 (i.e. 01, 02, 03...)
      if (j < 10) {
        $minuteSelectOption.attr('value', "0" + j);
        $minuteSelectOption.html("0" + j);
      }
      else {
        $minuteSelectOption.attr('value', "" + j);
        $minuteSelectOption.html(j);
      }
      $('#minute-select').append($minuteSelectOption);
    }
  /* ----- */

      $('#lost-pet div').removeClass('trigger-hover');
      $('#found-pet div').addClass('trigger-hover');
  },

  initialize: function( options ){
    _.extend( this, options );
    this.render();
  },

  events: {
    'change #upload-photo' : 'populateFields',
    'submit #upload-form'  : 'submitForm',
    'click #uploadDate' : 'datepickerForm',
    'click #upload-photo-div button' : 'uploadPhoto',
    'click #previewHolderButton' : 'uploadPhoto',
    'click #uploadLocationButton' : 'googleAutocomplete',
    'click .alert' : 'removeAlert',
    'click .animal-photo-div' : 'breedType',
  },


  breedType: function(event) {
    var self = this;
    if (!(event.target.id)) {
      self.breed = event.target.parentElement.id;
    }
    else {
      self.breed = event.target.id;
    }
    $('#upload-photo').trigger('click');
  },

  removeAlert: function(event) {
    $('#' + event.target.id).remove();
  },

  uploadPhoto: function(event) {
  //When the upload photo button is clicked, this triggers a click on a separate, HIDDEN input (type=file) field
    $('#upload-photo').trigger('click');
  },

  datepickerForm: function() {
    //Creates Datepicker feature
    $('#uploadDateDiv').datepicker('show').on('changeDate', function(ev){
    })
  },

  populateFields : function() {
    //Resets lat/lng each time photo is uploaded

    var $imageField = $('#upload-photo');
    var $imagePreview = $('#previewHolder');

    var self = this;
    var geocoder;
    var displayDate;
    var displayTime;

    //Alert if improper photo is uploaded; This is the same warning that appears in the submitForm (following function) validation check
    var $uploadWarning = $('<div id="alertRequired" class="alert alert-warning alert-dismissible col-sm-9 col-sm-offset-2 col-lg-8 col-lg-offset-2" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong> Must be a photo in JPEG format </strong></div>');
    var uploadWarningColor = '#FCF8E3';

    //Clears data fields and any previously-stored lat/long data each time new photo is uploaded
    $('#uploadDate').val(' ');

    // self.location.lat = 0;
    // self.location.lng = 0;

    $('#uploadLocation').val(' ');
    $('[name=hour]').prop('selectedIndex', 0);
    $('[name=minute]').prop('selectedIndex', 0);
    $("input[name='am-pm']").prop("checked", false);
    $('#alertRequired').remove();

    //Clears image preview rotation classes each time new photo is uploaded
    if (  $('#previewHolder').hasClass('rotate90')  ) {
      $('#previewHolder').removeClass('rotate90');
    }
    if (  $('#previewHolder').hasClass('rotate180') ) {
      $('#previewHolder').removeClass('rotate180');
    }
    if (  $('#previewHolder').hasClass('rotate270') ) {
      $('#previewHolder').removeClass('rotate270');
    }

    //Pre-selects animal type using global -- app.breed -- variable, which is set on initial photo upload
    $('#uploadSpecies').val(this.breed);

    //In case someone uploads a non-geotagged photo and then swaps it  for one with geotagged data, this clears the map
    if ($('#locationMap')) {
      $('#locationMap').remove();
      $('uploadLocationButton').removeClass('display-none');
    }

    //Uses Google Geocoder to convert lat/long into address; inputs address into form's location field
    function codeAddress() {
      geocoder = new google.maps.Geocoder;
      geocoder.geocode( { 'location': {lat: self.loc.lat, lng: self.loc.lng}}, function(results, status) {
        $('#uploadLocation').val(results[0].formatted_address);
      });
    }

    /* -----
      Receives exif data from getExifData() function below;
      Extracts/Converts lat/lng data & time
    ----- */
    function readFromExif ( exifData ) {
      //If geolocation exif data is abset, googleAutocomplete is called - which:
        //Adds google autocomplete feature to location field;
        //Attaches map
        console.log('exif', this.exif)
      $('#reveal-form').removeClass('display-none');

      if ( !(exifData.GPSLatitude) || !(exifData.GPSLongitude) ) {
        self.googleAutocomplete();
      }
      //Runs if geolocation data exists
      else {
        // This rotates the image correctly based on exif data's noted orientation;
        // Rotation classes are also removed each time a new photo is uploaded

        switch (  parseInt(exifData.Orientation)  ) {
          case 3:
            $('#previewHolder').addClass('rotate180');
            break;
          case 6 :
            $('#previewHolder').addClass('rotate90');
            break;
          case 8:
            $('#previewHolder').addClass('rotate270');
            break;
        }

        //Displays the "Edit Location" button below auto-filled in address;
        //This allows user to edit address without automatically calling google places API every time new photo is uploaded
        //When clicked, this button loads google map and creates google autocomplete field
        $('#uploadLocationButton').removeClass("display-none");

        //Converts lat/lng exif data into decimal format;
        function degToDec(latLngArray) {
          var decimal = (latLngArray[0] + (latLngArray[1]/ 60) + (latLngArray[2]/ 3600));
          return decimal;
        }
        var latDecimal = degToDec(exifData.GPSLatitude);

        if (exifData.GPSLongitudeRef === "W") {
          var lngDecimal = (-(degToDec(exifData.GPSLongitude)));
        }
        else {
          var lngDecimal = degToDec(exifData.GPSLongitude);
        }

        //Passes exif lat/lng to this view's lat/lng properties (which are declared when this view is initially created)
        self.loc.lat = latDecimal;
        self.loc.lng = lngDecimal;

        //Run codeAddress() to display street address in form's location input field
        codeAddress();
      }

      //Reads and converts exif data's timestamp into usable format
      if (exifData.DateTime) {

        var dateTime = exifData.DateTime.split(' ')[0].split(':').join('-');

        displayDate = exifData.DateTime.split(' ')[0];

        displayTime = exifData.DateTime.split(' ')[1];

        displayDate = (displayDate.split(':'));
        xYear = displayDate[0];
        xMonth = displayDate[1];
        xDay = displayDate[2];

        $('#uploadDate').val(xMonth + '-' + xDay + '-' + xYear);

        displayTime = (displayTime.split(':'));


        //Uses extracted exif-data time to autofill form's hour/minute/am-pm fields
        if (parseInt(displayTime[0]) > 12) {

          $("#pm").prop("checked", true);

          var hour = displayTime[0] - 12;
          var minute = displayTime[1];

          $('#hour-select').val(hour);
          $('#minute-select').val(minute);
          displayTime = (displayTime[0] - 12) + ":" + displayTime[1] + "pm";

          if (displayTime[0][0] === 0) {
            displayTime = (displayTime[0][1]) + ":" + displayTime[1] + "am";
          }
          else {
            displayTime = displayTime[0] + ":" + displayTime[1];
          }
        }
        else if (displayTime[0][0] === 0) {
          displayTime = (displayTime[0][1]) + ":" + displayTime[1] + "am";
        }
        else {
          displayTime = displayTime[0] + ":" + displayTime[1];
        }

      }
    }
    /* ---- */

    //Uses Filereader to generate a url of photo;
    //To preview image, the url is applied to an empty image's "src" attribute
    function previewImage ( inputElement ) {
      var image  = inputElement[0].files[0];
      var reader = new FileReader();

      reader.onload = function(event) {
        $imagePreview.attr('src', event.target.result);
        $('#upload-photo-div').remove();
        // Shows image preview
        $imagePreview.removeClass('display-none');
        $('#previewHolderDiv').removeClass('display-none');
        $('#previewHolderButtonDiv').removeClass('display-none');
      };
      reader.readAsDataURL( image );

    }
    //Reads exif data of image; passes exif data as argument into readerFromExif() function above
    function getExifData ( ) {
      var image = $imageField[0].files[0];
      var self = this;

      EXIF.getData(image, function() {
        var xf = EXIF( this ).EXIFwrapped.exifdata;
        self.exif = xf;
        readFromExif(xf);
      });
    }

    /* -------------------------------------------------------------------------
      Checks if uploaded file is: a photo, and in JPEG format;
      If not, extracting exif data and previewing image is blocked from running;
    ---------------------------------------------------------------------------*/
    var fileTypeArray = $imageField[0].files[0].type.toLowerCase();
    if (  (!(fileTypeArray.indexOf('image') >= 0 )) || (  !(fileTypeArray.indexOf('jpeg') >= 0 ) )   ) {
      if (  $('#alertRequired').length ) {
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }
      else {
        $('#upload-form').prepend($uploadWarning);
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }
    }
    else {
      getExifData();
      previewImage( $imageField );
    }

  },

  submitForm : function(event) {
    event.preventDefault();

    var self = this;
    var requestObject = {};

    //Dismissable Warning - used when required form fields are absent
    var $uploadWarning = $('<div id="alertRequired" class="alert alert-warning alert-dismissible col-sm-9 col-sm-offset-2 col-lg-8 col-lg-offset-2" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong> Missing Required Fields </strong></div>');
    var uploadWarningColor = '#FCF8E3';

    // If the initial form submittal is denied because of missing required fields, this resets the highlighted background colors
    $('#upload-form').children().not('button').css('background-color', 'transparent');

    requestObject.animalType = $("#uploadSpecies option:selected").val();
    requestObject.location = {
      lat: self.loc.lat,
      lng: self.loc.lng
    };
    requestObject.address = $('#uploadLocation').val();

    (function() {
      var date = $('#uploadDate').val().split('-');
      var month = date[0];
      var day = date[1];
      var year = date[2];

      requestObject.dateTime = year + "-" + month + "-" + day;
    })();

    (function() {
      var date = $('#uploadDate').val();

      var month = {
        m01 : 'January',
        m02 : 'February',
        m03 : 'March',
        m04 : 'April',
        m05 : 'May',
        m06 : 'June',
        m07 : 'July',
        m08 : 'August',
        m09 : 'September',
        m10 : 'October',
        m11 : 'November',
        m12 : 'December'
      }

      var xDate = date.split('-');

      var xYear = xDate[2];

      var xMonth = month['m' + xDate[0]];

      var xDay = xDate[1];

      requestObject.displayDate = xMonth + ' ' + xDay + ', ' + xYear;
      })();

      requestObject.displayTime = '' + $('#hour-select').val() + ':' + $('#minute-select').val() + ' ' + $('input[name="am-pm"]:checked').val();
      requestObject.colors = $('input[name="color-group"]:checked').map(function() {
        return this.value;
      }).toArray();
      requestObject.description = $('#uploadDescription').val();
      requestObject.imageUrl = $('#previewHolder').attr('src');
      requestObject.exifData = this.exif

      sendToServer();


    //send it off
    function sendToServer () {

      var errorCount = 0;

      if (  $('.alert').length  ) {
        $('.alert').remove();
      }
      if (  !($('#uploadLocation').val() )) {
        self.loc.lat = null;
        self.loc.lng = null;
      }

      $('#upload-form').children().not('button').css('background-color', 'transparent');

      var $uploadWarning = $('<div class="alert alert-warning alert-dismissible col-sm-9 col-sm-offset-2 col-lg-8 col-lg-offset-2" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong> Missing Required Fields </strong></div>');
      var uploadWarningColor = '#FCF8E3';

      if (  $('#uploadSpecies').find(":selected").index() === 0   ) {
        errorCount += 1;
        $('#uploadSpecies').css('background-color', uploadWarningColor );
        console.log('Form Validation Failed: No Animal Selected');
      }

      if ( (self.loc.lat === 0) || (self.loc.lng === 0)  ) {
        errorCount += 1;
        $('#uploadLocation').css('background-color', uploadWarningColor);
        console.log('Form Validation Failed: No Latitude or Longitude Set; Incorrect Location');
      }
      //Check Time/HR/Minutes/AM-PM
      if ( $('#hour-select').find(":selected").index() === 0   ) {
        errorCount += 1;
        $('#hour-select').css('background-color', uploadWarningColor);
        console.log('Form Validation Failed: No Hour Selected');
      }

      if ( !$('#am').prop('checked') ) {
        if (  !$('#pm').prop('checked')   ) {
          errorCount += 1;
          $('#am-pm-div').css('background-color', uploadWarningColor);
          console.log('Required Field: Please Select AM/PM');
        }
      }

      console.log('color group', $('input[name="color-group"]:checked'))

      if ( requestObject.colors.length === 0 ) {
        errorCount += 1
        $('#colors').css('background-color', uploadWarningColor);
        console.log('Form Validation Failed: No Color Selected');
      }
      //Checks to see if there are any errors; If not, sends form

      console.log('error count', errorCount)
      if (errorCount > 0) {
        $('#upload-form').prepend($uploadWarning);
        $("html, body").animate({ scrollTop: 0 }, "slow");
      }
      else {
      // //While waiting for server response, this adds a rotating refresh icon and hides form
        $('#upload-form').children().hide();
        $refresh = $('<i id="refresh" class="glyphicon glyphicon-refresh gly-spin"></i>');
        $refresh.appendTo('#upload-form');

      //Sends Form:
        //If successful:
          //receives "true" response from server
          //Runs self.google, which runs successful submission response and removes #upload-form
        $.ajax({
          method: "POST",
          url: "/pet",
          data: { data : JSON.stringify(requestObject) },
          success: function(data) {
            if (data === true) {
              app.lat = self.loc.lat;
              app.lng = self.loc.lng;
              app.router.navigate('successful', {trigger : true})
            }
            else {
              $("#refresh").remove();
              $("#reveal-form").hide();
              app.router.navigate('error', {trigger : true})
            }
          }
        });

      }
    }

  },

  googleAutocomplete: function() {
    /*------------------------------------------------------------------------
      In case the exif geolocation data is abset, this entire function adds a:
        --Google Autocomplete Input Field and Map to the form's location field.
    ------------------------------------------------------------------------*/
    $('#uploadLocationButton').addClass('display-none');
    $('<div id="locationMap" class="col-xs-12" style="height:300px"></div>').insertAfter('#uploadLocation');

    var autocomplete;
    var map;
    var request;
    var place;
    var infoWindow;
    var marker;
    var geocoder;

    var self = this;

    /*  ----
        Builds Google Autocomplete Input field
    */
    //Sets options for Google Autocomplete
    (function() {
      var options = {
        types: ['geocode'],
        componentRestrictions: {
          country: 'USA'
        }
      };
      //Creates instance of Google Autocomplete
      autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.getElementById('uploadLocation')), options);
    })();
    /*  ----  */

    /*  ----
        When a Google Autcomplete Location is selected, this captures lat/long and creates marker
    */
    //This function is triggered as a listener on the autocomplete, which is declared immediately after codeAddress() function below
    function fillInAddress() {
      place = autocomplete.getPlace();
      self.loc.lat = place.geometry.location.lat();
      self.loc.lng = place.geometry.location.lng();
      createMarker();
    }
    //Creates new markers
    function createMarker(xMapClickEvent) {
      //Clears existing marker when new marker is added
      if (marker) {
        marker.setMap(null);
      }
      //Builds and Appends Marker
      marker = new google.maps.Marker({
        map: map,
        position: {lat: self.loc.lat, lng: self.loc.lng},
        animation: google.maps.Animation.DROP,
        draggable:true
      });
      //Provides drag functionality to marker; Sets marker creation and captures lat/long when drag is complete
      google.maps.event.addListener(marker,'dragend',function(event) {
        self.loc.lat = event.latLng.lat();
        self.loc.lng = event.latLng.lng();
        codeAddress();
      });
      codeAddress();
      map.setZoom(12);
      map.setCenter({lat: self.loc.lat, lng: self.loc.lng});
    }

    //Uses Geocoder to convert lat/long into Street Address to display in location input field
      //Geocoder sends a request using lat/long;
      //Takes first (formatted address) result and sets location input form field to value
    function codeAddress() {
      geocoder.geocode( { 'location': {lat: self.loc.lat, lng: self.loc.lng}}, function(results, status) {
        $('#uploadLocation').val(results[0].formatted_address);
      });
    }
    autocomplete.addListener('place_changed', fillInAddress);

    /*  ----  */

    /* ----------------
     Creates Google Map
    ------------------- */
    (function () {

      var centerLat;
      var centerLng;

      //This gets current geolocation data from BROWSER (requests permission from client);
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      }
      //If browser lacks geolocation data (or client denies permission to access) this centers map on entire united states
      else {
        map = new google.maps.Map(document.getElementById('locationMap'), {
          center: {lat: 39.5, lng: -98.35},
          zoom: 4
        });
        mapListener();
      }
      //Generates map using BROWSER location data if initial "if" statement is met
      function showPosition(position) {
        centerLat = position.coords.latitude;
        centerLng = position.coords.longitude;
        map = new google.maps.Map(document.getElementById('locationMap'), {
          center: {lat: centerLat, lng: centerLng},
          zoom: 12
        });
        mapListener();
      }

      function mapListener() {
        //Adds click and drop pin capability to Google Map
          //Saves value of lat/long to Location variable (at top)
        map.addListener('click', function(mapClickEvent) {
          // location.lat = mapClickEvent.latLng.lat();
          // location.lng = mapClickEvent.latLng.lng();
          self.loc.lat = mapClickEvent.latLng.lat();
          self.loc.lng = mapClickEvent.latLng.lng();
          createMarker(mapClickEvent);
        });
        //Creates Google Geocoder, which is needed by the codeAddress() function:
          //This is needed to convert lat/long into Street Address, to display in location's input field for user
        geocoder = new google.maps.Geocoder;
      }

    })();
  }

});
