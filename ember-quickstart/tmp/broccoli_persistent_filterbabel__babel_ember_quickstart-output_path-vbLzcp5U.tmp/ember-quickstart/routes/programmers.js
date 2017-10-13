define('ember-quickstart/routes/programmers', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Route.extend({
		model: function model() {
			return ['Mujo', 'Haso', 'Fata'];
		}
	});
});