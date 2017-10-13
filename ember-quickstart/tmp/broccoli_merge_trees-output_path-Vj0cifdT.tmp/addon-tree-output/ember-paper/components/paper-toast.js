define('ember-paper/components/paper-toast', ['exports', 'ember-paper/templates/components/paper-toast'], function (exports, _paperToast) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var $ = Ember.$,
      Component = Ember.Component,
      computed = Ember.computed,
      inject = Ember.inject,
      testing = Ember.testing,
      run = Ember.run,
      guidFor = Ember.guidFor;
  exports.default = Component.extend({
    layout: _paperToast.default,
    tagName: '',
    escapeToClose: false,
    swipeToClose: true,
    capsule: false,
    duration: 3000,

    position: 'bottom left',

    left: computed('position', function () {
      var _get$split = this.get('position').split(' '),
          _get$split2 = _slicedToArray(_get$split, 2),
          x = _get$split2[1];

      return x === 'left';
    }),

    top: computed('position', function () {
      var _get$split3 = this.get('position').split(' '),
          _get$split4 = _slicedToArray(_get$split3, 1),
          y = _get$split4[0];

      return y === 'top';
    }),

    // Calculate a default that is always valid for the parent of the backdrop.
    wormholeSelector: '#paper-toast-fab-wormhole',
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
          id = this.uniqueId + '-parent';
          $parent.get(0).id = id;
        }
        return id;
      }
    }),

    constants: inject.service(),

    _destroyMessage: function _destroyMessage() {
      if (!this.isDestroyed) {
        this.sendAction('onClose');
      }
    },
    init: function init() {
      this._super.apply(this, arguments);
      this.uniqueId = guidFor(this);
    },
    willInsertElement: function willInsertElement() {
      this._super.apply(this, arguments);
      $('#' + this.get('destinationId')).addClass('md-toast-animating');
    },
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);

      if (this.get('duration') !== false) {
        run.later(this, '_destroyMessage', this.get('duration'));
      }

      if (this.get('escapeToClose')) {
        // Adding Listener to body tag, FIXME
        $('body').on('keydown.' + this.uniqueId, function (e) {
          if (e.keyCode === _this.get('constants.KEYCODE.ESCAPE') && _this.get('onClose')) {
            _this._destroyMessage();
          }
        });
      }

      var y = this.get('top') ? 'top' : 'bottom';
      $('#' + this.get('destinationId')).addClass('md-toast-open-' + y);
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      if (this.get('escapeToClose')) {
        $('body').off('keydown.' + this.uniqueId);
      }

      var y = this.get('top') ? 'top' : 'bottom';
      $('#' + this.get('destinationId')).removeClass('md-toast-open-' + y + ' md-toast-animating');
    },
    swipe: function swipe() {
      if (this.get('swipeToClose')) {
        this.sendAction('onClose');
      }
    }
  });
});