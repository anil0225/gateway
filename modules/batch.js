'use strict';

let Rx = require('rxjs/Rx');

class BatchModule {
    create(broker, configuration) {
        this.broker = broker;
        this.configuration = configuration;
        this.messages = new Rx.Subject();
        this.subscription = this.messages

            //magic happens here

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

module.exports = new BatchModule();