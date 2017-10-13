define('ember-quickstart/controllers/popular-restaurants', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({
		model: function model() {
			return ['Manolo', 'Cheers', 'Memo', 'Vucko'];
		}
	});
});