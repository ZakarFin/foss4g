var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules/oskari-rpc/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/map.html');
});

var server = app.listen(3000, function () {
  console.log('Listening on port ' + server.address().port + '!');
});

// http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// http://www.camptocamp.com/actualite/from-tilecache-to-wmts/
// http://maps.stamen.com/#toner/12/37.7706/-122.3782
// http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
// http://v2.suite.opengeo.org/geoserver/gwc/service/wmts/?SERVICE=WMTS&REQUEST=GetCapabilities