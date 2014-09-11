var extend = require('util-extend');

/**
 * Pre-order Tree traversal iterator
 * @constructor
 */
function Iterator (visitorFn) {
  this.visitorFn = visitorFn;
}

extend(Iterator.prototype, (function () {
  function start (tree) {
    visit.call(this, tree.root);
  }

  function visit (node) {
    this.visitorFn(node);
    node.children.forEach(function (node) {
      visit.call(this, node);
    }, this);
  }

  return {
    start: start
  }
})());

module.exports = Iterator;