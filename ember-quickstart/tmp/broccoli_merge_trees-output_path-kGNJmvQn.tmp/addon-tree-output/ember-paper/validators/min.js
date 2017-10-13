define('ember-paper/validators/min', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.min = min;
  var isEmpty = Ember.isEmpty;
  function min(value, min) {
    return isEmpty(min) || isEmpty(value) || parseFloat(value) >= parseFloat(min);
  }

  exports.default = {
    param: 'min',
    message: 'Must be at least %@.',
    validate: min
  };
});