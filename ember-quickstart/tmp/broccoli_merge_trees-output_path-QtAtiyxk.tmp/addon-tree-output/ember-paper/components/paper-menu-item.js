define('ember-paper/components/paper-menu-item', ['exports', 'ember-paper/templates/components/paper-menu-item', 'ember-paper/mixins/child-mixin'], function (exports, _paperMenuItem, _childMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend(_childMixin.default, {
    layout: _paperMenuItem.default,
    tagName: 'md-menu-item',
    disabled: false,

    actions: {
      handleClick: function handleClick(event) {
        this.get('dropdown.actions').close();
        this.sendAction('onClick', event);
      }
    },
    mouseEnter: function mouseEnter() {
      if (!this.get('disabled')) {
        this.$('button').focus();
      }
    }
  });
});