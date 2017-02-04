'use strict';

let restify = require('restify');

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;

        let server = restify.createServer();
        server.use(restify.bodyParser());
        server.post('/api/messages', (req, res, next) => {
            this.broker.publish({
                properties: { 'source': 'api' },
                content: req.body
            });
        });
        server.listen(80);

        return true;
    },

    receive: function (message) {},

    destroy: function () {
        console.log('api.destroy');
    }
};