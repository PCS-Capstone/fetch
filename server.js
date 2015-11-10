var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var pretty = require('prettyjson');

var config = require('./config');
var db = require('orchestrate')(config.dbkey);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(__dirname));

//==================================
//   CLOUD STORAGE CODE HERE
var cloudinary = require('cloudinary');
var uploader   = cloudinary.uploader;

cloudinary.config( config.cloudinary );
//==================================


app.get('/', function (request, response){
  response.sendFile( __dirname + '/public/index.html' );
});

app.get('/pet', function (request, response) {
  console.log(request.query)

  var search = request.query;

  search.location = JSON.parse(search.location);

  var query = "value.animalType: (" + search.animalType + ")" +
  "AND value.location:NEAR:{latitude:" + search.location.lat +
  " longitude:" + search.location.lng + " radius:" + search.radius + "mi" + "}" +
  "AND value.dateTime: [" + search.startDate  + " TO " + search.endDate + "]"

  if (search.colors) {
    query += "AND value.colors: (" + search.colors + ")"
  }

	db.search('test', query)

	.then(function(result) {
    console.log('result', result.body.results);
    response.send(result.body.results);
	})
	.fail(function(err){
		console.log('error');
	});
});

app.post('/pet', function(request, response) {
  // console.log(upload)
  // console.log('request.file =', request.file);
  // console.log('data.file =', request.body.data.file )
  var data = JSON.parse(request.body.data);
  console.log(data)
  // console.log( 'image url=', data.imageUrl );

  // uploader.upload( data.imageUrl, function (result)  {
    //console.log('return after upload: ', result);

    // data.imageUrl = result.url.replace(/upload/, 'upload/a_exif');;

    // data.imageUrl.replace('')
    // console.log( data )
    // console.log( data.imageUrl );
    // db.post('test', data)
    //   .then(function (result) {
    //     console.log( 'confirmed!: ', pretty.render( JSON.parse( result.request.body ) ) );
    //     //Sends 'true' back to client's ajax request if successful;
    //     //Throws error if 'true' isn't received back
    //     response.send(true);
    //   })
    //   .fail(function(err){
    //     console.log(err);
    //     response.send('Error Uploading Photo in Database');
    // });
    response.send(true);
});

app.listen(3000);
console.log( 'listening on PORT:3000' );

//cloudinary.api.delete_all_resources(function(result){})

//console.log('destroyed all cloudinary images')
