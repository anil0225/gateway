'use strict';

let Rx = require('rxjs/Rx')
let messages = new Rx.Observable();

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;

        if (messages) {
            messages.flatMap(function (msg) {
                this.subscribe(msg => broker.publish(msg));
            });
        }
        return true;
    },

    receive: msg => messages.onNext(msg),
    destroy: function () {
        subscription.unsubscribe;
    }
};