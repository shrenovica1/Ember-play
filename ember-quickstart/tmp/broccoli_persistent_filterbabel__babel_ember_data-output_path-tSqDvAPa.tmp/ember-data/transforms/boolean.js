define('ember-data/transforms/boolean', ['exports', 'ember-data/transforms/transform'], function (exports, _transform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var isNone = Ember.isNone;
  exports.default = _transform.default.extend({
    deserialize: function deserialize(serialized, options) {
      var type = typeof serialized;

      if (isNone(serialized) && options.allowNull === true) {
        return null;
      }

      if (type === "boolean") {
        return serialized;
      } else if (type === "string") {
        return serialized.match(/^true$|^t$|^1$/i) !== null;
      } else if (type === "number") {
        return serialized === 1;
      } else {
        return false;
      }
    },
    serialize: function serialize(deserialized, options) {
      if (isNone(deserialized) && options.allowNull === true) {
        return null;
      }

      return Boolean(deserialized);
    }
  });
});