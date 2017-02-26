'use strict';

module.exports = {
    broker: null,
    configuration: null,
    intervalID: -1,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = Object.assign({},
            { macAddress: 'AA:BB:CC:DD:EE:FF' },
            configuration
        );

        return true;
    },
    start: function () {
        this.intervalID = setInterval(() => {
            let content = {
                "eda": Math.floor(Math.random() * 40) + 10, //random 10-50
                "bvp": Math.floor(Math.random() * 20) + 50 //random 50-70
            };
            this.broker.publish({
                properties: {
                    'source': 'sensor',
                    'macAddress': this.configuration.macAddress
                },
                content: new Buffer(JSON.stringify(content), 'utf-8')
            });
        }, 500);
    },
    receive: function (message) {},
    destroy: function () {
        console.log('sensor.destroy');
        if (this.intervalID !== -1) {
            clearInterval(this.intervalID);
        }
    }
};
