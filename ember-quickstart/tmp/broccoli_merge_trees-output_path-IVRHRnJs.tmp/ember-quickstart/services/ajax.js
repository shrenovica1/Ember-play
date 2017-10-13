define('ember-quickstart/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ajax.default.extend({
    //namespace: '/api/v1',
    host: 'http://localhost:4200'
  });
});