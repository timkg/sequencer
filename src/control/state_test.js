var State = require('./state');
var assert = require('assert');

describe('State', function () {
  it('exposes enter() and leave() methods', function () {
    var s = new State();

    assert.equal(typeof s.enter, 'function');
    assert.equal(typeof s.leave, 'function');
  });
  it('emits enter event on enter()', function (done) {
    var s = new State();
    s.on('enter', function () {
      assert(true);
      done();
    });

    s.enter();
  });
  it('emits leave event on leave()', function (done) {
    var s = new State();
    s.on('leave', function () {
      assert(true);
      done();
    });

    s.leave();
  })
});
