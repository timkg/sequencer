var extend = require('util-extend');
var State = require('../src/state');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function StateMachine () {
  this.states = {
    unstarted: new State({
      name: 'unstarted'
    })
  };
  this.currentState = this.states.unstarted;
}

EventEmitter.call(this);

extend(StateMachine.prototype, (function () {
  var startState, transitionEvent, nextState;

  function from (stateName) {
    if (!this.states[stateName]) {
      this.states[stateName] = new State({
        name: stateName
      });
    }

    startState = this.states[stateName];

    return this;
  }

  function on (eventName) {
    transitionEvent = eventName;

    return this;
  }

  function to (stateName) {
    if (!this.states[stateName]) {
      this.states[stateName] = new State({
        name: stateName
      });
    }

    nextState = this.states[stateName];

    startState.on(transitionEvent, (function (startState, transitionEvent, nextState, stateMachine) {
      return function () {
        startState.emit('leave');
        nextState.emit('enter');
        stateMachine.currentState = nextState;
      }
    }(startState, transitionEvent, nextState, this)));

    startState = transitionEvent = nextState = undefined;

    return this;
  }

  function emit (eventName) {
    this.currentState.emit(eventName);
  }

  return {
    from: from,
    on: on,
    to: to,
    emit: emit
  };

}()));

module.exports = StateMachine;
