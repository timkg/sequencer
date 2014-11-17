var assert = require('assert');
var Tree = require('../tree');
var LevelOrderIterator = require('./levelOrderIterator');

assert.ok(LevelOrderIterator);

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

describe('LevelOrder Tree Traversal Iterator', function () {
  it('visits a tree\'s nodes in level order - same depth first', function () {
    var tree = new Tree(treeData);
    var visitedNodes = [];
    var iterator = new LevelOrderIterator(function (node) {
      visitedNodes.push(node.value.name);
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
  })
});
