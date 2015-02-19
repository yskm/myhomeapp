var express = require('express'),
    app = express();

var serialPort = require('serialport').SerialPort,
    sp = new serialPort(process.env.ARDUINO_PORT, {
        baudrate: 9600
    });

app.get('/led/on', function(req, res) {
    sp.write("on");
    res.send('LED Turned on!');
});

app.get('/led/off', function(req, res) {
    sp.write("off");
    res.send('LED Turned off!');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port
    
    console.log('listening at http://%s:%s', host, port);
});


sp.on("open", function () {
    sp.on('data', function(data) {
        console.log('data received: ' + data);
    });
});