'use strict';

function makeButton(text, fulfill) {
  var btn = document.createElement('button');
  btn.textContent = text;
  document.body.appendChild(btn);
  btn.addEventListener('click', function () {
    fulfill(btn);
  });
}

new Sequence()
  .register(function (fulfill) {
    makeButton('next1', fulfill);
  })
  .register(function (fulfill) {
    makeButton('next2', fulfill);
  })
  .register(function (fulfill) {
    makeButton('finish', fulfill);
  })
  .start(function () {
    console.log('done')
  });