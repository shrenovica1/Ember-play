define("ember-quickstart/controllers/singup", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({
		//user servis inject
		actions: {
			create: function create() {
				alert("radi");
			}
		}
	});
});