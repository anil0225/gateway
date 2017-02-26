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

        // Sample aggregation using buffer
        this.subscription = messages
            .flatMap(function (msg) {
                this.buffer(function () { 
                    return Rx.Observable.timer(125); 
                }).take(3);
                this.subscribe(msg => broker.publish(msg));
            });
        return true;
    },
    receive: function () {
        messages.flatMap(function (msg) {
            msg => messages.onNext(msg);
        })
    },
    destroy: function () {
        this.subscription.unsubscribe;
    }
};