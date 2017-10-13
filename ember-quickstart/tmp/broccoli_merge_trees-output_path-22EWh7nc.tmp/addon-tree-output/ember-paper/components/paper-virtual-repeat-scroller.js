define('ember-paper/components/paper-virtual-repeat-scroller', ['exports', 'ember-paper/templates/components/paper-virtual-repeat-scroller'], function (exports, _paperVirtualRepeatScroller) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend({
    layout: _paperVirtualRepeatScroller.default,
    classNames: ['md-virtual-repeat-scroller'],

    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      this.$().scroll(function (e) {
        _this.get('onScroll')(e);
      });
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this.$().off('scroll');
    }
  });
});