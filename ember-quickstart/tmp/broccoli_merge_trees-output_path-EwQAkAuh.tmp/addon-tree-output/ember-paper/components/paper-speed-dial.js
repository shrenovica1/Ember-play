define('ember-paper/components/paper-speed-dial', ['exports', 'ember-paper/templates/components/paper-speed-dial'], function (exports, _paperSpeedDial) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      run = Ember.run;
  exports.default = Component.extend({
    layout: _paperSpeedDial.default,
    tagName: 'md-fab-speed-dial',

    classNameBindings: ['directionClass', 'open:md-is-open', 'animationClass', 'shouldHideActions:md-animations-waiting', 'hoverFull:md-hover-full'],

    open: false,

    animation: 'fling',
    animationClass: computed('animation', function () {
      return 'md-' + this.get('animation');
    }),

    direction: 'down',
    directionClass: computed('direction', function () {
      return 'md-' + this.get('direction');
    }),

    shouldHideActions: computed('animation', 'elementDidRender', function () {
      return this.get('animation') === 'fling' && !this.get('elementDidRender');
    }),

    didRender: function didRender() {
      var _this = this;

      this._super.apply(this, arguments);
      run.next(function () {
        if (!_this.isDestroyed && !_this.isDestroying) {
          _this.set('elementDidRender', true);
        }
      });
    },
    mouseEnter: function mouseEnter() {
      this.sendAction('onMouseEnter');
    },
    mouseLeave: function mouseLeave() {
      this.sendAction('onMouseLeave');
    },
    toggle: function toggle() {
      this.changeOpenValue(!this.get('open'));
    },
    close: function close() {
      this.changeOpenValue(false);
    },
    changeOpenValue: function changeOpenValue(value) {
      // support non DDAU scenario
      if (this.get('onToggle')) {
        this.sendAction('onToggle', value);
      } else {
        this.set('open', value);
      }
    }
  });
});