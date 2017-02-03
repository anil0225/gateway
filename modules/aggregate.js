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
        //do something
        console.log(`printer.receive - ${message.content.join(', ')}`);

        //broker.publish();
    },

    destroy: function () {
        console.log('printer.destroy');
    }
};