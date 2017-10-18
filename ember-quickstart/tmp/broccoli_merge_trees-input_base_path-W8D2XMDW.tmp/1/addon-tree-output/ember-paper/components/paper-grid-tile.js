define('ember-paper/components/paper-grid-tile', ['exports', 'ember-paper/templates/components/paper-grid-tile', 'ember-composability-tools'], function (exports, _paperGridTile, _emberComposabilityTools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Component = Ember.Component,
      computed = Ember.computed,
      run = Ember.run;


  var positionCSS = function positionCSS(positions) {
    return 'calc((' + positions.unit + ' + ' + positions.gutter + ') * ' + positions.offset + ')';
  };

  var dimensionCSS = function dimensionCSS(dimensions) {
    return 'calc((' + dimensions.unit + ') * ' + dimensions.span + ' + (' + dimensions.span + ' - 1) * ' + dimensions.gutter + ')';
  };

  var unitCSS = function unitCSS(units) {
    return units.share + '% - (' + units.gutter + ' * ' + units.gutterShare + ')';
  };

  /**
   * @class PaperGridTile
   * @extends Ember.Component
   */
  exports.default = Component.extend(_emberComposabilityTools.ChildMixin, {
    layout: _paperGridTile.default,
    tagName: 'md-grid-tile',

    gridList: computed.alias('parentComponent'),

    didUpdateAttrs: function didUpdateAttrs() {
      this._super.apply(this, arguments);
      this.updateTile();
    },
    updateTile: function updateTile() {
      var gridList = this.get('gridList');
      run.debounce(gridList, gridList.updateGrid, 50);
    },


    colspanMedia: computed('colspan', function () {
      return this.get('gridList')._extractResponsiveSizes(this.get('colspan'));
    }),

    currentColspan: computed('colspanMedia', 'gridList.currentMedia.[]', function () {
      var colspan = this.get('gridList')._getAttributeForMedia(this.get('colspanMedia'), this.get('gridList.currentMedia'));
      return parseInt(colspan, 10) || 1;
    }),

    rowspanMedia: computed('rowspan', function () {
      return this.get('gridList')._extractResponsiveSizes(this.get('rowspan'));
    }),

    currentRowspan: computed('rowspanMedia', 'gridList.currentMedia.[]', function () {
      var rowspan = this.get('gridList')._getAttributeForMedia(this.get('rowspanMedia'), this.get('gridList.currentMedia'));
      return parseInt(rowspan, 10) || 1;
    }),

    _tileStyle: function _tileStyle() {
      var position = this.get('position');
      var currentColspan = this.get('currentColspan');
      var currentRowspan = this.get('currentRowspan');
      var rowCount = this.get('gridList.rowCount');
      var colCount = this.get('gridList.currentCols');
      var gutter = this.get('gridList.currentGutter');
      var rowMode = this.get('gridList.currentRowMode');
      var rowHeight = this.get('gridList.currentRowHeight');

      // Percent of the available horizontal space that one column takes up.
      var hShare = 1 / colCount * 100;

      // Fraction of the gutter size that each column takes up.
      var hGutterShare = (colCount - 1) / colCount;

      // Base horizontal size of a column.
      var hUnit = unitCSS({ share: hShare, gutterShare: hGutterShare, gutter: gutter });

      // The width and horizontal position of each tile is always calculated the same way, but the
      // height and vertical position depends on the rowMode.
      var style = {
        left: positionCSS({ unit: hUnit, offset: position.col, gutter: gutter }),
        width: dimensionCSS({ unit: hUnit, span: currentColspan, gutter: gutter }),
        // resets
        paddingTop: '',
        marginTop: '',
        top: '',
        height: ''
      };

      var vShare = void 0,
          vUnit = void 0;

      switch (rowMode) {
        case 'fixed':
          {
            // In fixed mode, simply use the given rowHeight.
            style.top = positionCSS({ unit: rowHeight, offset: position.row, gutter: gutter });
            style.height = dimensionCSS({ unit: rowHeight, span: currentRowspan, gutter: gutter });
            break;
          }
        case 'ratio':
          {
            // Percent of the available vertical space that one row takes up. Here, rowHeight holds
            // the ratio value. For example, if the width:height ratio is 4:3, rowHeight = 1.333.
            vShare = hShare / rowHeight;

            // Base veritcal size of a row.
            vUnit = unitCSS({ share: vShare, gutterShare: hGutterShare, gutter: gutter });

            // paddingTop and marginTop are used to maintain the given aspect ratio, as
            // a percentage-based value for these properties is applied to the *width* of the
            // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
            style.paddingTop = dimensionCSS({ unit: vUnit, span: currentRowspan, gutter: gutter });
            style.marginTop = positionCSS({ unit: vUnit, offset: position.row, gutter: gutter });
            break;
          }
        case 'fit':
          {
            // Fraction of the gutter size that each column takes up.
            var vGutterShare = (rowCount - 1) / rowCount;

            // Percent of the available vertical space that one row takes up.
            vShare = 1 / rowCount * 100;

            // Base vertical size of a row.
            vUnit = unitCSS({ share: vShare, gutterShare: vGutterShare, gutter: gutter });

            style.top = positionCSS({ unit: vUnit, offset: position.row, gutter: gutter });
            style.height = dimensionCSS({ unit: vUnit, span: currentRowspan, gutter: gutter });
            break;
          }
      }

      return style;
    }
  });
});