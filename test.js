const test = require('tape-catch')
const {List} = require('./index')

test('basic array semantics', t => {
  t.deepEqual(List([1,2]), [1, 2], 'Looks like an array')
  t.equal(List([1, 2])[1], 2, 'can access like array')
  t.deepEqual(List([]), [], 'can create empty array')
  t.end()
})

test('disallowed methods', t => {
  const disallowed = 'push pop shift unshift splice'.split(' ')
  t.plan(disallowed.length)
  disallowed.forEach(methodName => t.throws(() => List([])[methodName], methodName + ' should throw'))
})

test('append', t => {
  t.deepEqual(List([]).append(1), [1], 'can append to empty list')
  t.deepEqual(List([0]).append(1), [0, 1], 'can append to list')
  t.end()
})
