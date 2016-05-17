//<helpers>

//:: [a] -> [a]
const cloneArray = ar => ar.slice(0)

//:: [a] -> a -> List a
const appendTo = ar => v => List(ar.concat([v]))

//:: [a] -> a -> List a
const prependTo = ar => v => List([v].concat(ar))

//:: [a] -> (a -> b) -> [b]
const mapTo = ar => f => List(ar.map(f))

//:: [a] -> Int -> a -> [a]
const updateTo = ar => (i, v) => {
  if(i >= ar.length) throw new RangeError(`index '${i}' is not in array`)
  const copy = cloneArray(ar)
  copy[i] = v
  return List(copy)
}
//</helpers>

// List :: [a] -> List a
const List = (ar = []) => new Proxy(ar, {
  get(target, prop){ // eslint-disable-line complexity
    switch(prop){
      case 'update':
        return updateTo(target)
      case 'map':
        return mapTo(target)
      case 'conj':
      case 'append':
        return appendTo(target)
      case 'cons':
      case 'prepend':
        return prependTo(target)
      // disallowed methods
      case 'push':
      case 'pop':
      case 'shift':
      case 'unshift':
      case 'splice':
        throw new TypeError(`List does not allow method \`${prop}\``)

      default:
        return target[prop]
    }
  }
  , set(){
    throw new TypeError('List is not mutable. Use `update` method to return modified copy')
  }
})

module.exports = {
  List
}
