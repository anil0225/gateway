'use strict';

let restify = require('restify');

api.post('/api/message', (req, res, next) => {
    this.broker.publish({
        properties: {
            'source': 'api'
        },
        content: new Uint8Array([
            Math.random() * 50,
            Math.random() * 50
        ])
    });
});

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;

        return true;
    },

    receive: function (message) {
        console.log(`printer.receive - ${message.content.join(', ')}`);
    },

    destroy: function () {
        console.log('printer.destroy');
    }
};