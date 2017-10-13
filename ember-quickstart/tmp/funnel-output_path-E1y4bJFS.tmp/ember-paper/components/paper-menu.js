/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-menu';
import BasicDropdownComponent from 'ember-basic-dropdown/components/basic-dropdown';
const { assert, computed } = Ember;

const MENU_EDGE_MARGIN = 8;

function clamp(pos, bounds, containerNode) {
  pos.top = Math.max(Math.min(pos.top, bounds.bottom - containerNode.offsetHeight), bounds.top);
  pos.left = Math.max(Math.min(pos.left, bounds.right - containerNode.offsetWidth), bounds.left);
}

function firstVisibleChild(node) {
  for (let i = 0; i < node.children.length; ++i) {
    if (window.getComputedStyle(node.children[i]).display !== 'none') {
      return node.children[i];
    }
  }
}

/**
 * @class PaperMenu
 * @extends BasicDropdownComponent
 */
export default BasicDropdownComponent.extend({
  layout,

  close() {
    this._super(...arguments);
    this.didAnimateScale = false;
  },

  position: 'target',

  // If attachment is a single item, duplicate it for our second value.
  // ie. 'target' -> 'target target'
  positionMode: computed('position', function() {
    let position = this.get('position') || 'target';
    let [left, top] = position.split(' ').map((s) => s.trim());
    top = top || left;

    return { left, top };
  }),

  offset: '0 0',

  offsets: computed('offset', function() {
    let offset = this.get('offset') || '0 0';
    let [left, top] = offset.split(' ').map((s) => s.trim()).map(parseFloat);
    top = top || left;

    return { left, top };
  }),

  calculatePosition(trigger, content, destination, { dropdown }) {
    let containerNode = content;
    let openMenuNode = content.firstElementChild;
    let openMenuNodeRect = openMenuNode.getBoundingClientRect();
    let boundryNode = document.body;
    let boundryNodeRect = boundryNode.getBoundingClientRect();

    let menuStyle = window.getComputedStyle(openMenuNode);

    let originNode = trigger.querySelector('.md-menu-origin') || trigger.querySelector('md-icon') || trigger;
    let originNodeRect = originNode.getBoundingClientRect();

    let bounds = {
      left: boundryNodeRect.left + MENU_EDGE_MARGIN,
      top: Math.max(boundryNodeRect.top, 0) + MENU_EDGE_MARGIN,
      bottom: Math.max(boundryNodeRect.bottom, Math.max(boundryNodeRect.top, 0) + boundryNodeRect.height) - MENU_EDGE_MARGIN,
      right: boundryNodeRect.right - MENU_EDGE_MARGIN
    };

    let alignTarget;
    let alignTargetRect = { top: 0, left: 0, right: 0, bottom: 0 };
    let existingOffsets = { top: 0, left: 0, right: 0, bottom: 0 };
    let positionMode = dropdown.get('positionMode');

    if (positionMode.top === 'target' || positionMode.left === 'target' || positionMode.left === 'target-right') {
      alignTarget = firstVisibleChild(openMenuNode);
      if (alignTarget) {
        // TODO: Allow centering on an arbitrary node, for now center on first menu-item's child
        alignTarget = alignTarget.firstElementChild || alignTarget;
        alignTarget = alignTarget.querySelector('md-icon') || alignTarget.querySelector('.md-menu-align-target') || alignTarget;
        alignTargetRect = alignTarget.getBoundingClientRect();

        existingOffsets = {
          top: parseFloat(containerNode.style.top || 0),
          left: parseFloat(containerNode.style.left || 0)
        };
      }
    }

    let position = {};
    let transformOrigin = 'top ';

    switch (positionMode.top) {
      case 'target':
        position.top = existingOffsets.top + originNodeRect.top - alignTargetRect.top;
        break;
      case 'cascade':
        position.top = originNodeRect.top - parseFloat(menuStyle.paddingTop) - originNode.style.top;
        break;
      case 'bottom':
        position.top = originNodeRect.top + originNodeRect.height;
        break;
      default:
        assert(`Invalid target mode '${positionMode.top}' specified for paper-menu on Y axis.`);
    }

    switch (positionMode.left) {
      case 'target': {
        position.left = existingOffsets.left + originNodeRect.left - alignTargetRect.left;
        transformOrigin += 'left';
        break;
      }
      case 'target-left': {
        position.left = originNodeRect.left;
        transformOrigin += 'left';
        break;
      }
      case 'target-right': {
        position.left = originNodeRect.right - openMenuNodeRect.width + (openMenuNodeRect.right - alignTargetRect.right);
        transformOrigin += 'right';
        break;
      }
      case 'cascade': {
        let willFitRight = (originNodeRect.right + openMenuNodeRect.width) < bounds.right;
        position.left = willFitRight ? originNodeRect.right - originNode.style.left : originNodeRect.left - originNode.style.left - openMenuNodeRect.width;
        transformOrigin += willFitRight ? 'left' : 'right';
        break;
      }
      case 'right': {
        position.left = originNodeRect.right - openMenuNodeRect.width;
        transformOrigin += 'right';
        break;
      }
      case 'left': {
        position.left = originNodeRect.left;
        transformOrigin += 'left';
        break;
      }
      default: {
        assert(`Invalid target mode '${positionMode.left}' specified for paper-menu on X axis.`);
      }
    }

    // sum offsets
    let offsets = dropdown.get('offsets');
    position.top += offsets.top;
    position.left += offsets.left;

    clamp(position, bounds, containerNode);

    let dropdownTop = Math.round(position.top);
    let dropdownLeft = Math.round(position.left);

    let scaleX = Math.round(100 * Math.min(originNodeRect.width / containerNode.offsetWidth, 1.0)) / 100;
    let scaleY = Math.round(100 * Math.min(originNodeRect.height / containerNode.offsetHeight, 1.0)) / 100;

    let style = {
      top: dropdownTop,
      left: dropdownLeft,
      // Animate a scale out if we aren't just repositioning
      transform: !dropdown.didAnimateScale ? `scale(${scaleX}, ${scaleY})` : undefined,
      transformOrigin
    };

    dropdown.setProperties({
      transform: !dropdown.didAnimateScale ? `scale(${scaleX}, ${scaleY})` : undefined,
      transformOrigin
    });

    dropdown.didAnimateScale = true;

    return { style, horizontalPosition: '', verticalPosition: '' };
  }
});
