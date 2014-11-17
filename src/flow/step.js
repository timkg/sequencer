'use strict';
var Promise = require('es6-promise').Promise;

/**
 * * A unit of operation which might be asynchronous.
 * Can be chained with other Steps to form a Sequence.
 * cb must accept Promise-compliant fulfill handler.
 * @param cb {function(fulfill, reject)}
 * @constructor
 */
function Step (cb) {
  this.cb = cb;
}

/**
 * Start Step execution.
 * Used internally by Sequence.
 * @returns {Promise}
 */
Step.prototype.start = function () {
  return new Promise(this.cb);
};

module.exports = Step;