define('ember-paper/components/paper-grid-list', ['exports', 'ember-paper/templates/components/paper-grid-list', 'ember-composability-tools', 'ember-paper/utils/grid-layout'], function (exports, _paperGridList, _emberComposabilityTools, _gridLayout) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      inject = Ember.inject,
      computed = Ember.computed,
      run = Ember.run;


  var mediaRegex = /(^|\s)((?:print-)|(?:[a-z]{2}-){1,2})?(\d+)(?!\S)/g;
  var rowHeightRegex = /(^|\s)((?:print-)|(?:[a-z]{2}-){1,2})?(\d+(?:[a-z]{2,3}|%)?|\d+:\d+|fit)(?!\S)/g;

  var unitCSS = function unitCSS(units) {
    return units.share + '% - (' + units.gutter + ' * ' + units.gutterShare + ')';
  };

  var dimensionCSS = function dimensionCSS(dimensions) {
    return 'calc((' + dimensions.unit + ') * ' + dimensions.span + ' + (' + dimensions.span + ' - 1) * ' + dimensions.gutter + ')';
  };

  var media = function media(mediaName) {
    return mediaName.charAt(0) !== '(' ? '(' + mediaName + ')' : mediaName;
  };

  var mediaListenerName = function mediaListenerName(name) {
    return name.replace('-', '') + 'Listener';
  };

  /**
   * @class PaperGridList
   * @extends Ember.Component
   */
  exports.default = Component.extend(_emberComposabilityTools.ParentMixin, {
    layout: _paperGridList.default,
    tagName: 'md-grid-list',

    constants: inject.service(),

    tiles: computed.alias('childComponents'),

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this._installMediaListener();
    },
    didUpdateAttrs: function didUpdateAttrs() {
      this._super.apply(this, arguments);
      this.updateGrid();
    },
    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this._uninstallMediaListener();
    },


    // Sets up a listener for each media query
    _installMediaListener: function _installMediaListener() {
      var _this = this;

      var _loop = function _loop(mediaName) {
        var query = _this.get('constants.MEDIA')[mediaName] || media(mediaName);
        var mediaList = window.matchMedia(query);
        var listenerName = mediaListenerName(mediaName);

        // Sets mediaList to a property so removeListener can access it
        _this.set(listenerName + 'List', mediaList);
        // Creates a function based on mediaName so that removeListener can remove it.
        _this.set(listenerName, run.bind(_this, function (result) {
          _this._mediaDidChange(mediaName, result.matches);
        }));

        // Calls '_mediaDidChange' once
        _this[listenerName](mediaList);

        mediaList.addListener(_this[listenerName]);
      };

      for (var mediaName in this.get('constants.MEDIA')) {
        _loop(mediaName);
      }
    },
    _uninstallMediaListener: function _uninstallMediaListener() {
      for (var mediaName in this.get('constants.MEDIA')) {
        var listenerName = mediaListenerName(mediaName);
        var mediaList = this.get(listenerName + 'List');
        mediaList.removeListener(this[listenerName]);
      }
    },
    _mediaDidChange: function _mediaDidChange(mediaName, matches) {
      this.set(mediaName, matches);
      run.debounce(this, this._updateCurrentMedia, 50);
    },
    _updateCurrentMedia: function _updateCurrentMedia() {
      var _this2 = this;

      var mediaPriorities = this.get('constants.MEDIA_PRIORITY');
      var currentMedia = mediaPriorities.filter(function (mediaName) {
        return _this2.get(mediaName);
      });
      this.set('currentMedia', currentMedia);
      this.updateGrid();
    },
    updateGrid: function updateGrid() {
      this.$().css(this._gridStyle());
      this.get('tiles').forEach(function (tile) {
        tile.$().css(tile._tileStyle());
      });
    },
    _gridStyle: function _gridStyle() {
      this._setTileLayout();

      var style = {};
      var colCount = this.get('currentCols');
      var gutter = this.get('currentGutter');
      var rowHeight = this.get('currentRowHeight');
      var rowMode = this.get('currentRowMode');
      var rowCount = this.get('rowCount');

      switch (rowMode) {
        case 'fixed':
          {
            style.height = dimensionCSS({ unit: rowHeight, span: rowCount, gutter: gutter });
            style.paddingBottom = '';
            break;
          }
        case 'ratio':
          {
            // rowHeight is width / height
            var hGutterShare = colCount === 1 ? 0 : (colCount - 1) / colCount;
            var hShare = 1 / colCount * 100;
            var vShare = hShare * (1 / rowHeight);
            var vUnit = unitCSS({ share: vShare, gutterShare: hGutterShare, gutter: gutter });

            style.height = '';
            style.paddingBottom = dimensionCSS({ unit: vUnit, span: rowCount, gutter: gutter });
            break;
          }
        case 'fit':
          {
            // noop, as the height is user set
            break;
          }
      }

      return style;
    },


    // Calculates tile positions
    _setTileLayout: function _setTileLayout() {
      var tiles = this.get('tiles');
      var layoutInfo = (0, _gridLayout.default)(this.get('currentCols'), tiles);

      tiles.forEach(function (tile, i) {
        tile.set('position', layoutInfo.positions[i]);
      });

      this.set('rowCount', layoutInfo.rowCount);
    },


    // Parses attribute string and returns hash of media sizes
    _extractResponsiveSizes: function _extractResponsiveSizes(string) {
      var regex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mediaRegex;

      var matches = {};
      var match = void 0;
      while (match = regex.exec(string)) {
        if (match[2]) {
          matches[match[2].slice(0, -1)] = match[3];
        } else {
          matches.base = match[3];
        }
      }
      return matches;
    },


    // Gets attribute for current media
    _getAttributeForMedia: function _getAttributeForMedia(sizes, currentMedia) {
      for (var i = 0; i < currentMedia.length; i++) {
        if (sizes[currentMedia[i]]) {
          return sizes[currentMedia[i]];
        }
      }
      return sizes.base;
    },


    colsMedia: computed('cols', function () {
      var sizes = this._extractResponsiveSizes(this.get('cols'));
      if (Object.keys(sizes).length === 0) {
        throw new Error('md-grid-list: No valid cols found');
      }
      return sizes;
    }),

    currentCols: computed('colsMedia', 'currentMedia.[]', function () {
      return this._getAttributeForMedia(this.get('colsMedia'), this.get('currentMedia')) || 1;
    }),

    gutterMedia: computed('gutter', function () {
      return this._extractResponsiveSizes(this.get('gutter'), rowHeightRegex);
    }),

    currentGutter: computed('gutterMedia', 'currentMedia.[]', function () {
      return this._applyDefaultUnit(this._getAttributeForMedia(this.get('gutterMedia'), this.get('currentMedia')) || 1);
    }),

    rowHeightMedia: computed('rowHeight', function () {
      var rowHeights = this._extractResponsiveSizes(this.get('rowHeight'), rowHeightRegex);
      if (Object.keys(rowHeights).length === 0) {
        throw new Error('md-grid-list: No valid rowHeight found');
      }
      return rowHeights;
    }),

    currentRowHeight: computed('rowHeightMedia', 'currentMedia.[]', function () {
      var rowHeight = this._getAttributeForMedia(this.get('rowHeightMedia'), this.get('currentMedia'));
      this.set('currentRowMode', this._getRowMode(rowHeight));
      switch (this._getRowMode(rowHeight)) {
        case 'fixed':
          {
            return this._applyDefaultUnit(rowHeight);
          }
        case 'ratio':
          {
            var whRatio = rowHeight.split(':');
            return parseFloat(whRatio[0]) / parseFloat(whRatio[1]);
          }
        case 'fit':
          {
            return 0;
          }
      }
    }),

    _getRowMode: function _getRowMode(rowHeight) {
      if (rowHeight === 'fit') {
        return 'fit';
      } else if (rowHeight.indexOf(':') !== -1) {
        return 'ratio';
      } else {
        return 'fixed';
      }
    },
    _applyDefaultUnit: function _applyDefaultUnit(val) {
      return (/\D$/.test(val) ? val : val + 'px'
      );
    }
  });
});