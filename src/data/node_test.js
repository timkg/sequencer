var assert = require('assert');
var Node = require('./node');

describe('Node', function () {
  it('sets value', function () {
    var n = new Node({
      name: 'testNode'
    });
    assert.equal(n.value.name, 'testNode');
  });
  it('adds children', function () {
    var n = new Node();
    var child = new Node();

    n.addChild(child);

    assert(child.parent === n);
    assert(n.children[0] === child);
  })
});
