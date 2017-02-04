'use strict';

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;

        return true;
    },

    start: function () {
        setInterval(() => {
            this.broker.publish({
                properties: {
                    'source': 'sensor'
                },
                content: new Uint8Array([
                    "foo"
                ])
            });
        }, 500);
    },

    receive: function(message) {
    },

    destroy: function() {
        console.log('sensor.destroy');
    }
};
