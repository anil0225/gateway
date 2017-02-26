'use strict';

let restify = require('restify');

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;

        //TODO: hard code mac address for now
        this.configuration = Object.assign({},
            { macAddress: 'AA:BB:CC:DD:EE:FF' },
            configuration
        );

        let server = restify.createServer();
        server.use(restify.bodyParser());
        server.post('/api/messages', (req, res, next) => {
            this.broker.publish({
                properties: {
                    'source': 'api',
                    'macAddress': this.configuration.macAddress
                },
                content: new Buffer(req.body, 'utf-8')
            });
        });
        server.listen(3000);

        return true;
    },

    receive: function (message) { },

    destroy: function () {
        console.log('api.destroy');
    }
};