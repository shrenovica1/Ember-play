define('ember-paper/components/paper-slider', ['exports', 'ember-paper/templates/components/paper-slider', 'ember-paper/mixins/focusable-mixin', 'ember-paper/mixins/color-mixin', 'ember-paper/utils/clamp'], function (exports, _paperSlider, _focusableMixin, _colorMixin, _clamp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      inject = Ember.inject,
      run = Ember.run,
      htmlSafe = Ember.String.htmlSafe;
  exports.default = Component.extend(_focusableMixin.default, _colorMixin.default, {
    layout: _paperSlider.default,
    tagName: 'md-slider',

    attributeBindings: ['min', 'max', 'step', 'discrete:md-discrete', 'tabindex'],

    classNames: ['md-default-theme'],
    classNameBindings: ['isMinimum:md-min', 'active:md-active', 'dragging:md-dragging'],

    constants: inject.service(),

    min: 0,
    max: 100,
    step: 1,
    tabindex: 0,

    activeTrackStyle: computed('percent', function () {
      var percent = this.get('percent') || 0;
      return htmlSafe('width: ' + percent * 100 + '%');
    }),

    thumbContainerStyle: computed('percent', function () {
      var percent = this.get('percent') || 0;
      return htmlSafe('left: ' + percent * 100 + '%');
    }),

    isMinimum: computed('percent', 'min', function () {
      return this.get('percent') === this.get('min');
    }),

    percent: computed('value', 'min', 'max', function () {
      var min = parseFloat(this.get('min'), 10);
      var max = parseFloat(this.get('max'), 10);

      return (0, _clamp.default)((this.get('value') - min) / (max - min), 0, 1);
    }),

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      if (!this.get('disabled')) {
        this._setupHammer();
      }
    },
    didUpdateAttrs: function didUpdateAttrs() {
      this._super.apply(this, arguments);

      if (!this.get('disabled') && !this._hammer) {
        // if it is enabled and we didn't init hammer yet
        this._setupHammer();
      } else if (this.get('disabled') && this._hammer) {
        // if it is disabled and we did init hammer already
        this._teardownHammer();
      }
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (this._hammer) {
        this._teardownHammer();
      }
    },
    _setupHammer: function _setupHammer() {
      // Enable dragging the slider
      var containerManager = new Hammer.Manager(this.element);
      var pan = new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 10 });
      containerManager.add(pan);
      var tap = new Hammer.Tap();
      containerManager.add(tap);

      containerManager.on('panstart', run.bind(this, this.dragStart)).on('panmove', run.bind(this, this.drag)).on('panend', run.bind(this, this.dragEnd)).on('tap', run.bind(this, this.tap));

      this._hammer = containerManager;
    },
    _teardownHammer: function _teardownHammer() {
      this._hammer.destroy();
      delete this._hammer;
    },
    positionToPercent: function positionToPercent(x) {
      var _sliderDimensions = this.sliderDimensions(),
          left = _sliderDimensions.left,
          width = _sliderDimensions.width;

      return Math.max(0, Math.min(1, (x - left) / width));
    },
    percentToValue: function percentToValue(x) {
      var min = parseFloat(this.get('min'), 10);
      var max = parseFloat(this.get('max'), 10);
      return min + x * (max - min);
    },
    minMaxValidator: function minMaxValidator(value) {
      var min = parseFloat(this.get('min'), 10);
      var max = parseFloat(this.get('max'), 10);
      return Math.max(min, Math.min(max, value));
    },
    stepValidator: function stepValidator(value) {
      var step = parseFloat(this.get('step'), 10);
      return Math.round(value / step) * step;
    },


    active: false,
    dragging: false,
    enabled: computed.not('disabled'),

    sliderDimensions: function sliderDimensions() {
      return this.element.querySelector('.md-track-container').getBoundingClientRect();
    },
    setValueFromEvent: function setValueFromEvent(value) {
      var exactVal = this.percentToValue(this.positionToPercent(value));
      var closestVal = this.minMaxValidator(this.stepValidator(exactVal));

      this.sendAction('onChange', closestVal);
    },
    tap: function tap(event) {
      if (this.get('disabled')) {
        return;
      }

      this.setValueFromEvent(event.center.x);
    },
    dragStart: function dragStart(event) {
      if (this.get('disabled')) {
        return;
      }

      this.set('active', true);
      this.set('dragging', true);
      this.element.focus();

      this.setValueFromEvent(event.center.x);
    },
    drag: function drag(event) {
      if (this.get('disabled') || !this.get('dragging')) {
        return;
      }

      this.setValueFromEvent(event.center.x);
    },
    dragEnd: function dragEnd() {
      if (this.get('disabled')) {
        return;
      }

      this.setProperties({
        active: false,
        dragging: false
      });
    },
    keyDown: function keyDown(event) {
      if (this.get('disabled')) {
        return;
      }

      var changeAmount = void 0,
          newValue = void 0;

      if (event.keyCode === this.get('constants.KEYCODE.LEFT_ARROW')) {
        changeAmount = parseFloat(this.get('step')) * -1;
      } else if (event.keyCode === this.get('constants.KEYCODE.RIGHT_ARROW')) {
        changeAmount = parseFloat(this.get('step'));
      }

      if (changeAmount) {
        if (event.metaKey || event.ctrlKey || event.altKey) {
          changeAmount *= 4;
        }

        newValue = this.get('value') + changeAmount;

        this.sendAction('onChange', this.minMaxValidator(newValue));

        event.preventDefault();
        event.stopPropagation();
      }
    }
  });
});