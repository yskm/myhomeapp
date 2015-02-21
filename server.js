var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var serialPort = require('serialport').SerialPort,
    sp = new serialPort(process.env.ARDUINO_PORT, {
        baudrate: 9600
    });

var buffer = '';

http.listen(3000, function() {
    console.log('listening on *:3000');
});

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('socket.io connected');

    socket.on('ledon', function() {
        sp.write("ledon");
    });

    socket.on('ledoff', function() {
        sp.write("ledoff");
    });
});

sp.on('data', function(input) {
    buffer += Buffer(input);
    try {
        inputObj = JSON.parse(buffer);
    } catch (e) {
        return;
    }

    if (inputObj.hasOwnProperty('temp')) {
        console.log('temp received: ' + inputObj.temp);
        io.emit('temp', inputObj.temp);
    }
    buffer = '';
});