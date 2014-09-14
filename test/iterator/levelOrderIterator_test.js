var assert = require('assert');
var LevelOrderIterator = require('../../src/iterator/levelOrderIterator');

assert.ok(LevelOrderIterator);

var tree = {
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

var visitedNodes = [];
var iterator = new LevelOrderIterator(function (node) {
  visitedNodes.push(node.name);
});

iterator.start(tree);

assert.deepEqual(visitedNodes, [
  'lesson',
  'trainer 1',
  'trainer 2',
  'trainer 1 - item 1',
  'trainer 1 - item 2',
  'trainer 2 - item 1',
  'trainer 2 - item 2',
  'trainer 2 - item 3',
  'trainer 1 - item 1 - gap 1',
  'trainer 1 - item 2 - gap 2'
]);

console.log('ok');
