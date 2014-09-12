var extend = require('util-extend');

/**
 * Level-order Tree traversal iterator
 * @constructor
 */
function LevelOrderIterator (visitorFn) {
  this.visitorFn = visitorFn;
}

extend(LevelOrderIterator.prototype, (function () {
  var nodes = [], tmpNode = null;

  function start (tree) {
    tmpNode = tree.root;
    while (tmpNode) {
      if (tmpNode.children) {
        nodes = nodes.concat(tmpNode.children);
      }
      this.visitorFn(tmpNode);
      tmpNode = nodes.shift();
    }
  }

  return {
    start: start
  }
})());

module.exports = LevelOrderIterator;