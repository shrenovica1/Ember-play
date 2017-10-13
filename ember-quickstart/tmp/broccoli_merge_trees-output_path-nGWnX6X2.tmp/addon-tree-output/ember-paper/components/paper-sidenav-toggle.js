define('ember-paper/components/paper-sidenav-toggle', ['exports', 'ember-paper/templates/components/paper-sidenav-toggle'], function (exports, _paperSidenavToggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      inject = Ember.inject;
  exports.default = Component.extend({
    layout: _paperSidenavToggle.default,
    tagName: '',

    name: 'default',

    paperSidenav: inject.service(),

    toggle: function toggle() {
      this.get('paperSidenav').toggle(this.get('name'));
    }
  });
});