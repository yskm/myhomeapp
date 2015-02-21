$(function() {
    var socket = io();

    socket.on('temp', function(data) {
        $('#temp').text(data+'℃');
    });
});