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
        this.subscription = messages
            .flatMap(function(msg) {
                this.filter(msg => msg.edv && msg.edv > 20);
                this.subscribe(msg => broker.publish(msg));
            }); //.subscribe(msg => broker.publish(msg));
            // Chaining .subscribe above to the end of the flatMap call results in undefined error in gateway
        return true;
    },

    receive: msg => messages.onNext(msg),
    destroy: function() { 
        //subscription.unsubscribe
        console.log("destroyed");
    }   
};