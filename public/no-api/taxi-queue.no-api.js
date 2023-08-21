document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueCount: 0,
			taxiQueueCount: 0,

			// init() {
			// 	axios
			// 		.get('/api/passenger/queue')
			// 		.then(result => {
			// 			// an example API call
			// 			this.queueLength = result.data.queueCount
			// 		});
			// },

			joinQueue() {
				this.queueCount += 1;
			},

			leaveQueue() {
				if (this.queueCount > 0) {
					this.queueCount -= 1;
				}
			},

			queueLength() {
				return this.queueCount;
			},
			
			joinTaxiQueue() {
				this.taxiQueueCount += 1;
			},

			taxiQueueLength() {
				return this.taxiQueueCount;
			},

			taxiDepart() {
				if (this.queueCount >= 12) {
					this.taxiQueueCount -= 1;
					this.queueCount -= 12;
				}

			}
		}
	});

});

