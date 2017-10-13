define('virtual-each/components/virtual-each/component', ['exports', 'ember', 'virtual-each/mixins/event-listener', 'virtual-each/mixins/default-attrs', 'virtual-each/components/virtual-each/template'], function (exports, _ember, _virtualEachMixinsEventListener, _virtualEachMixinsDefaultAttrs, _virtualEachComponentsVirtualEachTemplate) {
  var Component = _ember['default'].Component;
  var run = _ember['default'].run;
  var observer = _ember['default'].observer;
  var computed = _ember['default'].computed;
  var _get = _ember['default'].get;
  var getProperties = _ember['default'].getProperties;
  var set = _ember['default'].set;
  var setProperties = _ember['default'].setProperties;
  var RSVP = _ember['default'].RSVP;
  var emberArray = _ember['default'].A;
  var htmlSafe = _ember['default'].String.htmlSafe;
  var escapeExpression = _ember['default'].Handlebars.Utils.escapeExpression;

  var VirtualEachComponent = Component.extend(_virtualEachMixinsEventListener['default'], _virtualEachMixinsDefaultAttrs['default'], {
    layout: _virtualEachComponentsVirtualEachTemplate['default'],
    classNames: ['virtual-each'],
    attributeBindings: ['style'],
    isWebkit: /WebKit/.test(navigator && navigator.userAgent),

    defaultAttrs: {
      height: 200,
      itemHeight: 20,
      scrollTimeout: 30
    },

    eventHandlers: {
      wheel: function wheel() {
        this._scrolledByWheel = true;
      },

      scroll: function scroll(e) {
        e.preventDefault();

        var scrollTimeout = this.getAttr('scrollTimeout');

        if (scrollTimeout && this.isWebkit && this._scrolledByWheel) {
          this._scrolledByWheel = false;
          this._scrollThrottleTimeut = run.throttle(this, this.calculateVisibleItems, scrollTimeout);
          return;
        }

        this.calculateVisibleItems();
      }
    },

    bufferSize: computed('rowPadding', function () {
      return _get(this, 'rowPadding') || 1;
    }),

    style: computed('height', {
      get: function get() {
        var height = escapeExpression(this.getAttr('height'));

        return htmlSafe('height: ' + height + 'px;');
      }
    }).readOnly(),

    contentStyle: computed('_marginTop', '_contentHeight', {
      get: function get() {
        var marginTop = escapeExpression(_get(this, '_marginTop'));
        var height = escapeExpression(_get(this, '_contentHeight'));

        return htmlSafe('height: ' + height + 'px; margin-top: ' + marginTop + 'px;');
      }
    }).readOnly(),

    visibleItems: computed('_startAt', '_itemCount', '_items.[]', 'bufferSize', {
      get: function get() {
        var _getProperties = getProperties(this, '_items', '_startAt', '_itemCount');

        var _items = _getProperties._items;
        var _startAt = _getProperties._startAt;
        var _itemCount = _getProperties._itemCount;

        var bufferSize = _get(this, 'bufferSize');
        var itemsLength = _get(_items, 'length');
        var endAt = Math.min(itemsLength, _startAt + _itemCount);
        var onScrollBottomed = this.attrs.onScrollBottomed;

        if (typeof onScrollBottomed === 'function' && _startAt + _itemCount - bufferSize >= itemsLength) {
          this._scrollBottomedTimeout = run.later(function () {
            return onScrollBottomed(_startAt, endAt);
          }, 5);
        }

        return _items.slice(_startAt, endAt).map(function (item, index) {
          return {
            raw: item,
            actualIndex: _startAt + index,
            virtualIndex: index
          };
        });
      }
    }).readOnly(),

    _itemCount: computed('height', 'itemHeight', 'bufferSize', {
      get: function get() {
        var height = this.getAttr('height');
        var bufferSize = _get(this, 'bufferSize');

        return Math.ceil(height / this.getAttr('itemHeight')) + bufferSize;
      }
    }).readOnly(),

    _marginTop: computed('_totalHeight', '_startAt', '_itemCount', 'itemHeight', 'bufferSize', {
      get: function get() {
        var bufferSize = _get(this, 'bufferSize');
        var itemHeight = this.getAttr('itemHeight');
        var totalHeight = _get(this, '_totalHeight');
        var margin = _get(this, '_startAt') * itemHeight;
        var visibleItemCount = _get(this, '_itemCount');
        var maxMargin = Math.max(0, totalHeight - (visibleItemCount - 1) * itemHeight + bufferSize * itemHeight);

        return Math.min(maxMargin, margin);
      }
    }).readOnly(),

    _contentHeight: computed('_totalHeight', '_marginTop', {
      get: function get() {
        return _get(this, '_totalHeight') - _get(this, '_marginTop');
      }
    }).readOnly(),

    init: function init() {
      this._super.apply(this, arguments);

      setProperties(this, {
        _items: emberArray(),
        _startAt: 0,
        _totalHeight: 0,
        _scrolledByWheel: false
      });
    },

    calculateVisibleItems: function calculateVisibleItems(positionIndex) {
      if (this.get('isDestroyed')) {
        return;
      }

      var startAt = _get(this, '_startAt');
      var scrolledAmount = this.element.scrollTop;
      var visibleStart = isNaN(positionIndex) ? Math.floor(scrolledAmount / this.getAttr('itemHeight')) : positionIndex;

      if (visibleStart !== startAt) {
        set(this, '_startAt', visibleStart);
      }
    },

    scrollTo: observer('_positionIndex', function () {
      var _this = this;

      var bufferSize = _get(this, 'bufferSize');
      var positionIndex = _get(this, '_positionIndex');
      var itemHeight = this.getAttr('itemHeight');
      var totalHeight = _get(this, '_totalHeight');
      var _itemCount = _get(this, '_itemCount');
      var startingIndex = isNaN(positionIndex) ? _get(this, '_startAt') : Math.max(positionIndex, 0);
      var startingPadding = itemHeight * startingIndex;
      var maxVisibleItemTop = Math.max(0, _get(this, '_items.length') - _itemCount + bufferSize);
      var maxPadding = Math.max(0, totalHeight - (_itemCount - 1) * itemHeight + bufferSize * itemHeight);
      var sanitizedIndex = Math.min(startingIndex, maxVisibleItemTop);
      var sanitizedPadding = startingPadding > maxPadding ? maxPadding : startingPadding;

      this.scheduledRender = run.scheduleOnce('afterRender', function () {
        _this.calculateVisibleItems(sanitizedIndex);
        _this.element.scrollTop = sanitizedPadding;
      });
    }),

    didReceiveAttrs: function didReceiveAttrs() {
      var _this2 = this;

      this._super.apply(this, arguments);

      RSVP.cast(this.getAttr('items')).then(function (attrItems) {
        var items = emberArray(attrItems);

        setProperties(_this2, {
          _items: items,
          _positionIndex: _this2.getAttr('positionIndex'),
          _totalHeight: Math.max(_get(items, 'length') * _this2.getAttr('itemHeight'), 0)
        });
      });
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);

      run.cancel(this.scheduledRender);
      run.cancel(this._scrollThrottleTimeut);
      run.cancel(this._scrollBottomedTimeout);
    }
  });

  VirtualEachComponent.reopenClass({
    positionalParams: ['items']
  });

  exports['default'] = VirtualEachComponent;
});