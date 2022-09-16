import axios from 'axios';

function hello(name) {
  document.body.textContent =
    'Hfdgbsbellsdfadsfdfoaerhqehwthwrtjerhheryj, ' +
    name +
    '!';
}
hello('World');

/* globals $ */
function hello2(name) {
  $(document.body).text(
    'Hello, ' + name + '!'
  );
}

hello2('World');

const testFunc = (a, b, c) => {
  const message = 'helloWorld';
  console.log(c, b, a, message);
};

testFunc(1, 2, 3);

this.Request = function () {
  self._DataListReady = false;
  let param = self.prm;
  if (param == null) {
    param = {};
  }
  console.log(JSON.stringify(param));

  axios
    .post(
      '/rs/mapeditor/php/mapeditor.php',
      [param]
    )
    .then(
      (response) =>
        (this.returnData = response)
    );
};

// ブラウザ判定。
const agent =
  window.navigator.userAgent.toLowerCase();
const whichExpand =
  agent.indexOf('edg') !== -1
    ? 'collapsable'
    : 'expandable';
console.log(whichExpand);
