var extend = require('util-extend');

function Node (value) {
  this.children = [];
  this.value = value;
}

extend(Node.prototype, {
  addChild: function (child) {
    child.parent = this;
    this.children.push(child);
  }
});

module.exports = Node;