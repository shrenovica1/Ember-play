define('ember-paper/mixins/proxiable-mixin', ['exports', 'ember-composability-tools'], function (exports, _emberComposabilityTools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin,
      run = Ember.run;
  exports.default = Mixin.create(_emberComposabilityTools.ChildMixin, {

    classNameBindings: ['secondary:md-secondary'],

    shouldRegister: false,

    registerWithParent: function registerWithParent() {
      run.next(this, this._super);
    },
    mouseDown: function mouseDown() {
      this._super.apply(this, arguments);
      var parentComponent = this.get('parentComponent');
      if (parentComponent) {
        parentComponent.set('mouseActive', true);
        run.later(function () {
          if (parentComponent.isDestroyed) {
            return;
          }
          parentComponent.set('mouseActive', false);
        }, 100);
      }
    },
    focusIn: function focusIn() {
      this._super.apply(this, arguments);
      var parentComponent = this.get('parentComponent');
      if (parentComponent && !parentComponent.get('mouseActive')) {
        parentComponent.set('focused', true);
      }
    },
    focusOut: function focusOut() {
      this._super.apply(this, arguments);
      var parentComponent = this.get('parentComponent');
      if (parentComponent) {
        parentComponent.set('focused', false);
      }
    }
  });
});