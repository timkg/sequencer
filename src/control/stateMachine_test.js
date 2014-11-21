var StateMachine = require('./stateMachine');
var assert = require('assert');

describe('StateMachine', function () {
  it('starts in unstarted state', function () {
    var stateMachine = new StateMachine();
    assert.equal(stateMachine.currentState.name, 'unstarted');
  });
  it('registers state transitions', function () {
    var stateMachine = new StateMachine();
    stateMachine
      .from('unstarted')
      .on('start')
      .to('started');

    assert(stateMachine.states.started);
  });
  it('executes state transitions when the correct event is provided', function () {
    var stateMachine = new StateMachine();

    stateMachine
      .from('unstarted')
      .on('start')
      .to('started');

    stateMachine.emit('start');

    assert.equal(stateMachine.currentState.name, 'started');
  });
  it('does not execute state transitions when the event does not match current state', function () {
    var stateMachine = new StateMachine();

    stateMachine
      .from('unstarted')
      .on('start')
      .to('started');

    stateMachine
      .from('started')
      .on('stop')
      .to('stopped');

    assert.equal(stateMachine.currentState.name, 'unstarted');

    stateMachine.emit('stop');

    assert.equal(stateMachine.currentState.name, 'unstarted');
  });
  it('attaches leave callbacks with from', function () {
    var stateMachine = new StateMachine();
    var flag = false;

    stateMachine
      .from('unstarted', function () { flag = true; })
      .on('start')
      .to('started');

    stateMachine.emit('start');

    assert.equal(flag, true);
  });
  it('attaches enter callbacks with to', function () {
    var stateMachine = new StateMachine();
    var flag = false;

    stateMachine
      .from('unstarted')
      .on('start')
      .to('started', function () { flag = true; });

    stateMachine.emit('start');

    assert.equal(flag, true);
  });
});

