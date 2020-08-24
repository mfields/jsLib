function isNumber (n) {
  return typeof n === 'number' && n === Number(n)
}

function makeInstanceOf (constructor, args) {
  args = Array.prototype.slice.call(args)
  return new (Function.prototype.bind.apply(constructor, [null].concat(args)))
}

module.exports = { isNumber, makeInstanceOf }
