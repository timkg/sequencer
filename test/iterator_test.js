var assert = require('assert');
var Iterator = require('../src/iterator');

assert.ok(Iterator);

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
var iterator = new Iterator(function (node) {
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