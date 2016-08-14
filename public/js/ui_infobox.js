function startApp(channel) {
    channel.log('Starting the app');
    channel.handleEvent('MapClickedEvent', function(data) {
        channel.postRequest('InfoBox.ShowInfoBoxRequest', getParams(data.lat, data.lon));
    });

    channel.handleEvent('InfoboxActionEvent', function(data) {
        // {id: "demoId", action: "Close", actionParams: {game: "over"}}
        if(data.action === 'Close') {
            channel.postRequest('InfoBox.HideInfoBoxRequest', [data.id]);
        }
        else {
            channel.postRequest('ShowProgressSpinnerRequest', [true]);
        }
        channel.log('Action in infobox', data);
    });

    channel.handleEvent('InfoBox.InfoBoxEvent', function(data) {
        // {id: "demoId", isOpen: false}
        channel.log('Infobox closed', data);
        channel.postRequest('ShowProgressSpinnerRequest', [false]);
    });
}

var blnColor = false;
function getParams(lat, lon) {
    var value =  [
        'demoId',
        'Hello FOSS4G',
        [getContent()],
        {
            'lon': lon,
            'lat': lat
        }];
        if(blnColor) {
            value.push({
                colourScheme: {
                    bgColour: '#00CCFF',
                    titleColour: '#FFFFFF',
                    headerColour: '#0066FF',
                    iconCls: 'icon-close-white',
                    buttonBgColour: '#00CCFF',
                    buttonLabelColour: '#FFFFFF',
                    linkColour: '#000000'
                },
                font: 'georgia'
            });
        }
        return value;
}

var contents = [
    { html : 'Hello world'},
    { html : 'Greetings from Bonn',
        actions : [{
            name: "Close",
            type: "link",
            action: {
                game: "over"
            }
        }]
    }, { 
        html : 'Want some loading animation?',
        actions : [{
            name: "Initialize spinning sequence",
            action: {
                status: "Going round and round"
            }
        }]
    }
];

var index = -1;
function getContent() {
    index++;
    if(index === contents.length) {
        index = 0;
        blnColor = !blnColor;
    }
    return contents[index];
}