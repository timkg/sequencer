var extend = require('util-extend');

/**
 * Asynchronous Pre-order Tree traversal iterator
 * @constructor
 */
function AsyncPreOrderIterator (onVisit, onEnd) {
  this.onVisit = onVisit;
  this.onEnd = onEnd;
}

extend(AsyncPreOrderIterator.prototype, (function () {
  function start (tree) {
    visit(tree.root, this.onVisit, this.onEnd);
  }

  function visit (node, onVisit, onEnd) {
    if (!node) {
      onEnd();
      return;
    }

    node._visited = true;
    onVisit(node, function () {
      visit(next(node), onVisit, onEnd);
    });
  }

  function next(node) {
    // iterating over single root node? we're done.
    if (!node.children.length && !node.parent) {
      return null;
    }

    // reached leaf, continue search at parent
    if (!node.children.length) {
      return next(node.parent);
    }

    // return first unvisited child
    var firstUnvisitedChild;
    node.children.some(function (node) {
      if (!node._visited) {
        firstUnvisitedChild = node;
        return true;
      }
    });
    if (firstUnvisitedChild) {
      return firstUnvisitedChild;
    }

    // all children visited - continue search at parent
    if (node.parent) {
      return next(node.parent);
    }

    // all children visited and can't go further up (back to root) - we're done
    return null;
  }

  return {
    start: start
  }
})());

module.exports = AsyncPreOrderIterator;
