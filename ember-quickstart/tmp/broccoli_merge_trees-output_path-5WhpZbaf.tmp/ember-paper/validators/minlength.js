define('ember-paper/validators/minlength', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.minlength = minlength;
  var isEmpty = Ember.isEmpty,
      isNone = Ember.isNone;
  function minlength(value, minlength) {
    return isEmpty(minlength) || isNone(value) || ('' + value).length >= parseInt(minlength, 10);
  }

  exports.default = {
    param: 'minlength',
    message: 'Must have at least %@ characters.',
    validate: minlength
  };
});