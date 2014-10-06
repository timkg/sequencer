var StateMachine = require('./stateMachine');
var assert = require('assert');

assert.ok(StateMachine);

var stateMachine = new StateMachine();

stateMachine
  .from('unstarted')
  .on('play')
  .to('playing');

stateMachine
  .from('playing')
  .on('pause')
  .to('paused');

stateMachine
  .from('paused')
  .on('play')
  .to('playing');

assert.equal(stateMachine.currentState.name, 'unstarted');

stateMachine.emit('pause');
assert.equal(stateMachine.currentState.name, 'unstarted');

stateMachine.emit('play');
assert.equal(stateMachine.currentState.name, 'playing');

stateMachine.emit('pause');
assert.equal(stateMachine.currentState.name, 'paused');

stateMachine.emit('play');
assert.equal(stateMachine.currentState.name, 'playing');

console.log('ok');
