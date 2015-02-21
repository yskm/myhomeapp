var express = require('express'),
    app = express();

var serialPort = require('serialport').SerialPort,
    sp = new serialPort(process.env.ARDUINO_PORT, {
        baudrate: 9600
    });

var buffer = '';

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port
    
    console.log('listening at http://%s:%s', host, port);
});

app.get('/led/on', function(req, res) {
    sp.write("on");
    res.send('LED Turned on!');
});

app.get('/led/off', function(req, res) {
    sp.write("off");
    res.send('LED Turned off!');
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
    }
    buffer = '';
});