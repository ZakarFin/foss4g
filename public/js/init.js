
var channel = OskariRPC.connect(
    document.getElementById('map'),
    'http://www.paikkatietoikkuna.fi'
);
channel.onReady(function() {
    //channel is now ready and listening.
    startApp(channel);
}); 