var assert = require('assert');
var AsyncIterator = require('../src/asyncIterator');
var Node = require('../src/node');

assert.ok(AsyncIterator);


// TODO - tree builder
var lesson = new Node({
  name: 'lesson'
});

var trainer1 = new Node({
  name: 'trainer 1'
});
lesson.addChild(trainer1);

var trainer1item1 = new Node({
  name: 'trainer 1 - item 1'
});
trainer1.addChild(trainer1item1);

var trainer1item1gap1 = new Node({
  name: 'trainer 1 - item 1 - gap 1'
});
trainer1item1.addChild(trainer1item1gap1);

var trainer1item2 = new Node({
  name: 'trainer 1 - item 2'
});
trainer1.addChild(trainer1item2);

var trainer1item3 = new Node({
  name: 'trainer 1 - item 3'
});
trainer1.addChild(trainer1item3);

var trainer1item3gap1 = new Node({
  name: 'trainer 1 - item 3 - gap 1'
});
trainer1item3.addChild(trainer1item3gap1);

var trainer1item3gap2 = new Node({
  name: 'trainer 1 - item 3 - gap 2'
});
trainer1item3.addChild(trainer1item3gap2);

var visitedNodes = [];
var iterator = new AsyncIterator(onVisit, onEnd);
iterator.start({
  root: lesson
});

function onVisit(node, cb) {
  visitedNodes.push(node.name);
  process.nextTick(cb);
}

function onEnd () {
  assert.deepEqual(visitedNodes, [
    'lesson',
    'trainer 1',
    'trainer 1 - item 1',
    'trainer 1 - item 1 - gap 1',
    'trainer 1 - item 2',
    'trainer 1 - item 3',
    'trainer 1 - item 3 - gap 1',
    'trainer 1 - item 3 - gap 2'
  ]);
  console.log('ok');
}