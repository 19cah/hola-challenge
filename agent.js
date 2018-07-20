'use strict';

/*	Hola Haggling 2018 Solution
 *	agent.js
 *
 *	Author: Carlos Abraham
 *	Email: abraham@19cah.com
 *	Repo: github.com/19cah/hola-challenge
 */

module.exports = class Agent {
	constructor(me, counts, values, maxRounds, log) {
		this.me = me;
		this.counts = counts;
		this.values = values;
		this.rounds = maxRounds;
		this.log = log;
		this.total = 0;

		for (let i = 0; i < counts.length; i++) {
			this.total += counts[i] * values[i];
		}
	}

	offer(offer) {
		this.log(`${this.rounds} rounds left`);

		if (offer) {
			let sum = 0;
			for (let i = 0; i < offer.length; i++) {
				sum += this.values[i] * offer[i];
			}

			// Decreasing by 1 the total value for each round
			switch (this.rounds) {
				case 1:
					if (sum >= this.total - 4) {
						return;
					}
					break;
				case 2:
					if (sum >= this.total - 3) {
						return;
					}
					break;
				case 3:
					if (sum >= this.total - 2) {
						return;
					}
					break;
				case 4:
					if (sum >= this.total - 1) {
						return;
					}
					break;
				case 5:
					if (sum === this.total) {
						return;
					}
					break;
				// Receive at least half of the total value
				default:
					if (sum >= this.total / 2) {
						return;
					}
			}
		}
		offer = this.counts.slice();

		for (let i = 0; i < offer.length; i++) {
			if (!this.values[i]) {
				offer[i] = 0;
			}
		}

		this.rounds--;
		return offer;
	}
};
