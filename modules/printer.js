'use strict';

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;
        return true;
    },

    receive: function (message) {
        console.log(`Received ${new Buffer(message.content).toString('utf-8')}`);
    },

    destroy: function () { }
};