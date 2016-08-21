var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules/oskari-rpc/dist'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/map.html');
});

var server = app.listen(3000, function() {
  console.log('Listening on port ' + server.address().port + '!');
});
