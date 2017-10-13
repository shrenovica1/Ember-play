define('ember-paper/components/paper-tabs', ['exports', 'ember-paper/templates/components/paper-tabs', 'ember-composability-tools', 'ember-paper/mixins/color-mixin'], function (exports, _paperTabs, _emberComposabilityTools, _colorMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed,
      Component = Ember.Component,
      htmlSafe = Ember.String.htmlSafe,
      inject = Ember.inject;
  exports.default = Component.extend(_emberComposabilityTools.ParentMixin, _colorMixin.default, {
    layout: _paperTabs.default,
    tagName: 'md-tabs',

    classNames: ['md-no-tab-content', 'md-default-theme'],
    attributeBindings: ['borderBottom:md-border-bottom'],

    constants: inject.service(),

    selected: 0, // select first tab by default

    _selectedTab: computed('childComponents.@each.value', 'selected', function () {
      return this.get('childComponents').findBy('value', this.get('selected'));
    }),

    _previousSelectedTab: computed('childComponents.@each.value', 'previousSelected', function () {
      return this.get('childComponents').findBy('value', this.get('previousSelected'));
    }),

    noInkBar: false,
    noInk: false,
    ariaLabel: null,
    previousInkBarPosition: 0,
    stretch: 'sm',

    inkBarLeft: computed('_selectedTab.left', function () {
      return this.get('_selectedTab.left') || 0;
    }),

    inkBarRight: computed('wrapperWidth', '_selectedTab.currentWidth', 'inkBarLeft', function () {
      return this.get('wrapperWidth') - this.get('inkBarLeft') - (this.get('_selectedTab.currentWidth') || 0);
    }),

    tabsWidth: computed('childComponents.@each.width', function () {
      return this.get('childComponents').reduce(function (prev, t) {
        return prev + t.get('width');
      }, 0);
    }),

    shouldPaginate: computed('canvasWidth', function () {
      return this.get('tabsWidth') > this.get('canvasWidth');
    }),

    shouldCenter: computed('shouldPaginate', 'center', function () {
      return !this.get('shouldPaginate') && this.get('center');
    }),

    shouldStretch: computed('shouldPaginate', 'currentStretch', function () {
      return !this.get('shouldPaginate') && this.get('currentStretch');
    }),

    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);
      if (this.get('selected') !== this.get('previousSelected')) {
        this.setMovingRight();
        this.fixOffsetIfNeeded();
        this.set('previousSelected', this.get('selected'));
      }
    },
    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);

      var updateCanvasWidth = function updateCanvasWidth() {
        _this.updateDimensions();
        _this.updateStretchTabs();
      };

      window.addEventListener('resize', updateCanvasWidth);
      window.addEventListener('orientationchange', updateCanvasWidth);
      this.updateCanvasWidth = updateCanvasWidth;
    },
    didRender: function didRender() {
      this._super.apply(this, arguments);
      this.updateCanvasWidth();
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      window.removeEventListener('resize', this.updateCanvasWidth);
      window.removeEventListener('orientationchange', this.updateCanvasWidth);
    },
    registerChild: function registerChild(childComponent) {
      this._super.apply(this, arguments);
      // automatically set value if not manually set
      if (childComponent.get('value') === undefined) {
        var length = this.childComponents.get('length');
        childComponent.set('value', length - 1);
      }
    },
    setMovingRight: function setMovingRight() {
      var movingRight = this.get('_previousSelectedTab.left') < this.get('_selectedTab.left');
      this.set('movingRight', movingRight);
    },
    fixOffsetIfNeeded: function fixOffsetIfNeeded() {
      var canvasWidth = this.get('canvasWidth');
      var currentOffset = this.get('currentOffset');

      var tabRight = this.get('_selectedTab.left') + this.get('_selectedTab.width');
      if (tabRight - currentOffset > canvasWidth) {
        var newOffset = tabRight - canvasWidth;
        this.set('currentOffset', newOffset);
        this.set('paginationStyle', htmlSafe('transform: translate3d(-' + newOffset + 'px, 0px, 0px);'));
      }

      if (this.get('_selectedTab.left') < currentOffset) {
        var _newOffset = this.get('_selectedTab.left');
        this.set('currentOffset', _newOffset);
        this.set('paginationStyle', htmlSafe('transform: translate3d(-' + _newOffset + 'px, 0px, 0px);'));
      }
    },
    updateDimensions: function updateDimensions() {
      var canvasWidth = this.element.querySelector('md-tabs-canvas').offsetWidth;
      var wrapperWidth = this.element.querySelector('md-pagination-wrapper').offsetWidth;
      this.get('childComponents').invoke('updateDimensions');
      this.set('canvasWidth', canvasWidth);
      this.set('wrapperWidth', wrapperWidth);
    },
    updateStretchTabs: function updateStretchTabs() {
      var stretch = this.get('stretch');
      var currentStretch = void 0;

      // if `true` or `false` is specified, always/never "stretch tabs"
      // otherwise proceed with normal matchMedia test
      if (typeof stretch === 'boolean') {
        currentStretch = stretch;
      } else {
        var mediaQuery = this.get('constants').MEDIA[stretch] || stretch;
        currentStretch = window.matchMedia(mediaQuery).matches;
      }

      this.set('currentStretch', currentStretch);
    },


    currentOffset: 0,
    canPageBack: computed.gt('currentOffset', 0),
    canPageForward: computed('wrapperWidth', 'currentOffset', 'canvasWidth', function () {
      return this.get('wrapperWidth') - this.get('currentOffset') > this.get('canvasWidth');
    }),

    actions: {
      previousPage: function previousPage() {
        var _this2 = this;

        var tab = this.get('childComponents').find(function (t) {
          return t.get('left') >= _this2.get('currentOffset');
        });
        if (tab) {
          var left = Math.max(0, tab.get('left') - this.get('canvasWidth'));
          this.set('currentOffset', left);
          this.set('paginationStyle', htmlSafe('transform: translate3d(-' + left + 'px, 0px, 0px);'));
        }
      },
      nextPage: function nextPage() {
        var _this3 = this;

        var tab = this.get('childComponents').find(function (t) {
          return t.get('left') + t.get('width') - _this3.get('currentOffset') > _this3.get('canvasWidth');
        });
        if (tab) {
          this.set('currentOffset', tab.get('left'));
          this.set('paginationStyle', htmlSafe('transform: translate3d(-' + tab.get('left') + 'px, 0px, 0px);'));
        }
      },
      onChange: function onChange(selected) {
        // support non DDAU scenario
        if (this.get('onChange')) {
          this.sendAction('onChange', selected.get('value'));
        } else {
          this.set('selected', selected.get('value'));
        }
      }
    }
  });
});