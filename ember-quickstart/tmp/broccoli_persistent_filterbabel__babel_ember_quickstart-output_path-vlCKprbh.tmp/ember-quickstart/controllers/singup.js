define('ember-quickstart/controllers/singup', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({
		action: {
			addTask: function addTask() {
				var firstName = this.get('create');
				alert(firstName);
			}
		}
	});
});