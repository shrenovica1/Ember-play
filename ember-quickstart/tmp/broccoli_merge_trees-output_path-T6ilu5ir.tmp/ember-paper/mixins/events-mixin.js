define('ember-paper/mixins/events-mixin', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin;
  exports.default = Mixin.create({
    touchStart: function touchStart(e) {
      return this.down(e);
    },
    mouseDown: function mouseDown(e) {
      this.down(e);
    },
    touchEnd: function touchEnd(e) {
      return this.up(e);
    },
    mouseUp: function mouseUp(e) {
      return this.up(e);
    },
    touchCancel: function touchCancel(e) {
      return this.up(e);
    },
    mouseLeave: function mouseLeave(e) {
      return this.up(e);
    },
    up: function up() {},
    down: function down() {},
    contextMenu: function contextMenu() {},


    /*
     * Move events
     */

    mouseMove: function mouseMove(e) {
      return this.move(e);
    },
    touchMove: function touchMove(e) {
      return this.move(e);
    },
    pointerMove: function pointerMove(e) {
      return this.move(e);
    },
    move: function move() {}
  });
});