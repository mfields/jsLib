/**
 * Create an instance of a given constructor.
 *
 * @param {function} constructor The function which will be used to create
 *   the object.
 * @param {object} args An array-like object that contains iterable properties.
 *   These properties will be passed as arguments to the constructor function.
 *
 * @return object
 */
export function makeInstanceOf (constructor, args) {
  args = Array.prototype.slice.call(args)
  var Maker = Function.prototype.bind.apply(constructor, [null].concat(args))
  return new Maker()
}
