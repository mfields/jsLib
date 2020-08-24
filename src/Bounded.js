const { isNumber, makeInstanceOf } = require('./helpers.js')
const { Interval } = require('./Interval.js')

function Bounded () {
  if (!(this instanceof Bounded)) {
    return makeInstanceOf(Bounded, arguments)
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

  Object.defineProperty(this, 'min', { get: function () { return interval.min } })
  Object.defineProperty(this, 'max', { get: function () { return interval.max } })

  this._interval = interval
  this.value = value
}

Bounded.prototype.has = function (n) {
  return isNumber(n) ? this.min <= n && n <= this.max : false
}

Bounded.prototype.project = function () {
  var v
  var a = this
  var b = parseInterval(arguments)

  if (a.min === b.min && a.max === b.max) {
    return this
  } else {
    v = ((a.value - a.min) * (b.max - b.min) / (a.max - a.min) ) + b.min
    return Bounded(v, b)
  }
}

Bounded.prototype.valueOf = function () {
  return this.value
}

function parseInterval (args) {
  if (args.length === 2 ) {
    return Interval(args[0], args[1])
  } else if (args.length === 1 && args[0] instanceof Interval) {
    return args[0]
  } else if (args.length === 1 && typeof args[0] === 'object') {
    return Interval(args[0].min, args[0].max)
  } else {
    return Interval()
  }
}

exports.Bounded = Bounded
