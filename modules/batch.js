'use strict';

let Rx = require('rxjs/Rx')
let messages = new Rx.Observable();

module.exports = {
    broker: null,
    configuration: null,

    create: function (broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;
        if(messages)
            //proves that subscribe is a function
            console.log(messages.subscribe);

            //doesn't work and I don't know why
            messages.subscribe(msg => broker.publish(msg))
        return true;
    },

    receive: msg => messages.onNext(msg),
    destroy: () => {}
};