'use strict'

let Rx = require('rxjs/Rx')

class BatchModule {
    create(broker, configuration) {
        this.broker = broker
        this.configuration = configuration
        this.messages = new Rx.Subject()
        this.subscription = this.messages
	    .bufferTime(5000)
            .subscribe(msgs => {
		let buff_properties
		let buff_content = []

		// if buffer has at least one data set, set properties
		// assuming all data in buffer is from same device
		if (msgs.length > 0) {
			buff_properties = msgs[0].properties
		}

		// createa a new array of the data
		msgs.forEach(function(msg) {
			buff_content.push(msg.content)
		})

	       	console.log('*** Buffered:', msgs)

		let payload = { "properties":buff_properties, "content":buff_content }
		console.log('>>> PAYLOAD <<<', payload)

		// content must be UTF8 encoded..
		this.broker.publish(payload)
            })
        return true
    }

    receive(msg) { 
	msg.content = JSON.parse(new Buffer(msg.content).toString('utf-8'))

	// passing in msg with string properties: 'properties' and 'content'
	this.subscription = this.messages.next(msg)
	console.log('BATCH RECEIVED')
    }

    destroy() {
        this.subscription.unsubscribe()
    }
}

module.exports = new BatchModule()
