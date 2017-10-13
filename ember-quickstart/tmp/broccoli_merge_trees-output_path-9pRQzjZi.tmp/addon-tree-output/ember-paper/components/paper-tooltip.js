define('ember-paper/components/paper-tooltip', ['exports', 'ember-paper/templates/components/paper-tooltip', 'ember-paper/utils/get-parent'], function (exports, _paperTooltip, _getParent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var $ = Ember.$;
  var Component = Ember.Component,
      computed = Ember.computed,
      testing = Ember.testing,
      run = Ember.run,
      htmlSafe = Ember.String.htmlSafe;
  exports.default = Component.extend({
    tagName: '',
    layout: _paperTooltip.default,

    position: 'bottom',

    wormholeSelector: '#paper-wormhole',
    defaultedParent: computed.or('parent', 'wormholeSelector'),

    // Calculate the id of the wormhole destination, setting it if need be. The
    // id is that of the 'parent', if provided, or 'paper-wormhole' if not.
    destinationId: computed('defaultedParent', function () {
      if (testing && !this.get('parent')) {
        return 'ember-testing';
      }
      var parent = this.get('defaultedParent');
      var $parent = $(parent);
      // If the parent isn't found, assume that it is an id, but that the DOM doesn't
      // exist yet. This only happens during integration tests or if entire application
      // route is a dialog.
      if ($parent.length === 0 && parent.charAt(0) === '#') {
        return parent.substring(1);
      } else {
        var id = $parent.attr('id');
        if (!id) {
          id = this.elementId + '-parent';
          $parent.get(0).id = id;
        }
        return id;
      }
    }),

    zIndex: 100,

    containerStyle: computed('zIndex', function () {
      return htmlSafe('pointer-events: none; z-index: ' + this.get('zIndex') + ';');
    }),

    anchorElement: computed('attachTo', function () {
      var attachTo = this.get('attachTo');
      if (attachTo) {
        return $(attachTo).get(0);
      } else {
        return (0, _getParent.default)(this);
      }
    }),

    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);
      var anchorElement = this.get('anchorElement');

      var leaveHandler = function leaveHandler() {
        _this.set('hideTooltip', true);
        run.later(function () {
          if (!_this.isDestroyed) {
            _this.set('renderTooltip', false);
          }
        }, 150);

        anchorElement.addEventListener('blur', leaveHandler);
        anchorElement.addEventListener('touchcancel', leaveHandler);
        anchorElement.addEventListener('mouseleave', leaveHandler);
      };

      var enterEventHandler = function enterEventHandler() {
        anchorElement.addEventListener('blur', leaveHandler);
        anchorElement.addEventListener('touchcancel', leaveHandler);
        anchorElement.addEventListener('mouseleave', leaveHandler);

        _this.set('renderTooltip', true);
        _this.set('hideTooltip', false);
      };

      anchorElement.addEventListener('focus', enterEventHandler);
      anchorElement.addEventListener('touchstart', enterEventHandler);
      anchorElement.addEventListener('mouseenter', enterEventHandler);

      window.addEventListener('scroll', leaveHandler);
      window.addEventListener('blur', leaveHandler);
      window.addEventListener('resize', leaveHandler);
      window.addEventListener('orientationchange', leaveHandler);
      this.leaveHandler = leaveHandler;
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      window.removeEventListener('scroll', this.leaveHandler);
      window.removeEventListener('blur', this.leaveHandler);
      window.removeEventListener('resize', this.leaveHandler);
      window.removeEventListener('orientationchange', this.leaveHandler);
    }
  });
});