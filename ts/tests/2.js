const test = require('tape');
const { exactlyTwoOfAnyLetter } = require('../dist/solutions/2');

test('Exactly two of any letter', t => {
  t.plan(10);
  t.ok(exactlyTwoOfAnyLetter('aa'));
  t.notOk(exactlyTwoOfAnyLetter('ab'));
  t.notOk(exactlyTwoOfAnyLetter('aaa'));
  t.notOk(exactlyTwoOfAnyLetter('abcdef'));
  t.ok(exactlyTwoOfAnyLetter('bababc'));
  t.ok(exactlyTwoOfAnyLetter('abbcde'));
  t.notOk(exactlyTwoOfAnyLetter('abcccd'));
  t.ok(exactlyTwoOfAnyLetter('aabcdd'));
  t.ok(exactlyTwoOfAnyLetter('abcdee'));
  t.notOk(exactlyTwoOfAnyLetter('ababab'));
});
