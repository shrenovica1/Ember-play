define('ember-paper/components/paper-progress-circular', ['exports', 'ember-paper/templates/components/paper-progress-circular', 'ember-paper/mixins/color-mixin', 'ember-paper/utils/clamp', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _paperProgressCircular, _colorMixin, _clamp, _transitionMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      isPresent = Ember.isPresent,
      htmlSafe = Ember.String.htmlSafe;


  var MODE_DETERMINATE = 'determinate';
  var MODE_INDETERMINATE = 'indeterminate';

  var now = function now() {
    return new Date().getTime();
  };

  function linearEase(t, b, c, d) {
    return c * t / d + b;
  }

  function materialEase(t, b, c, d) {
    // via http://www.timotheegroleau.com/Flash/experiments/easing_function_generator.htm
    // with settings of [0, 0, 1, 1]
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
  }

  /**
   * @class PaperProgressCircular
   * @extends Ember.Component
   * @uses ColorMixin
   */
  exports.default = Component.extend(_colorMixin.default, {
    layout: _paperProgressCircular.default,
    tagName: 'md-progress-circular',
    classNames: ['md-default-theme'],
    attributeBindings: ['value', 'mode:md-mode', 'containerStyle:style'],
    classNameBindings: ['spinnerClass', 'disabled:_md-progress-circular-disabled'],

    diameter: 50,
    strokeRatio: 0.1,

    durationIndeterminate: 1333,
    easeFnIndeterminate: materialEase,
    startIndeterminate: 1,
    endIndeterminate: 149,

    mode: computed('value', function () {
      var value = this.get('value');
      return isPresent(value) ? MODE_DETERMINATE : MODE_INDETERMINATE;
    }),

    spinnerClass: computed('mode', function () {
      var mode = this.get('mode');
      return mode === MODE_DETERMINATE || mode === MODE_INDETERMINATE ? 'md-mode-' + mode : 'ng-hide';
    }),

    isIndeterminate: computed.equal('mode', MODE_INDETERMINATE),

    strokeWidth: computed('strokeRatio', 'diameter', function () {
      return this.get('strokeRatio') * this.get('diameter');
    }),

    strokeDasharray: computed('mode', 'diameter', 'strokeWidth', function () {
      if (this.get('mode') === MODE_INDETERMINATE) {
        return (this.get('diameter') - this.get('strokeWidth')) * Math.PI * 0.75;
      } else {
        return (this.get('diameter') - this.get('strokeWidth')) * Math.PI;
      }
    }),

    d: computed('diameter', 'strokeWidth', 'isIndeterminate', function () {
      return this.getSvgArc(this.get('diameter'), this.get('strokeWidth'), this.get('isIndeterminate'));
    }),

    pathDiameter: computed('diameter', 'strokeWidth', function () {
      return this.get('diameter') - this.get('strokeWidth');
    }),

    containerStyle: computed('diameter', function () {
      var diameter = this.get('diameter');
      var width = 'width: ' + diameter + 'px';
      var height = 'height: ' + diameter + 'px';
      return htmlSafe([width, height].join('; '));
    }),

    svgStyle: computed('diameter', function () {
      var diameter = this.get('diameter');
      var width = 'width: ' + diameter + 'px';
      var height = 'height: ' + diameter + 'px';
      var transformOrigin = 'transform-origin: ' + diameter / 2 + 'px ' + diameter / 2 + 'px ' + diameter / 2 + 'px';
      return htmlSafe([width, height, transformOrigin].join('; '));
    }),

    pathStyle: computed('strokeWidth', function () {
      return htmlSafe('stroke-width: ' + this.get('strokeWidth') + 'px');
    }),

    svgArc: computed('value', 'oldValue', 'diameter', function () {}),

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      if (this.get('mode') === MODE_INDETERMINATE) {
        this.startIndeterminateAnimation();
      }
    },
    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);
      var newValue = (0, _clamp.default)(this.get('value'), 0, 100);
      var newDisabled = this.get('disabled');

      if (this.oldValue !== newValue) {
        // value changed
        this.startDeterminateAnimation(this.oldValue, newValue);
        this.oldValue = newValue;
      }

      if (this.oldDisabled !== newDisabled) {
        // disabled changed
        if (newDisabled && this.lastDrawFrame) {
          (0, _transitionMixin.cAF)(this.lastDrawFrame);
        } else if (this.get('mode') === MODE_INDETERMINATE) {
          this.startIndeterminateAnimation();
        }
        this.oldValue = newValue;
      }
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);

      if (this.lastDrawFrame) {
        (0, _transitionMixin.cAF)(this.lastDrawFrame);
      }
    },
    startDeterminateAnimation: function startDeterminateAnimation(oldValue, newValue) {
      this.renderCircle(oldValue, newValue);
    },


    iterationCount: 0,
    startIndeterminateAnimation: function startIndeterminateAnimation() {
      this.renderCircle(this.get('startIndeterminate'), this.get('endIndeterminate'), this.get('easeFnIndeterminate'), this.get('durationIndeterminate'), this.iterationCount, 75);

      // The % 4 technically isn't necessary, but it keeps the rotation
      // under 360, instead of becoming a crazy large number.
      this.iterationCount = ++this.iterationCount % 4;
    },


    lastAnimationId: 0,
    renderCircle: function renderCircle(animateFrom, animateTo) {
      var ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : linearEase;
      var animationDuration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;

      var _this = this;

      var iterationCount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var dashLimit = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 100;

      var id = ++this.lastAnimationId;
      var startTime = now();
      var changeInValue = animateTo - animateFrom;
      var diameter = this.get('diameter');
      var strokeWidth = this.get('strokeWidth');
      var rotation = -90 * iterationCount;

      var renderFrame = function renderFrame(value, diameter, strokeWidth, dashLimit) {
        if (!_this.isDestroyed && !_this.isDestroying) {
          _this.$('path').attr('stroke-dashoffset', _this.getDashLength(diameter, strokeWidth, value, dashLimit));
          _this.$('path').attr('transform', 'rotate(' + rotation + ' ' + diameter / 2 + ' ' + diameter / 2 + ')');
        }
      };

      // No need to animate it if the values are the same
      if (animateTo === animateFrom) {
        renderFrame(animateTo, diameter, strokeWidth, dashLimit);
      } else {
        var animation = function animation() {
          var currentTime = (0, _clamp.default)(now() - startTime, 0, animationDuration);

          renderFrame(ease(currentTime, animateFrom, changeInValue, animationDuration), diameter, strokeWidth, dashLimit);

          // Do not allow overlapping animations
          if (id === _this.lastAnimationId && currentTime < animationDuration) {
            _this.lastDrawFrame = (0, _transitionMixin.rAF)(animation);
          }

          if (currentTime >= animationDuration && _this.get('mode') === MODE_INDETERMINATE) {
            _this.startIndeterminateAnimation();
          }
        };
        this.lastDrawFrame = (0, _transitionMixin.rAF)(animation);
      }
    },


    /**
     * Returns SVG path data for progress circle
     * Syntax spec: https://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
     *
     * @param {number} diameter Diameter of the container.
     * @param {number} strokeWidth Stroke width to be used when drawing circle
     * @param {boolean} indeterminate Use if progress circle will be used for indeterminate
     *
     * @returns {string} String representation of an SVG arc.
     */
    getSvgArc: function getSvgArc(diameter, strokeWidth, indeterminate) {
      var radius = diameter / 2;
      var offset = strokeWidth / 2;
      var start = radius + ',' + offset; // ie: (25, 2.5) or 12 o'clock
      var end = offset + ',' + radius; // ie: (2.5, 25) or  9 o'clock
      var arcRadius = radius - offset;

      /* eslint-disable */
      return 'M' + start + 'A' + arcRadius + ',' + arcRadius + ' 0 1 1 ' + end // 75% circle
      + (indeterminate ? '' : 'A' + arcRadius + ',' + arcRadius + ' 0 0 1 ' + start); // loop to start
      /* eslint-enable */
    },


    /**
     * Return stroke length for progress circle
     *
     * @param {number} diameter Diameter of the container.
     * @param {number} strokeWidth Stroke width to be used when drawing circle
     * @param {number} value Percentage of circle (between 0 and 100)
     * @param {number} limit Max percentage for circle
     *
     * @returns {number} Stroke length for progres circle
     */
    getDashLength: function getDashLength(diameter, strokeWidth, value, limit) {
      return (diameter - strokeWidth) * Math.PI * (3 * (limit || 100) / 100 - value / 100);
    }
  });
});