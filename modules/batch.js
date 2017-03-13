'use strict'

let Rx = require('rxjs/Rx')

class BatchModule {
    create(broker, configuration) {
        this.broker = broker
        this.configuration = configuration
        this.messages = new Rx.Subject()
	    .bufferTime(5000)
        this.subscription = this.messages
            .subscribe(msgs => {
	       	console.log('*** Buffered:', msgs)
 		
		// msgs is missing property: properties and content 
		this.broker.publish(msgs)
            })
        return true
    }

    receive(msg) {
	msg = JSON.parse(new Buffer(msg.content).toString('utf-8')) 
        this.subscription = this.messages.next(msg)
	console.log('BATCH RECIEVED')
    }

    destroy() {
        this.subscription.unsubscribe()
    }
}

module.exports = new BatchModule()
