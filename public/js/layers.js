
var layers = [];

function startApp(channel) {
    channel.log('Starting the app');
    channel.getAllLayers(function(data) {
        layers = data;
        channel.log('Layers on map', layers);
        var bln = false;
        channel.handleEvent('MapClickedEvent', function() {
            if(!bln) {
                toggleLayers(channel, layers);
            }
            else {
                fadeLayers(channel, layers);
            }
            bln = !bln;
        });
    });
}

function toggleLayers(channel, list) {
    list = list || layers;
    list.forEach(function(layer) {
        channel.log('Toggling layer', layer.name, 'Visible: ' + !layer.visible);
        channel.postRequest(
            'MapModulePlugin.MapLayerVisibilityRequest', [layer.id, !layer.visible]);
    });
    updateLayers(channel);
}

function fadeLayers(channel, list) {
    list = list || layers;
    list.forEach(function(layer) {
        if(!layer.visible) {
            return;
        }
        var opacity = layer.opacity;
        channel.log('Fading layer', layer.name, 'Opacity: ' + opacity + ' -> 0');
        var updater = setInterval(function() {
            opacity = opacity - (layer.opacity/50);
            if(opacity < 0) {
                opacity = layer.opacity;
                clearInterval(updater);
            }
            channel.postRequest('ChangeMapLayerOpacityRequest', [layer.id, opacity]);
            if(opacity === layer.opacity) {
                updateLayers(channel);
            }
        }, 25);
    });
}

function updateLayers(channel, fn) {
    channel.getAllLayers(function(data) {
        layers = data;
        if(typeof fn === 'function') {
            fn();
        }
    });
}
