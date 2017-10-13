define('ember-paper/components/paper-menu-content', ['exports', 'ember-paper/templates/components/paper-menu-content', 'ember-basic-dropdown/components/basic-dropdown/content', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _paperMenuContent, _content, _transitionMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var $ = Ember.$,
      computed = Ember.computed,
      htmlSafe = Ember.String.htmlSafe;

  var MutObserver = window.MutationObserver || window.WebKitMutationObserver;

  function waitForAnimations(element, callback) {
    var computedStyle = window.getComputedStyle(element);
    if (computedStyle.transitionDuration && computedStyle.transitionDuration !== '0s') {
      var eventCallback = function eventCallback() {
        element.removeEventListener('transitionend', eventCallback);
        callback();
      };
      element.addEventListener('transitionend', eventCallback);
    } else if (computedStyle.animationName !== 'none' && computedStyle.animationPlayState === 'running') {
      var _eventCallback = function _eventCallback() {
        element.removeEventListener('animationend', _eventCallback);
        callback();
      };
      element.addEventListener('animationend', _eventCallback);
    } else {
      callback();
    }
  }

  /**
   * @class PaperMenuContent
   * @extends ContentComponent
   */
  exports.default = _content.default.extend({
    layout: _paperMenuContent.default,

    // We need to overwrite this CP because:
    //   1. we don't want to use the width property
    //   2. we need additional styles
    style: computed('top', 'left', 'right', 'transform', 'transformOrigin', function () {
      var style = '';

      var _getProperties = this.getProperties('top', 'left', 'right', 'transform', 'transformOrigin'),
          top = _getProperties.top,
          left = _getProperties.left,
          right = _getProperties.right,
          transform = _getProperties.transform,
          transformOrigin = _getProperties.transformOrigin;

      if (top) {
        style += 'top: ' + top + ';';
      }
      if (left) {
        style += 'left: ' + left + ';';
      }
      if (right) {
        style += 'right: ' + right + ';';
      }
      if (transform) {
        style += 'transform: ' + transform + ';';
      }
      if (transformOrigin) {
        style += 'transform-origin: ' + transformOrigin + ';';
      }
      if (style.length > 0) {
        return htmlSafe(style);
      }
    }),

    startObservingDomMutations: function startObservingDomMutations() {
      var _this = this;

      if (MutObserver) {
        this.mutationObserver = new MutObserver(function (mutations) {
          // e-b-d incorrectly counts ripples as a mutation, triggering a problematic repositon
          // convert NodeList to Array
          var addedNodes = Array.prototype.slice.call(mutations[0].addedNodes).filter(function (node) {
            return !$(node).hasClass('md-ripple') && node.nodeName !== '#comment' && !(node.nodeName === '#text' && node.nodeValue === '');
          });
          var removedNodes = Array.prototype.slice.call(mutations[0].removedNodes).filter(function (node) {
            return !$(node).hasClass('md-ripple') && node.nodeName !== '#comment';
          });

          if (addedNodes.length || removedNodes.length) {
            _this.runloopAwareReposition();
          }
        });
        this.mutationObserver.observe(this.dropdownElement, { childList: true, subtree: true });
      } else {
        this.dropdownElement.addEventListener('DOMNodeInserted', this.runloopAwareReposition, false);
        this.dropdownElement.addEventListener('DOMNodeRemoved', this.runloopAwareReposition, false);
      }
    },
    animateIn: function animateIn() {
      var _this2 = this;

      this.dropdownElement.style.transform = this.get('transform');
      (0, _transitionMixin.nextTick)().then(function () {
        _this2.set('isActive', true);
        _this2.set('transform', null);
      });
    },
    animateOut: function animateOut(dropdownElement) {
      var _this3 = this;

      var parentElement = this.get('renderInPlace') ? dropdownElement.parentElement.parentElement : dropdownElement.parentElement;
      var clone = dropdownElement.cloneNode(true);
      clone.id = clone.id + '--clone';
      var $clone = $(clone);
      parentElement.appendChild(clone);
      (0, _transitionMixin.nextTick)().then(function () {
        if (!_this3.get('isDestroyed')) {
          _this3.set('isActive', false);
          $clone.addClass('md-leave');
          waitForAnimations(clone, function () {
            $clone.removeClass('md-active');
            parentElement.removeChild(clone);
          });
        } else {
          parentElement.removeChild(clone);
        }
      });
    }
  });
});