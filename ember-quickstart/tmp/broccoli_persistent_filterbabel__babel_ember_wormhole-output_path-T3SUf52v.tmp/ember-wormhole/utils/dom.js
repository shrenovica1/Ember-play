define('ember-wormhole/utils/dom', ['exports', 'ember'], function (exports, _ember) {
  exports.getActiveElement = getActiveElement;
  exports.findElementById = findElementById;
  exports.getDOM = getDOM;

  var getOwner = _ember['default'].getOwner;

  function getActiveElement() {
    if (typeof document === 'undefined') {
      return null;
    } else {
      return document.activeElement;
    }
  }

  function childNodesOfElement(element) {
    var children = [];
    var child = element.firstChild;
    while (child) {
      children.push(child);
      child = child.nextSibling;
    }
    return children;
  }

  function findElementById(doc, id) {
    if (doc.getElementById) {
      return doc.getElementById(id);
    }

    var nodes = childNodesOfElement(doc);
    var node = undefined;

    while (nodes.length) {
      node = nodes.shift();

      if (node.getAttribute && node.getAttribute('id') === id) {
        return node;
      }

      nodes = childNodesOfElement(node).concat(nodes);
    }
  }

  // Private Ember API usage. Get the dom implementation used by the current
  // renderer, be it native browser DOM or Fastboot SimpleDOM

  function getDOM(context) {
    var container = getOwner ? getOwner(context) : context.container;
    var documentService = container.lookup('service:-document');

    if (documentService) {
      return documentService;
    }

    var renderer = container.lookup('renderer:-dom');

    if (renderer._dom && renderer._dom.document) {
      // pre Ember 2.6
      return renderer._dom.document;
    } else {
      throw new Error('ember-wormhole could not get DOM');
    }
  }
});
/*
 * Implement some helpers methods for interacting with the DOM,
 * be it Fastboot's SimpleDOM or the browser's version.
 */