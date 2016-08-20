function startApp(channel) {
    channel.log('Starting the app');
    // start drawing on startup
    var drawParams = ['foss4g', 'Polygon', {
        allowMultipleDrawing : 'single',
        showMeasureOnMap : true
    }];
    channel.postRequest('DrawTools.StartDrawingRequest', drawParams);

    // handle event for finished drawing
    var blnFinished = false;
    channel.handleEvent('DrawingEvent', function(data) {
        if(!data.isFinished || blnFinished) {
            return;
        }
        blnFinished = true;
        console.log('DrawingEvent', data);
        channel.postRequest('DrawTools.StopDrawingRequest', drawParams);
        // add the user generated feature to map
        addFeature(channel, data.geojson);
    });

    channel.handleEvent('FeatureEvent', function(e) {
        console.log('FeatureEvent', e);
        // when feature is clicked:
        // add the other and zoom to show both
        if(e.operation === 'click') {
            addFeature(channel, geojson, featureStyle);
        }
    });
}

function addFeature(channel, geojsonObject, style) {
    var params = [geojsonObject, {
            centerTo: true,
            cursor: 'pointer',
            featureStyle : style
        }];

    channel.postRequest(
        'MapModulePlugin.AddFeaturesToMapRequest',
        params
    );
}
// alternative (not-very-good-looking style)
var featureStyle = {
    fill: {
        color: '#ffff00'
    },
    stroke : {
        color: '#ff0000',
        width: 5
    }
};
// Some other feature as geojson
var geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                373521,
                6676065
              ],
              [
                373767,
                6676077
              ],
              [
                373739,
                6675929
              ],
              [
                373501,
                6675941
              ],
              [
                373521,
                6676065
              ]
            ]
          ]
        },
        "properties" : {
            "msg" : "Hello Bonn"
        }
      }
    ]
  };