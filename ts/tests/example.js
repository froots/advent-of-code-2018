const test = require('tape');
const { greeter } = require('../dist/example');

test('Greeter', t => {
  t.plan(1);
  t.equal(greeter('Jim'), 'Hello Jim');
});
