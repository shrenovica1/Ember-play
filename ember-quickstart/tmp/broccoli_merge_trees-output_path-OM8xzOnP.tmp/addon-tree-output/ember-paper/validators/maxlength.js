define('ember-paper/validators/maxlength', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.maxlength = maxlength;
  var isEmpty = Ember.isEmpty,
      isNone = Ember.isNone;
  function maxlength(value, maxlength) {
    return isEmpty(maxlength) || isNone(value) || ('' + value).length <= parseInt(maxlength, 10);
  }

  exports.default = {
    param: 'maxlength',
    message: 'Must not exceed %@ characters.',
    validate: maxlength
  };
});