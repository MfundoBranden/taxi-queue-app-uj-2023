document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueLength: 0,
			taxiQueueLength: 0,
			init() {
				this.fetchQueueLength();
				this.fetchTaxiQueueLength();
			},
			async fetchQueueLength() {
				try {
					const response = await
						axios
							.get('/api/passenger/queue');
					this.queueLength = response.data.queueCount;
				} catch (error) {
					console.error('Error fetching queue length:', error);
				}
			},
			async fetchTaxiQueueLength() {
				try {
					const response = await
						axios
							.get('/api/taxi/queue');
					this.taxiQueueLength = response.data.queueCount;
				} catch (error) {
					console.error('Error fetching taxi queue length:', error);
				}
			}
		};
	});

	function TaxiQueue() {

		function joinQueue() {
			this.queueCount += 1;
		}

		function leaveQueue() {
			if (this.queueCount > 0) {
				this.queueCount -= 1;
			}
		}

		function joinTaxiQueue() {
			this.taxiQueueCount += 1;
		}

		function queueLength() {
			return this.queueCount;
		}

		function taxiQueueLength() {
			return this.taxiQueueCount;
		}

		function taxiDepart() {
			if (this.queueCount >= 12) {
				this.taxiQueueCount -= 1;
				this.queueCount -= 12;
			}
		}

		return {
			joinQueue,
			leaveQueue,
			joinTaxiQueue,
			queueLength,
			taxiQueueLength,
			taxiDepart
		};
	}
});