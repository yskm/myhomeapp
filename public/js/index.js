$(function() {
    var socket = io();

    var chart = c3.generate({
        data: {
            columns: [
                ['data', -100]
            ],
            type: 'gauge',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        gauge: {
            label: {
                format: function(value, ratio) {
                    if (value === -100) {
                        return 'loading..';
                    }
                    return value+'℃';
                },
                show: false
            },
            min: 0,
            max: 45
        },
        color: {
            pattern: ['#0030F6', '#60B044', '#F97600', '#FF0000'], // the three color levels for the percentage values.
            threshold: {
                values: [20, 28, 40]
            }
        },
        size: {
            width: 400,
            height: 180
        }
    });

    socket.on('temp', function(data) {
        chart.load({
            columns: [['data', data]]
        });

    });

    $('#ledon').on('click', function() {
        socket.emit('ledon');
    });

    $('#ledoff').on('click', function() {
        socket.emit('ledoff');
    });
});