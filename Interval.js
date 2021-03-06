import { freeze } from './.internal/freeze.js'
import { isNumber } from './.internal/isNumber.js'
import { makeInstanceOf } from './makeInstanceOf.js'

/**
 * Interval.
 *
 * @arg {string} Interval notation
 *
 * @since 1.0.0
 */
function Interval (min, max) {
  if (!(this instanceof Interval)) {
    return makeInstanceOf(Interval, arguments)
  }

  var bounds = [
    isNumber(min) && min !== Infinity ? min : -Infinity,
    isNumber(max) && max !== -Infinity ? max : Infinity
  ]

  bounds.sort(function (a, b) { return a - b })

  this.min = bounds[0]
  this.max = bounds[1]

  freeze(this, Interval)
}

Interval.prototype.has = function (n) {
  return isNumber(n) ? this.min <= n && n <= this.max : false
}
Interval.prototype.isFinite = function () {
  return (isFinite(this.min) && isFinite(this.max))
}

export { Interval }
