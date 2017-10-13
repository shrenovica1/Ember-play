define('ember-paper/mixins/focusable-mixin', ['exports', 'ember-paper/mixins/events-mixin'], function (exports, _eventsMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Mixin = Ember.Mixin,
      computed = Ember.computed;
  exports.default = Mixin.create(_eventsMixin.default, {

    disabled: false,
    pressed: false,
    active: false,
    focused: false,
    hover: false,

    classNameBindings: ['focused:md-focused'],
    attributeBindings: ['tabindex', 'disabledAttr:disabled'],

    disabledAttr: computed('disabled', function () {
      return this.get('disabled') ? 'disabled' : null;
    }),

    // Alow element to be focusable by supplying a tabindex 0
    tabindex: computed('disabled', function () {
      return this.get('disabled') ? '-1' : '0';
    }),

    toggle: false,

    // Only render the "focused" state if the element gains focus due to
    // keyboard navigation.
    focusOnlyOnKey: false,

    /*
     * Listen to `focusIn` and `focusOut` events instead of `focus` and `blur`.
     * This way we don't need to explicitly bubble the events.
     * They bubble by default.
     */
    focusIn: function focusIn() {
      if (!this.get('disabled') && !this.get('focusOnlyOnKey') || !this.get('pressed')) {
        this.set('focused', true);
      }
    },
    focusOut: function focusOut() {
      this.set('focused', false);
    },
    mouseEnter: function mouseEnter(e) {
      this.set('hover', true);
      this.sendAction('onMouseEnter', e);
    },
    mouseLeave: function mouseLeave(e) {
      this.set('hover', false);
      this._super(e);
      this.sendAction('onMouseLeave', e);
    },
    down: function down() {
      this.set('pressed', true);
      if (this.toggle) {
        this.toggleProperty('active');
      } else {
        this.set('active', true);
      }
    },
    up: function up() {
      this.set('pressed', false);

      if (!this.toggle) {
        this.set('active', false);
      }
    }
  });
});