'use strict';

module.exports = {
    broker: null,
    configuration: null,
    intervalID: -1,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = Object.assign({}, {
            macAddress: 'AA:BB:CC:DD:EE:FF'
        }, configuration);

        return true;
    },

    start: function () {
        this.intervalID = setInterval(() => {
            this.broker.publish({
                properties: {
                    'source': 'sensor',
                    'macAddress': this.configuration.macAddress
                },
                content: new Uint8Array([
                    Math.random() * 50,
                    Math.random() * 50
                ])
            });
        }, 500);
    },

    receive: function(message) {
    },

    destroy: function() {
        console.log('sensor.destroy');
        if(this.intervalID !== -1) {
            clearInterval(this.intervalID);
        }
    }
};
