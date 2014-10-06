var assert = require('assert');
var Node = require('./node');

assert.ok(Node);

var n = new Node({
  name: 'testNode'
});

assert.equal(n.name, 'testNode');
assert.ok(n.addChild);

var child = {};

n.addChild(child);

assert(child.parent === n);
assert(n.children[0] === child);

console.log('ok');