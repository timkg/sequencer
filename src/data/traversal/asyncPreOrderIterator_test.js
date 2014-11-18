var assert = require('assert');
var AsyncPreOrderIterator = require('./asyncPreOrderIterator');
var Tree = require('../tree');

assert.ok(AsyncPreOrderIterator);

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
                name: 'trainer 1 - item 1 - gap 2',
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

describe('Async PreOrder Tree Traversal Iterator', function () {
  it('asynchronously visits a tree\'s nodes in pre-order - depth left first', function (done) {
    var tree = new Tree(treeData);

    var visitedNodes = [];
    var iterator = new AsyncPreOrderIterator(onVisit, onEnd);
    iterator.start(tree);

    function onVisit(node, cb) {
      visitedNodes.push(node.value.name);
      process.nextTick(cb);
    }

    function onEnd () {
      assert.deepEqual(visitedNodes, [
        'lesson',
        'trainer 1',
        'trainer 1 - item 1',
        'trainer 1 - item 1 - gap 1',
        'trainer 1 - item 1 - gap 2',
        'trainer 1 - item 2',
        'trainer 2',
        'trainer 2 - item 1',
        'trainer 2 - item 2',
        'trainer 2 - item 3'
      ]);
      done();
    }
  })
});
