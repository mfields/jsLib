import { freeze } from './.internal/freeze.js'
import { isNumber } from './.internal/isNumber.js'
import { makeInstanceOf } from './makeInstanceOf.js'
import { Interval } from './Interval.js'

/**
 * Create a number that has an upper an lower bound.
 *
 * @arg {number} value - The number.
 * @arg {number} min - The lower bound. The value will never fall below this number.
 * @arg {number} max - The upper bound. The value will never rise above this number.
 *
 * @also
 *
 * @arg {number} value - The number.
 * @arg {Interval|object} interval - An object that has a `min` and `max` property.
 *
 * @return BoundNumber
 */
function BoundNumber () {
  if (!(this instanceof BoundNumber)) {
    return makeInstanceOf(BoundNumber, arguments)
  }

  var args = Array.prototype.slice.call(arguments)
  var head = args.slice(0, 1)
  var tail = args.slice(1)
  var interval = parseInterval(tail)
  var value

  if (isNumber(head[0]) && interval.min <= head[0] && head[0] <= interval.max) {
    value = head[0]
  } else if (isFinite(interval.min)) {
    if (isNumber(head[0])) {
      value = head[0] < interval.min ? interval.min : interval.max
    } else {
      value = interval.min
    }
  } else {
    value = null
  }

  this.value = value
  this.min = interval.min
  this.max = interval.max

  Object.defineProperty(this, '_interval', {
    value: interval
  })

  freeze(this, BoundNumber)
}

BoundNumber.prototype.has = function (n) {
  return this._interval.has(n)
}

BoundNumber.prototype.project = function () {
  var v
  var a = this
  var b = parseInterval(arguments)

  if (a.min === b.min && a.max === b.max) {
    return this
  } else {
    v = ((a.value - a.min) * (b.max - b.min) / (a.max - a.min)) + b.min
    return BoundNumber(v, b)
  }
}

BoundNumber.prototype.valueOf = function () {
  return this.value
}

function parseInterval (args) {
  if (args.length === 2) {
    return Interval(args[0], args[1])
  } else if (args.length === 1 && args[0] instanceof Interval) {
    return args[0]
  } else if (args.length === 1 && typeof args[0] === 'object') {
    return Interval(args[0].min, args[0].max)
  } else {
    return Interval()
  }
}

export { BoundNumber }
