$(function() {
    var socket = io();

    var chart = c3.generate({
        data: {
            columns: [
                ['data', -100]
            ],
            type: 'gauge'
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
            pattern: ['#0030F6', '#60B044', '#F97600', '#FF0000'],
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

    $.fn.bootstrapSwitch.defaults.state = false;
    $("input[name='my-checkbox']").bootstrapSwitch().on('switchChange.bootstrapSwitch', function(e, state) {
        console.log(state);
        if (state === true) {
            socket.emit('ledon');
        } else if (state === false) {
            socket.emit('ledoff');
        }
    });

    $('#ledon').on('click', function() {
        socket.emit('ledon');
    });

    $('#ledoff').on('click', function() {
        socket.emit('ledoff');
    });
});