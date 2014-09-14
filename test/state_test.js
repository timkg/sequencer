var State = require('../src/state');
var assert = require('assert');

assert.ok(State);

var s = new State({
  name: 'myState'
});

assert.equal(s.name, 'myState');

assert.ok(s.emit('enter'));
assert.ok(s.emit('leave'));

console.log('ok');
