define('ember-paper/components/paper-select-menu-trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed;
  exports.default = _trigger.default.extend({
    tagName: 'md-select',
    attributeBindings: ['disabledAttr:disabled', 'required'],
    disabledAttr: computed('disabled', function () {
      return this.get('disabled') ? 'disabled' : null;
    })
  });
});