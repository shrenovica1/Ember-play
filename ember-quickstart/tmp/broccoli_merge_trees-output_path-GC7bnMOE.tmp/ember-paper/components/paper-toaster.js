define('ember-paper/components/paper-toaster', ['exports', 'ember-paper/templates/components/paper-toaster'], function (exports, _paperToaster) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed,
      inject = Ember.inject,
      Component = Ember.Component;
  exports.default = Component.extend({
    layout: _paperToaster.default,
    tagName: '',
    paperToaster: inject.service(),
    activeToast: computed.reads('paperToaster.activeToast'),

    onClose: function onClose(toast) {
      this.get('paperToaster').cancelToast(toast);
    }
  });
});