var drawParams = ['foss4g', 'Polygon', {
    allowMultipleDrawing : 'single',
    showMeasureOnMap : true
}];

var featureCollection;

function startApp(channel) {
    channel.log('Starting the app');
    // start drawing on startup
    channel.postRequest('DrawTools.StartDrawingRequest', drawParams);

    channel.handleEvent('DrawingEvent', function(data) {
        if(!data.isFinished) {
            return;
        }
        console.log('DrawingEvent', data);

        if(!featureCollection) {
            channel.postRequest('DrawTools.StopDrawingRequest', drawParams);   
            channel.handleEvent('MapClickedEvent', function(data) {
                console.log('Map clicked at N: ' + data.lat + ' E:' + data.lon);
            });
        }
        featureCollection = data.geojson;
    });

}
