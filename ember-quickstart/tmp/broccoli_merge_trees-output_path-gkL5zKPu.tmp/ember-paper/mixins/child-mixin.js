define('ember-paper/mixins/child-mixin', ['exports', 'ember-paper/mixins/parent-mixin'], function (exports, _parentMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin,
      computed = Ember.computed;
  exports.default = Mixin.create({

    // override to look for a specific parent class
    parentClass: _parentMixin.default,

    // this will typically be overriden when yielding a contextual component
    parentComponent: computed(function () {
      return this.nearestOfType(this.get('parentClass'));
    }),

    init: function init() {
      this._super.apply(this, arguments);
      if (this.get('parentComponent')) {
        this.get('parentComponent').register(this);
      }
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (this.get('parentComponent')) {
        this.get('parentComponent').unregister(this);
      }
    }
  });
});