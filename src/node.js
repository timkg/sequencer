var extend = require('util-extend');

function Node (props) {
  this.children = [];
  extend(this, props);
}

extend(Node.prototype, {
  addChild: function (child) {
    child.parent = this;
    this.children.push(child);
  }
});

module.exports = Node;