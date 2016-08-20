/**
 * startApp-function with examples on markers usage:
 * - cycle through built-in marker shapes on clicks
 * - handle marker click by updating the marker with custom svg
 * - reset after 10 clicks
 */
function startApp(channel) {
    channel.log('Starting the app');
    // on map click: add marker with different shape
    channel.handleEvent('MapClickedEvent', function(data) {
        if(count > 6) {
            // all predefined shapes used
            return;
        }
        console.log('Adding marker - clicked at N: ' + data.lat + ' E:' + data.lon);
        addMarker(channel, data.lat, data.lon);
    });
    // on marker click: after 7 markers, log clicks
    channel.handleEvent('MarkerClickEvent', function(data) {
        if(count < 7) {
            return;
        }
        console.log('Marker clicked! Data: ', data);
        count++;
        // if clicked on 007 -> update marker shape with svg
        if(data.id === 'Marker6') {
            addMarker(channel, latest.y, latest.x, svg, data.id);
        }
        // after 10 ops, reset
        if(count > 10) {
            reset(channel);
        }
    });
    channel.handleEvent('AfterAddMarkerEvent', function(data) {
        console.log('Marker added! Data: ', data);
    });
}

var latest;
var count = 0;
var messages = ['', 'Hello', 'from Bonn', 'and Foss4g', '', '', 'I am marker 006'];

function addMarker(channel, lat, lon, icon, id) {
    var data = {
        x: lon,
        y: lat,
        msg : messages[count],
        shape: icon || count,
        size: count + 5
    };
    var markerId = id || 'Marker' + count;
    channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, markerId]);
    latest = data;
    count++;
}

function reset(channel) {
    count = 0;
    channel.postRequest('MapModulePlugin.RemoveMarkersRequest', []);
}

var svg = '<svg width="32" height="32"><g fill="#9955ff" transform="matrix(0.06487924,0,0,0.06487924,0,1.73024e-6)"><g><path d="M 246.613,0 C 110.413,0 0,110.412 0,246.613 c 0,136.201 110.413,246.611 246.613,246.611 136.2,0 246.611,-110.412 246.611,-246.611 C 493.224,110.414 382.812,0 246.613,0 Z m 96.625,128.733 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m -196.743,0 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m 100.738,284.184 c -74.374,0 -138.225,-45.025 -165.805,-109.302 l 48.725,0 c 24.021,39.5 67.469,65.885 117.079,65.885 49.61,0 93.058,-26.384 117.079,-65.885 l 48.725,0 C 385.46,367.892 321.608,412.917 247.233,412.917 Z" /></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></g><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /></svg>';