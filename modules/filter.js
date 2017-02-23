'use strict';

let Rx = require('rxjs/Rx')
let messages = new Rx.Observable();
let subscription;

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;
        subscription = this.messages
            .filter(msg => msg.edv && msg.edv > 20) //omit msgs with a low edv
            .subscribe(msg => broker.publish(msg));
        return true;
    },

    receive: msg => messages.onNext(msg),
    destroy: subscription.unsubscribe
};