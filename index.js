'use strict'

var id = -1

/*
 * Constructor
 * @param mixed n Value representing a number.
 */
var Range = function (interval, value) {
  var a = 0
  var b = 0

  this.id = ++id
  this.input = undefined
  this.output = []

  if (typeof interval === 'object' && 0 in interval && 1 in interval) {
    a = this.forceFloat(interval[0])
    b = this.forceFloat(interval[1])
  }

  if (b < a) {
    this.a = b
    this.b = a
  } else {
    this.a = a
    this.b = b
  }

  if (typeof value === 'undefined') {
    this.value = this.a
  } else {
    value = this.forceFloat(value)
    if (value < a) {
      this.value = a
    } else if (value > b) {
      this.value = b
    } else {
      this.value = value
    }
  }

  this.type = this.a === this.b ? 'empty' : 'bounded'
}

/*
  * Force an unknown value to be a float.
  *
  * @param mixed n Value representing a number.
  * @return float
  */
Range.prototype.forceFloat = function (n) {
  if (typeof n === 'object' && typeof n.length !== 'undefined') {
    n = n.length
  }

  n = parseFloat(n)

  if (isNaN(n)) {
    n = 0
  }

  return n
}

/**
 * Get a string representation of a Range.
 *
 * @return string Range: min() ≤ val() ≤ max()
 */
Range.prototype.toString = function () {
  return 'Range: ' + this.a + ' ≤ ' + this.value + ' ≤ ' + this.b
}

/**
 * Get the minimum possible value.
 *
 * @return float The possible minimum value.
 */
Range.prototype.min = function () {
  return this.a
}

/**
 * Get the maximum possible value.
 *
 * @return float The possible maximum value.
 */
Range.prototype.max = function () {
  return this.b
}

/**
 * Sync one Range object to another.
 *
 * @param Range The object to sync.
 * @param Range The original object.
 */
Range.prototype.sync = function (obj) {
  if (this.syncedWith(obj) !== false) {
    return this
  }

  if (typeof obj === 'object' && !this.validate(obj)) {
    return this
  }

  this.output.push(obj)
  obj.input = this
  obj.value = ((this.val() - this.min()) * (obj.max() - obj.min()) / (this.max() - this.min())) + obj.min()

  return this
}

/**
 * Is a Range synced?
 *
 * @param Range obj The object to check.
 * @param Boolean | int false if not synced; it's index in this.output if synced.
 */
Range.prototype.syncedWith = function (obj) {
  var o = this.output
  var i = 0

  if (!o.length) { return false }

  for (i = 0; i < o.length; i++) {
    if (o[i].id === obj.id) {
      return i
    }
  }

  return false
}

/**
 * Unsync one Range from another.
 *
 * @param Range obj The object to unsync.
 * @param Range The original object.
 */
Range.prototype.unsync = function (obj) {
  var sub = this.syncedWith(obj)
  if (sub !== false) {
    this.output.splice(sub, 1)
    obj.input = undefined
  }
  return this
}

/**
 * .val() provides public access to the value property.
 *
 * If used without any parameters, .val() will return the
 * current value of the bound range.
 *
 * If a single parameter may be passed to .val() the value
 * property of the bound value will be to this value based
 * on the following conditions:
 *
 * 1. The value must be in the bound value's range. If the
 * new value is less than .min(). the value property will
 * be set to min(). Likewise if the new value is greater
 * than .max() the value property will be set to .max().
 *
 * 2. If the bound value is controlled by another bound
 * value then .val() will not change the value property.
 *
 * .val() will also directly change the value properties
 * of all bound objects that have been synced.
 *
 * @return float|Range
 */
Range.prototype.val = function () {
  var a, b, i, v

  v = arguments[0]

  // Return value property if no parameters were passed.
  if (undefined === v) {
    return this.value
  }

  v = this.forceFloat(v)

  if (typeof this.input === 'object' && this.validate(this.input)) {
    return
  }

  // Change the value property.
  if (v < this.a) {
    this.value = this.a
  } else if (v > this.b) {
    this.value = this.b
  } else {
    this.value = v
  }

  a = this

  // Change all Ranges synced to this one.
  for (i = 0; i < this.output.length; i++) {
    b = this.output[i]
    b.value = ((a.val() - a.min()) * (b.max() - b.min()) / (a.max() - a.min())) + b.min()
  }

  return this
}

/**
 * Test to see if an object looks like a Range.
 *
 * @param mixed obj
 * @return bool
 */
Range.prototype.validate = function (obj) {
  var i
  var properties = [
    'a',
    'b',
    'id',
    'input',
    'output',
    'type',
    'value'
  ]

  // obj must have all necessary properties.
  for (i = 0; i < properties.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(obj, properties[i])) {
      return false
    }
  }

  // The value property must be within range.
  if (obj.value < obj.a || obj.value > obj.b) {
    return false
  }

  // The id property must be in the of all created Range objects.
  if (obj.id < 1 || obj.id > id) {
    return false
  }

  return true
}

exports.Range = Range
