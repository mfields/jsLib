import { expect } from 'chai'
import { isSameScalarArray } from './helpers/general'
import { BoundNumber } from '../BoundNumber.js'

describe('BoundNumber()', function () {
  it('is a function.', function () {
    expect(typeof BoundNumber).to.equal('function')
  })
  it('can be called without the "new" keyword.', function () {
    expect(() => { BoundNumber() }).not.to.throw()
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(BoundNumber())).to.equal(true)
    if (typeof BoundNumber().__proto__ === 'object') {
      expect(Object.isFrozen(BoundNumber().__proto__.test)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    BoundNumber()
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
  it('has enumerable key: value, min, and max.', function () {
    var keys = Object.keys(BoundNumber())
    var expected = ["value", "min", "max"]
    expect(isSameScalarArray(keys, expected)).to.equal(true)
  })
  it('creates a default instance when passed no parameters', function () {
    expect(BoundNumber().min).to.equal(-Infinity)
    expect(BoundNumber().max).to.equal(Infinity)
    expect(BoundNumber().value).to.equal(null)
  })
})
describe('BoundNumber(value)', function () {
  it('is optional', function () {
    expect(() => { BoundNumber() }).not.to.throw()
  })
  it('is null when undefined', function () {
    expect(BoundNumber().value).to.equal(null)
  })
  it('is null when is NaN', function () {
    expect(BoundNumber(NaN).value).to.equal(null)
  })
  it('may be an integer', function () {
    expect(BoundNumber(123).value).to.equal(123)
  })
  it('may be have a decimal', function () {
    expect(BoundNumber(1.23).value).to.equal(1.23)
  })
  it('does not coerce types', function () {
    expect(BoundNumber('123').value).to.equal(null)
    expect(BoundNumber(null).value).to.equal(null)
    expect(BoundNumber(false).value).to.equal(null)
    expect(BoundNumber(true).value).to.equal(null)
  })
})
describe('BoundNumber(value, interval)', function () {
  var b = BoundNumber(17, { min: 2, max: 100 })
  it('sets min property', function () {
    expect(b.min).to.equal(2)
  })
  it('sets max property', function () {
    expect(b.max).to.equal(100)
  })
  it('sets value property', function () {
    expect(b.value).to.equal(17)
  })
})
describe('BoundNumber(value, min, max)', function () {
  var b = BoundNumber(17, 2, 100)
  it('sets min property', function () {
    expect(b.min).to.equal(2)
  })
  it('sets max property', function () {
    expect(b.max).to.equal(100)
  })
  it('sets value property', function () {
    expect(b.value).to.equal(17)
  })
})
describe('BoundNumber() - behavior', function () {
  it('is null when lower bound is infinite', function () {
    expect(BoundNumber(undefined, -Infinity, Infinity).value).to.equal(null)
  })
  it('is value of lower bound when lower bound is finite', function () {
    expect(BoundNumber(undefined, 4, 8).value).to.equal(4)
  })
  it('may be the lower bound', function () {
    expect(BoundNumber(3, 3, 5).value).to.equal(3)
  })
  it('may be the upper bound', function () {
    expect(BoundNumber(5, 3, 5).value).to.equal(5)
  })
  it('may be an internal value within the interval', function () {
    expect(BoundNumber(4, 4, 8).value).to.equal(4)
  })
  it('snaps out-of-range numbers to nearest bound', function () {
    expect(BoundNumber(2, 3, 5).value).to.equal(3)
    expect(BoundNumber(1, 3, 5).value).to.equal(3)
    expect(BoundNumber(6, 3, 5).value).to.equal(5)
    expect(BoundNumber(7, 3, 5).value).to.equal(5)
  })
  it('can be used as a number', function () {
    expect(BoundNumber(97, 30, 120) + 5).to.equal(102)
  })
})
describe('BoundNumber.prototype.project', function () {
  it('is an instance method', function () {
    expect(typeof BoundNumber().project).to.equal('function')
  })
  it('accepts an object as the first parameter', function () {
    var a = BoundNumber(3, { min: 2, max: 4}).project({ min: 5, max: 7})
    expect(a.min).to.equal(5)
    expect(a.max).to.equal(7)
    expect(a.value).to.equal(6)
  })
  it('accepts min and max as first and second parameter.', function () {
    var a = BoundNumber(3, 2, 4).project({ min: 5, max: 7})
    expect(a.min).to.equal(5)
    expect(a.max).to.equal(7)
    expect(a.value).to.equal(6)
  })
})
describe('BoundNumber.prototype.project() - behavior', function () {
  it('returns self when same interval is provided', function () {
    var a = BoundNumber(3, 2, 4)
    var b = a.project(2, 4)
    expect(a).to.equal(b)
  })
  it('projects 3 from [2, 4] to [5, 7]', function () {
    expect(BoundNumber(3, 2, 4).project(5, 7).value).to.equal(6)
  })
  it('projects center value to larger interval', function () {
    expect(BoundNumber(3, 2, 4).project(1, 5).value).to.equal(3)
  })
  it('retains lower bound', function () {
    expect(BoundNumber(1, 1, 5).project(1, 9).value).to.equal(1)
  })
  it('snaps upper bound to new upper bound', function () {
    expect(BoundNumber(5, 1, 5).project(1, 9).value).to.equal(9)
  })
})
