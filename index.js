//<helpers>

//:: a -> [a]
const of = a => List([a])

//:: [a] -> [a]
const cloneArray = xs => xs.slice(0)

//:: [a] -> a -> List a
const appendTo = xs => v => List(xs.concat([v]))

//:: [a] -> a -> List a
const prependTo = xs => v => List([v].concat(xs))

//:: [a] -> (a -> b) -> [b]
const mapTo = xs => f => List(xs.map(f))

//:: [a] -> (a -> Boolean) -> [a]
const filterTo = xs => pred => List(xs.filter(pred))

//:: [a] -> (((b, a) -> Boolean), b) -> b
const reduceTo = xs => (f, acc) => List(xs.reduce(f, acc))

//:: [a] -> (((b, a) -> Boolean), b) -> b
const reduceRightTo = xs => (f, acc) => List(xs.reduceRight(f, acc))

//:: [a] -> [a] -> [a]
const concatTo = xs => ys => List(xs.concat(ys))

//:: [a] -> Number -> [a]
//:: [a] -> (Number, Number) -> [a]
//:: [a] -> (Number, Number, Number) -> [a]
const sliceTo = xs => (...args) => List(xs.slice(...args))

//:: [a] -> Int -> a -> [a]
const updateTo = xs => (i, v) => {
  if(i >= xs.length || i < 0) throw new RangeError(`index '${i}' is not in array`)
  const copy = cloneArray(xs)
  copy[i] = v
  return List(copy)
}

const flatten = xs => List(xs.reduce((acc, it) => acc.concat(it), []))

//</helpers>

// List :: [a] -> List a
const List = (ar = []) => new Proxy(ar, {
  get(target, prop){ // eslint-disable-line complexity
    switch(prop){
      case 'update':
        return updateTo(target)
      case 'map':
        return mapTo(target)
      case 'filter':
        return filterTo(target)
      case 'append':
        return appendTo(target)
      case 'prepend':
        return prependTo(target)
      case 'concat':
        return concatTo(target)
      case 'reduce':
        return reduceTo(target)
      case 'reduceRight':
        return reduceRightTo(target)
      case 'slice':
        return sliceTo(target)
      case 'flatten':
        return () => flatten(target)
      //TODO
      case 'insert':
      case 'drop':
      case 'take':
      case 'takeLast':
      case 'dropLast':
      case 'flatMap':
      case 'chain':
      case 'zip':
      case 'sort':
      case 'sortBy':
      case 'reverse':
      case 'delete':
        throw new TypeError(`Method \`${prop}\` has not yet been implemented`)
      // disallowed methods
      case 'push':
      case 'pop':
      case 'shift':
      case 'unshift':
      case 'splice':
      case 'fill':
      case 'copyWithin':
        throw new TypeError(`List does not allow method \`${prop}\``)
      default:
        return target[prop]
    }
  }
  , set(){
    throw new TypeError('List is not mutable. Use `update` method to return modified copy')
  }
})

Object.assign(List, {of, appendTo, prependTo, updateTo, mapTo, filterTo, reduceTo, concatTo})

module.exports = {
  List
}
