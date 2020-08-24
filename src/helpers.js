function isNumber (n) {
  return typeof n === 'number' && n === Number(n)
}

function makeInstanceOf (constructor, args) {
  args = Array.prototype.slice.call(args)
  var Maker = Function.prototype.bind.apply(constructor, [null].concat(args))
  return new Maker()
}

module.exports = { isNumber, makeInstanceOf }
