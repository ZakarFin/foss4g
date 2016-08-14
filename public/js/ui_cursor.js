function startApp(channel) {
    channel.log('Starting the app');
    var styles = ['crosshair', 'move', 'progress', 'default'];
    var index = -1;
    channel.handleEvent('MapClickedEvent', function(data) {
        index++;
        if(index === styles.length) {
            index = 0;
            channel.sendUIEvent(['coordinatetool'], function() {});
        }
        channel.setCursorStyle([styles[index]], function() {});
    });
}