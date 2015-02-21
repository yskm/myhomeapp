$(function() {
    var socket = io();

    socket.on('temp', function(data) {
        $('#temp').text(data+'℃');
    });

    $('#ledon').on('click', function() {
        socket.emit('ledon');
    });

    $('#ledoff').on('click', function() {
        socket.emit('ledoff');
    });
});