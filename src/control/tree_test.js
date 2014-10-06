var assert = require('assert');
var Tree = require('./tree');
var Node = require('./node');
var Iterator = require('./iterator/preOrderIterator');

assert.ok(Tree);

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
var iterator = new Iterator(function (node) {
  assert(node.constructor === Node);
  visitedNodes.push(node.name);
});

iterator.start(tree);

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
