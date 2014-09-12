var assert = require('assert');
var AsyncIterator = require('../src/asyncIterator');
var Tree = require('../src/tree');

assert.ok(AsyncIterator);

var treeData = {
  root: {
    name: 'lesson',
    children: [
      {
        name: 'trainer 1',
        children: [
          {
            name: 'trainer 1 - item 1',
            children: [
              {
                name: 'trainer 1 - item 1 - gap 1',
                children: []
              },
              {
                name: 'trainer 1 - item 2 - gap 2',
                children: []
              }
            ]
          },
          {
            name: 'trainer 1 - item 2',
            children: []
          }
        ]
      },
      {
        name: 'trainer 2',
        children: [
          {
            name: 'trainer 2 - item 1',
            children: []
          },
          {
            name: 'trainer 2 - item 2',
            children: []
          },
          {
            name: 'trainer 2 - item 3',
            children: []
          }
        ]
      }
    ]
  }
};

var tree = new Tree(treeData);

var visitedNodes = [];
var iterator = new AsyncIterator(onVisit, onEnd);
iterator.start(tree);

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
    'trainer 1 - item 2 - gap 2',
    'trainer 1 - item 2',
    'trainer 2',
    'trainer 2 - item 1',
    'trainer 2 - item 2',
    'trainer 2 - item 3'
  ]);
  console.log('ok');
}