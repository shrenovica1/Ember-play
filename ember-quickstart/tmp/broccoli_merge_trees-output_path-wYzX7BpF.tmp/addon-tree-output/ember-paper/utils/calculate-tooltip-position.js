define('ember-paper/utils/calculate-tooltip-position', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = calculateTooltipPosition;
  function calculateTooltipPosition(tooltip, target, position) {
    var panelBounds = tooltip.getBoundingClientRect();
    var panelWidth = panelBounds.width;
    var panelHeight = panelBounds.height;

    var targetBounds = target.getBoundingClientRect();

    var targetLeft = targetBounds.left;
    var targetRight = targetBounds.right;
    var targetWidth = targetBounds.width;

    var positionStyle = {};

    switch (position) {
      case 'top':
      case 'bottom':
        positionStyle.left = targetLeft + 0.5 * targetWidth - 0.5 * panelWidth;
        break;
      case 'right':
        positionStyle.left = targetRight;
        break;
      case 'left':
        positionStyle.left = targetLeft - panelWidth;
        break;
    }

    var targetTop = targetBounds.top;
    var targetBottom = targetBounds.bottom;
    var targetHeight = targetBounds.height;

    switch (position) {
      case 'right':
      case 'left':
        positionStyle.top = targetTop + 0.5 * targetHeight - 0.5 * panelHeight;
        break;
      case 'top':
        positionStyle.top = targetTop - panelHeight;
        break;
      case 'bottom':
        positionStyle.top = targetBottom;
        break;
    }

    return positionStyle;
  }
});