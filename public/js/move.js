/**
 * startApp-function with examples on handling map location:
 * - listen to map clicks
 * - listen to map moves
 * - map position, bbox and zoom range
 * - request user location
 */
function startApp(channel) {
    channel.log('Starting the app');
    channel.handleEvent('MapClickedEvent', function(data) {
        console.log('Map clicked at N: ' + data.lat + ' E:' + data.lon, data);
        channel.postRequest('MapMoveRequest', [data.lon, data.lat]);
    });
    channel.handleEvent('AfterMapMoveEvent', function(data) {
        console.log('Map moved! Current center is N: ' + data.centerY + ' E:' + data.centerX);
    });
    
    // functions
    channel.getMapPosition(function(data) {
        channel.log('Map position is', data);
    });
    channel.getMapBbox(function(data) {
        channel.log('Map bbox is', data);
    });
    channel.getZoomRange(function(data) {
        channel.log('Map zoomrange is', data);
    }); 
    // user location
    channel.postRequest('MyLocationPlugin.GetUserLocationRequest');
    channel.handleEvent('UserLocationEvent', function(data) {
        console.log('User is at N: ' + data.lat + ' E:' + data.lon);
    });
}
