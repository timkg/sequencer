var extend = require('util-extend');
var LevelOrderIterator = require('./traversal/levelOrderIterator');
var Node = require('./node');

function Tree (json) {
  this.root = buildTreeNodesFromJson(json)[0];
}

extend(Tree.prototype, {

});

function buildTreeNodesFromJson (json) {
  // first we create an array of Node instances
  var nodes = [], nodeInstanceCreator;
  nodeInstanceCreator = new LevelOrderIterator(function (jsonNode) {
    var n, props = {};

    Object.keys(jsonNode).forEach(function (propertyName) {
      if (propertyName !== 'children') {
        props[propertyName] = jsonNode[propertyName];
      }
    });

    n = new Node(props);
    n._childrenLength = jsonNode.children.length;

    nodes.push(n);
  });
  nodeInstanceCreator.start(json);

  // then we assemble those into parent-child relationship
  var count = 0;
  nodes.forEach(function (node) {
    var i = 0;
    while (i < node._childrenLength) {
      i++;
      node.addChild(nodes[count + i]);
    }
    count += node.children.length;
    delete node._childrenLength;
  });

  return nodes;
}

module.exports = Tree;
