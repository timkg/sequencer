'use strict';

/**
 * Series of potentially asynchronous Steps.
 * @constructor
 */
function Sequence () {
  this.chain = [];
  this.index = 0;
}

/**
 * Add Step to the Sequence.
 * @param step {Step}
 */
Sequence.prototype.registerStep = function (step) {
  this.chain.push(step);
};

/**
 * Start sequence by calling steps in order of registration.
 * @param onComplete {function} Called when all steps are done.
 */
Sequence.prototype.start = function (onComplete) {
  this.onComplete = onComplete || function () {};
  this.next('sequence started');
};

/**
 * Used internally for flow control.
 * Either starts current step or onComplete handler registered with Sequence.start().
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