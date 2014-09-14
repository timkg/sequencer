var extend = require('util-extend');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

function State (props) {
  extend(this, props);
  EventEmitter.call(this);

  this.active = false;

  this.on('enter', function () {
    this.active = true;
    console.log('enter:' + this.name);
  });

  this.on('leave', function () {
    this.active = false;
    console.log('leave:' + this.name);
  });
}

util.inherits(State, EventEmitter);

module.exports = State;
