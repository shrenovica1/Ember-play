define('ember-quickstart/components/popular-locations', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({
		model: function model() {
			return ['Marie Curie', 'Leksa', 'Memo', 'Mimaca'];
		}
	});
});