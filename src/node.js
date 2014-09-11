var extend = require('util-extend');

function Node () {
  this.children = [];
}

extend(Node.prototype, {
  addChild: function (child) {
    child.parent = this;
    this.children.push(child);
  }
});

module.exports = Node;