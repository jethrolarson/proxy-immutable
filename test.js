const test = require('tape-catch')
const {List} = require('./index')

const inc = a => a + 1

test('basic array semantics', t => {
  t.deepEqual(List([1,2]), [1, 2], 'Looks like an array')
  t.equal(List([1, 2])[1], 2, 'can access like array')
  t.deepEqual(List([]), [], 'can create empty array')
  t.deepEqual(List(), [], 'can create empty array via falsy')
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

test('prepend', t => {
  t.deepEqual(List([]).prepend(1), [1], 'can prepend to empty list')
  t.deepEqual(List([0]).prepend(1), [1, 0], 'can prepend to list')
  t.end()
})

test('concat', t => {
  t.deepEqual(List([]).concat([1]), [1], 'can concat to empty list')
  t.deepEqual(List([0]).concat(List([1])), [0, 1], 'can concat to list')
  t.deepEqual([0].concat(List([1])), [0, 1], 'can concat to native list')
  t.end()
})

test('map', t => {
  t.deepEqual(List([]).map(inc), [], 'can map empty list')
  t.deepEqual(List([0, 1]).map(inc), [1, 2], 'can map list')
  t.end()
})

test('pointed functor', t => {
  t.deepEqual(List.of(1), [1])
  t.end()
})
