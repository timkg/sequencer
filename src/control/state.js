var extend = require('util-extend');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function State (props) {
  extend(this, props);
  EventEmitter.call(this);

  this.active = false;
}

util.inherits(State, EventEmitter);

State.prototype.enter = function () {
  this.active = true;
  this.emit('enter');
};

State.prototype.leave = function () {
  this.active = false;
  this.emit('leave');
};

module.exports = State;
