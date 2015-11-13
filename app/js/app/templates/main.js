// ===========================
// Handlebars Template Strings
//
// 1. Search for Pets
// 2. Uploading a Pet
// 3. Google Maps
// ===========================



/****************************************************
*****************************************************
          SEARCHING-FOR-PET TEMPLATES
*****************************************************
*****************************************************/

// Searchform
// ----------
App.Templates['template-searchform'] =
  '<form class="form-horizontal">' +
  '  <div class="form-group" id="search-form">' +
  '    <label class="control-label col-xs-2 required"> **Required fields</label>' +
  '  </div>' +

  '  <div class="form-group">' +
  '    <label for="animal-type" class="control-label col-sm-2">**Animal Type</label>' +
  '    <div class="col-sm-9 col-lg-8">' +

  '      <select name="animal-type" class="form-control" id="animal-type" aria-required="true" required>' +
  '        <option value="" disabled selected>"What kind of animal are you looking for?"</option>' +
  '        <option value="Dog"> Dog </option>' +
  '        <option value="Cat"> Cat </option>' +
  '        <option value="Bird"> Bird </option>' +
  '        <option value="Small-Furry"> Small and Furry </option>' +
  '        <option value="Scales-Fins"> Scales and Fins</option>' +
  '        <option value="Barnyard"> Barnyard </option>' +
  '      </select>' +
  '    </div>' +
  '  </div>' +

  '  <div class="form-group">' +
  '    <label for="address" class="control-label col-sm-2">**Starting Address</label>' +
  '    <div class="col-sm-9 col-lg-8">' +
  '      <input type="text" id="address-bar" class="col-xs-12 col-sm-12 form-control" name="address" placeholder="Address"  aria-required="true" required>' +
  '    </div>' +
  '  </div>' +


  '  <div class="form-group">' +
  '    <label for="radius" class="control-label col-sm-2">**Search Radius                 </label>' +
  '    <div class="col-sm-9 col-md-6">' +
  '      <input type="number" id="radius-bar" class="col-xs-12 col-sm-9 col-lg-8 form-control" name="radius" placeholder="Radius (in miles)"  aria-required="true" required>' +
  '    </div>' +
  '  </div>' +

  '  <div class="form-group">' +
  '    <label for="date" class="control-label col-xs-2">**Search From: </label>' +
  '    <div class="col-sm-9 col-md-6 input-append date" id="start-date-div" data-date="" data-date-format="yyyy-mm-dd">' +
  '      <input type="text" readonly="readonly" name="start-date" placeholder="Start Date" id="start-date" class="span2 col-xs-12 col-sm-9 col-lg-8 form-control" value="" maxlength="10" placeholder="yyyy-mm-dd" aria-required="true" required>' +
  '      <span class="add-on"><i class="icon-th"></i></span>' +
  '    </div>' +
  '  </div>' +

  '  <div class="form-group">' +
  '   <label for="date" class="control-label col-xs-2">**Search To: </label>' +
  '    <div class="col-sm-9 col-md-6 input-append date" id="end-date-div" data-date="" data-date-format="yyyy-mm-dd">' +
  '      <input type="text" readonly="readonly" name="end-date" placeholder="End Date" id="end-date" class="span2 col-xs-12 col-sm-9 col-lg-8 form-control" value="" maxlength="10" aria-required="true" required>' +
  '      <span class="add-on"><i class="icon-th"></i></span>' +
  '    </div>' +
  '  </div>' +

  '  <div class="form-group">' +
  '    <label for="color-group" class="control-label col-xs-2">Colors</label>' +
  '    <div class="col-xs-9 checkboxes">' +

  '      <div class="input-group">' +
  '        <div class="checkbox-inline">' +
  '          <input type="checkbox" name="color-group" value="White"> White </input>' +
  '        </div>' +
  '        <div class="checkbox-inline">' +
  '          <input type="checkbox" name="color-group" value="Black"> Black </input>' +
  '        </div>' +
  '        <div class="checkbox-inline">' +
  '          <input type="checkbox" name="color-group" value="Brown"> Brown</input>' +
  '        </div>' +
  '      </div>' +

  '      <div class="input-group">' +
  '        <div class="checkbox-inline">' +
  '          <input type="checkbox" name="color-group" value="Orange"> Orange</input>' +
  '        </div>' +
  '        <div class="checkbox-inline">' +
  '          <input type="checkbox" name="color-group" value="Yellow"> Yellow</input>' +
  '        </div>' +
  '        <div class="checkbox-inline">' +
  '          <input type="checkbox" name="color-group" value="Gray"> Gray</input>' +
  '        </div>' +
  '        <div class="checkbox-inline">' +
  '          <input type="checkbox" name="color-group" value="BrighlyColored"> Brightly Colored</input>' +
  '        </div>' +
  '      </div>' +
  '    </div>' +
  '  </div>' +
  '  <button type="submit" class="btn btn-success">Submit</button>' +
  '</form>';



// Results List Container
// ----------------------
App.Templates['template-results-list'] =
  '<div class="panel panel-default">' +
  '   <div class="panel-body">' +
  '     <span class="pull-left">' +
  '     Search Results For:' +
  '     <br>' +
  '     <span>' +
  '        {{#if colors}}' +
  '          {{#each colors}} {{this}} {{/each}}' +
  '        {{/if}}' +

  '        {{animalType}} sightings within {{radius}} miles of {{address}}' +

  '        from {{prettyStartDate}} to {{prettyEndDate}}' +

  '      </span>' +
  '    </span>' +
  '    <div class="btn-group pull-right">' +
  '      <button id="edit" class="btn btn-default">Edit</button>' +
  '      <button id="map-button" class="btn btn-default">Map View</button>' +
  '      <button id="tile-button" class="btn btn-default" style="display: none">List View</button>' +
  '    </div>' +
  '  </div>' +
  '</div>';



// Particular Search Results
// -------------------------
App.Templates['template-tile-view'] =
  '<div class="row">' +
  '  <div class="col-xs-5">' +
  '    <img src={{imageUrl}} style="max-width:100%; max-height:100%"></img>' +
  '  </div>' +
  '  <div class="col-xs-6">' +
  '    <h4>Type: {{animalType}}</h4>' +
  '    {{#if colors}}' +
        '<h4>Color: {{#each colors}} {{this}} {{/each}}' +
        '{{/if}}</h4>' +
          '  <h4>Last seen: {{displayDate}} at {{displayTime}} near {{address}}</h4>' +
  '  </div>' +
  '</div>' +

  '<div class="flex-row">' +
  '  <button class="btn btn-info btn-lg">Location/Map</button>' +
  '</div>' +

  '{{#if description}}' +
  '  <button class="btn btn-default btn-description">+</button>' +
  '  <div class="row description" style="display: none">' +
  '    <h4 class="col-xs-12">Description:</h4>' +
  '    <p class="col-xs-12">{{description}}</p>' +
  '  </div>' +
  '{{/if }}';



// No Search Results
// -----------------
App.Templates['template-no-results'] =
  '<h1>No Results Found</h1>' +
  '  <p>Sorry, no pet sightings match your search criteria...</p>' +
  '  <button type="button" id="no-results">Search again?</button>';



/****************************************************
*****************************************************
        UPLOADING-A-SIGHTING TEMPLATES
*****************************************************
****************************************************/

// Upload Form
// -----------
App.Templates['template-upload-sighting'] =
'<div id="map" class="display-none"> </div>' +

'<form id="upload-form" class="form-horizontal">' +
  '<div class="row">'+
    '<div id="previewHolderDiv" class="display-none col-sm-6 col-sm-offset-3">'+
      '<img id="previewHolder"  class="display-none" alt=""/>'+
    '</div>'+
  '</div>'+
'  <div class="row">'+
    '<div id="upload-photo-div" class="col-sm-offset-1 col-sm-10">'+
    '<div class="row">'+
      '<div class="col-xs-10 col-xs-offset-1">'+
        '<h1> Have You Found a Lost Pet? </h1>'+
        '<p class="text-center"> What kind of animal is it?</p>'+
      '</div>'+
    '</div>'+
    '<div class="row">'+
      '<div id="upload-camera">'+
        '<span class="glyphicon glyphicon-camera" aria-hidden="true"></span>'+
      '</div>'+
    '</div>'+
      '<div class="row" id="upload-animals">'+
        '<div class="col-sm-6 col-md-4 animal-photo-div">'+
          '<div id="Dog">'+
            '<h3> Dog </h3>'+
            '<span class="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>'+
          '</div>'+
        '</div>'+
        '<div class="col-sm-6 col-md-4 animal-photo-div">'+
          '<div id="Cat">'+
            '<h3> Cat </h3>'+
            '<span class="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>'+
          '</div>'+
      '  </div>'+
        '<div class="col-sm-6 col-md-4 animal-photo-div">'+
          '<div id="Bird">'+
            '<h3> Bird </h3>'+
            '<span class="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>'+
          '</div>'+
        '</div>'+
        '<div class="col-sm-6 col-md-4 animal-photo-div">'+
          '<div id="Small-Furry">'+
            '<h3> Small & Furry </h3>'+
            '<span class="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>'+
          '</div>'+
        '</div>'+
        '<div class="col-sm-6 col-md-4 animal-photo-div">'+
          '<div id="Scales-Fins" >'+
            '<h3> Scales and Fins </h3>'+
            '<span class="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>'+
          '</div>'+
        '</div>'+
        '<div class="col-sm-6 col-md-4 animal-photo-div">'+
          '<div id="Barnyard">'+
            '<h3> Barnyard </h3>'+
            '<span class="glyphicon glyphicon-cloud-upload" aria-hidden="true"></span>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
'  </div>'+

  '    <div class="form-group hidden">' +
  '      <input type="file" name="photo" value="" id="upload-photo" class="required borrowerImageFile" data-errormsg="PhotoUploadErrorMsg" accept="image/*">' +
  '      </input>' +
  '    </div>' +

  '    <div id="reveal-form" class="display-none">' +

  '      <div id="previewHolderButtonDiv" class="text-center display-none">' +
  '        <button id="previewHolderButton" type="button" class="btn btn-info"><span class="glyphicon glyphicon-edit " aria-hidden="true"></span> Change Photo </button>' +
  '      </div>' +

  '      <div class="row">' +
  '        <div class="col-sm-2 text-right">' +
  '          <em>** Required Fields</em>' +
  '        </div>' +
  '      </div>' +


  '      <div class="form-group">' +
  '        <label for="uploadSpecies" class="col-sm-2 control-label">' +
  '          ** Type of Animal:' +
  '        </label>' +

  '        <div class="col-sm-9 col-lg-8">' +
  '          <select id="uploadSpecies" class="form-control" name="animal-type" aria-required="true" required>' +
  '            <option value="" disabled selected>"What kind of animal is it?"</option>' +
  '            <option value="Dog"> Dog </option>' +
  '            <option value="Cat"> Cat </option>' +
  '            <option value="Bird"> Bird </option>' +
  '            <option value="Small-Furry"> Small and Furry </option>' +
  '            <option value="Scales-Fins"> Scales and Fins</option>' +
  '            <option value="Barnyard"> Barnyard </option>' +
  '          </select>' +
  '        </div>' +
  '      </div>' +

  '      <div class="form-group">' +
  '        <label for="uploadLocation" class="col-sm-2 control-label">' +
  '          ** Location:' +
  '        </label>' +
  '        <div class="col-sm-9 col-lg-8">' +
  '          <input id="uploadLocation" class="form-control" type="text" name="address" placeholder="Location" aria-required="true" required>' +
  '          <button type="button" id="uploadLocationButton" class="btn btn-info pull-left display-none"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit Location</button>' +
  '        </div>' +
  '      </div>' +

  '      <div class="form-group">' +
  '        <label for="uploadDate" class="col-sm-2 control-label">' +
  '          ** Date of Sighting:' +
  '        </label> ' +
  '        <div class="col-sm-9 col-md-4  input-append date" id="uploadDateDiv" data-date="" data-date-format="mm-dd-yyyy">' +
  '          <input id="uploadDate" class="form-control span2" type="text" readonly="readonly" name="date" value="" maxlength="10" placeholder="Date" aria-required="true" required>' +

  '          <span class="add-on"><i class="icon-th"></i></span>' +
  '        </div>' +
  '      </div>' +
  '      <div class="form-group">' +
  '        <label class="col-sm-2 control-label">' +
  '          ** Time:' +
  '        </label>' +
  '        <div id="hour" class="col-sm-4 col-md-2 input-group pull-left">' +
  '          <span class="input-group-addon">hr</span>' +
  '          <select id="hour-select" class="form-control" name="hour" aria-required="true" required>' +
  '          </select>' +
  '        </div>' +
  '        <div id="minute" class="col-sm-5 col-md-3 input-group pull-left">' +
  '          <span class="input-group-addon">minutes</span>' +
  '          <select id="minute-select" class="form-control" name="minute" aria-required="true" required>' +
  '          </select>' +
  '        </div>' +
  '        <div id="am-pm-div" class="radio col-sm-1 col-md-2 pull-left">' +
  '          <label>' +
  '            <input type="radio" name="am-pm" id="am" value="am" aria-required="true" required>' +
  '              am' +
  '          </label>' +
  '          <label>' +
  '            <input type="radio" name="am-pm" id="pm" value="pm" aria-required="true" required>' +
  '              pm' +
  '          </label>' +
  '        </div>' +
  '      </div>' +
  '      <div class="form-group">' +
  '        <label class="col-sm-2 control-label">' +
  '            ** Color:' +
  '        </label>' +

  '        <fieldset id="colors" aria-required="true" required>' +
  '          <div id="white" class="color col-xs-6 col-md-3 pull-left">' +
  '            <input id="uploadWhite" type="checkbox" name="color-group" value="White" aria-label="uploadWhite">' +
  '            <label for="uploadWhite">' +
  '              White' +
  '            </label>' +
  '          </div>' +
  '          <div id="black" class="color col-xs-6 col-md-3 pull-left">' +
  '            <input id="uploadBlack" type="checkbox" name="color-group" value="Black">' +
  '            <label for="uploadBlack">' +
  '              Black' +
  '            </label>' +
  '          </div>' +
  '          <div id="brown" class="color col-xs-6 col-md-3 pull-left">' +
  '            <input id="uploadBrown" type="checkbox" name="color-group" value="Brown">' +
  '            <label for="uploadBrown">' +
  '              Brown' +
  '            </label>' +
  '          </div>' +
  '          <div id="orange" class="color col-xs-6 col-md-3 pull-left">' +
  '            <input id="uploadOrange" type="checkbox" name="color-group" value="Orange">' +
  '            <label for="uploadOrange">' +
  '              Orange' +
  '            </label>' +
  '          </div>' +
  '          <div id="yellow" class="color col-xs-6 col-md-3 pull-left">' +
  '            <input id="uploadYellow" type="checkbox" name="color-group" value="Yellow">' +
  '            <label for="uploadYellow">' +
  '              Yellow' +
  '            </label>' +
  '          </div>' +
  '          <div id="gray" class="color col-xs-6 col-md-3 pull-left">' +
  '            <input id="uploadGray" type="checkbox" name="color-group" value="Gray">' +
  '            <label for="uploadGray">' +
  '              Gray' +
  '            </label>' +
  '          </div>' +
  '          <div id="bright" class="color col-xs-6 col-md-3 pull-left">' +
  '            <input id="uploadBright" type="checkbox" name="color-group" value="BrightlyColored">' +
  '            <label for="uploadBright">' +
  '              Brightly-Colored' +
  '            </label>' +
  '          </div>' +
  '        </fieldset>' +
  '      </div>' +
  '      <div class="form-group">' +
  '        <label for="uploadDescription" class="col-sm-2  control-label">' +
  '          Enter description:' +
  '        </label>' +
  '        <div class="col-sm-9 col-md-9 col-lg-8">' +
  '          <textarea id="uploadDescription" name="description" class="form-control col-sm-10 col-md-9 col-lg-8"></textarea>' +
  '        </div>' +
  '      </div>' +
  '      <button type="submit" class="btn btn-primary btn-lg center-block"> Submit </button>' +
  '    <div>' +
  '  </form>' +
  '<div>';

// Sucessful Upload
// ----------------
App.Templates['template-successful-submission'] =
  '<h1>SUCCESS</h1>' +
  '    <p>Your sighting was uploaded succesfully!  Thank you for taking the time to share' +
  '    this information with your community.  Your contribution may help reconnect a pet owner' +
  '    to their lost pet!</p>' +
  '    <p>If you happen to have the animal in your possesion, here is some advice on what' +
  '    to do next:</p>' +
  '    <p>1. Contact local animal shelters/rescues in your area.  They can give you advice on' +
  '    what to do with the animal.  In some cases, they may arrange to come pick up the animal' +
  '    to keep in their care why they look for the owner.</p>' +
  '    <p>2. Contact your local police department to report the missing animal.  The owner may' +
  '    contact the police department asking if anyone has reported having found a lost animal.</p>' +
  '    <p>3. Contact a local veterinary clinic to see if they have the capabilities to scan the' +
  '    animal for an identification chip.  Some pet owners have identifing chips surgically placed' +
  '    in their animal that contain their contact information, and some veterinary offices have the' +
  '    ability to scan the animal to check for these chips and they can help contact the owner.</p>' +
      '<div id="map"</div>'


// Error on Upload
// ---------------
App.Templates['template-upload-error'] =
  '<h1>Uh Oh...</h1>' +
  '  <p>Sorry, it looks like something went wrong.  Do not worry, we still have all the information' +
  '  you entered...</p>' +
  '  <button type ="button" id="error">Try again?</button>';



/****************************************************
*****************************************************
              GOOGLE MAPS TEMPLATES
*****************************************************
****************************************************/

// Map Pin Info Window
// -------------------
App.Templates['template-infowindow'] =
  '<div class="row">' +
  '    <img class="col-xs-6" src={{imageUrl}}>' +
  '    <div class="col-xs-6">' +
  '      <p>{{colors}} {{animalType}}</p>' +
  '      <p>sighted on {{dateTime}}</p>' +
  '      <p>@ {{address}}</p>' +
  '    </div>' +
  '  </div>' +
  '  {{#if description}}' +
  '    <div class="row">' +
  '      <div class="col-xs-12">' +
  '        {{description}}' +
  '      </div>' +
  '    </div>' +
  '  {{/if }}';
