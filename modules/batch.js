'use strict'

let Rx = require('rxjs/Rx')

class BatchModule {
    create(broker, configuration) {
        this.broker = broker
        this.configuration = configuration
        this.messages = new Rx.Subject()
        this.subscription = this.messages
	    // buffer for 5 seconds, start next buffer in 1 second
	    .bufferTime(5000, 5000)
            .subscribe(msg => {     
		this.broker.publish(msg)
            })
        return true
    }

    receive(msg) {
        this.subscription = this.messages.next(msg)
    }

    destroy() {
        this.subscription.unsubscribe()
    }
}

module.exports = new BatchModule()
