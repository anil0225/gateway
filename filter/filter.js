'use strict';

let Rx = require('rxjs/Rx');

class FilterModule {
    create(broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;
        this.messages = new Rx.Subject();
        this.subscription = this.messages
            .filter(msg => {
                // msg = JSON.parse(new Buffer(msg.content).toString('utf-8'));
                
                // Not sure how I would access eda_min and eda_max in the form of a node_module? class variable?
                // return msg.eda >= this.configuration.eda_min && msg.eda <= this.configuration.eda_max;
            })
            .subscribe(msg => {
                this.broker.publish(msg);
            })
        return true;
    }

    receive(msg) {
        this.subscription = this.messages.next(msg);
    }

    destroy() {
        this.subscription.unsubscribe();
    }
}

module.exports = new FilterModule();