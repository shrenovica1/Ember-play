define('ember-quickstart/controllers/singup', ['exports'], function (exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        exports.default = Ember.Controller.extend({

                actions: {
                        create: function create() {
                                post.get('create');
                        }
                }
        });
});