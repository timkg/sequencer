var extend = require('util-extend');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var State = require('./state');

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

  function from (stateName, leaveCb) {
    if (!this.states[stateName]) {
      this.states[stateName] = new State({
        name: stateName
      });
    }

    if (typeof leaveCb === 'function') {
      this.states[stateName].on('leave', leaveCb);
    }

    startState = this.states[stateName];

    return this;
  }

  function on (eventName) {
    transitionEvent = eventName;

    return this;
  }

  function to (stateName, enterCb) {
    if (!this.states[stateName]) {
      this.states[stateName] = new State({
        name: stateName
      });
    }

    if (typeof enterCb === 'function') {
      this.states[stateName].on('enter', enterCb);
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
