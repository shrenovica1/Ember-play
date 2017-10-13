define('ember-quickstart/components/popular-restaurants', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({
		model: function model() {
			return ['Wine and dine', 'Rest', 'Restoran', 'Jos jedan'];
		}
	});
});