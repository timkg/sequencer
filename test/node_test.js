var assert = require('assert');
var Node = require('../src/node');

assert.ok(Node);

var n = new Node();

assert.ok(n.addChild);

var child = {};

n.addChild(child);

assert(child.parent === n);
assert(n.children[0] === child);