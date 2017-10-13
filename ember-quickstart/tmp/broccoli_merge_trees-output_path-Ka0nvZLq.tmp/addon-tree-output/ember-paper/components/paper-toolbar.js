define('ember-paper/components/paper-toolbar', ['exports', 'ember-paper/templates/components/paper-toolbar', 'ember-paper/mixins/color-mixin'], function (exports, _paperToolbar, _colorMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component;
  exports.default = Component.extend(_colorMixin.default, {
    layout: _paperToolbar.default,
    tagName: 'md-toolbar',
    classNames: ['md-default-theme'],
    tall: false,
    classNameBindings: ['tall:md-tall']
  });
});