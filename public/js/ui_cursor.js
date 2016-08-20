/**
 * startApp-function with examples on ui usage:
 * - cycle through some cursor styles on map clicks
 * - open coordinate tool once cursors done
 */
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