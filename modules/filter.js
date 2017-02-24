'use strict';

let Rx = require('rxjs/Rx')
let messages = new Rx.Observable();

module.exports = {
    broker: null,
    configuration: null,
    messages: new Rx.Observable(),

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;
        // this.subscription = messages
        //     .filter(msg => msg.edv && msg.edv > 20) //omit msgs with a low edv
        //     .subscribe(msg => broker.publish(msg));
        return true;
    },

    receive: msg => messages.onNext(msg),
    destroy: subscription.unsubscribe
};