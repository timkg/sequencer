'use strict';

var Step = require('./step');

/**
 * Series of potentially asynchronous Steps.
 * @constructor
 */
function Sequence () {
  this.chain = [];
  this.index = 0;
  return this;
}

/**
 * Add Step to the Sequence.
 * Accepts callback function which is wrapped in a new Step instance.
 * @param cb {function(fulfill, reject)}
 */
Sequence.prototype.register = function (cb) {
  this.chain.push(new Step(cb));
  return this;
};

/**
 * Start sequence by calling steps in order of registration.
 * @param onComplete {function} Called when all steps are done.
 */
Sequence.prototype.start = function (onComplete) {
  this.onComplete = onComplete || function () {};
  this.next();
};

/**
 * Used internally for flow control.
 * Either starts current step or calls onComplete handler registered with Sequence.start().
 */
Sequence.prototype.next = function () {
  var step = this.chain[this.index];
  if (step) {
    step.start().then(this.next.bind(this));
  } else {
    this.onComplete();
  }
  this.index++;
};

module.exports = Sequence;