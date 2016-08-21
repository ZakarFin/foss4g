/**
 * Connect to map and call startApp() with
 *  reference to open channel
 */
var channel = OskariRPC.connect(
  // reference to iframe
  document.getElementById('map'),
  // domain that is src on iframe
  'http://www.paikkatietoikkuna.fi'
);
channel.onReady(function() {
  //channel is now ready and listening.
  startApp(channel);
});
