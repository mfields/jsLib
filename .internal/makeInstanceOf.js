export function makeInstanceOf (constructor, args) {
  args = Array.prototype.slice.call(args)
  var Maker = Function.prototype.bind.apply(constructor, [null].concat(args))
  return new Maker()
}
