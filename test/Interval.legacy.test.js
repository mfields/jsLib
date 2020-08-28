import { expect } from 'chai'
import { Interval } from '../Interval.js'

describe('Interval()', function () {
  it('is a function.', function () {
    expect(typeof Interval).to.equal('function')
  })
  it('can be called without the "new" keyword.', function () {
    expect(function () { Interval() }).not.to.throw()
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Interval())).to.equal(true)
    if (typeof Interval().__proto__ === 'object') {
      expect(Object.isFrozen(Interval().__proto__.test)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    var i = Interval()
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
})
describe('Interval(min)', function () {
  it('is optional', function () {
    expect(function () { Interval() }).not.to.throw()
  })
  it('defaults to -Infinity', function () {
    expect(Interval().min).to.equal(-Infinity)
    expect(Interval(NaN).min).to.equal(-Infinity)
  })
  it('may be an integer', function () {
    expect(Interval(123).min).to.equal(123)
  })
  it('may be have a decimal', function () {
    expect(Interval(1.23).min).to.equal(1.23)
  })
  it('does not coerce types', function () {
    expect(Interval('123').min).to.equal(-Infinity)
    expect(Interval(null).min).to.equal(-Infinity)
    expect(Interval(false).min).to.equal(-Infinity)
    expect(Interval(true).min).to.equal(-Infinity)
  })
})
describe('Interval(min, max)', function () {
  it('is optional', function () {
    expect(function () { Interval(123) }).not.to.throw()
  })
  it('defaults to Infinity', function () {
    expect(Interval(123).max).to.equal(Infinity)
    expect(Interval(123, NaN).max).to.equal(Infinity)
  })
  it('may be an integer', function () {
    expect(Interval(1, 123).max).to.equal(123)
  })
  it('may be have a decimal', function () {
    expect(Interval(1, 1.23).max).to.equal(1.23)
  })
  it('does not coerce types', function () {
    expect(Interval(1, '123').max).to.equal(Infinity)
    expect(Interval(1, null).max).to.equal(Infinity)
    expect(Interval(1, false).max).to.equal(Infinity)
    expect(Interval(1, true).max).to.equal(Infinity)
  })
  it('may be the same value as min', function () {
    expect(Interval(7, 7).min).to.equal(7)
    expect(Interval(7, 7).max).to.equal(7)
  })
  it('swaps places with `min` when it is less than min', function () {
    expect(Interval(100, 2).min).to.equal(2)
  })
})
describe('Interval.prototype.has(n)', function () {
  it('is an instance method.', function () {
    expect(typeof Interval().has).to.equal('function')
  })
  it('returns false when called without parameters', function () {
    expect(Interval().has()).to.equal(false)
  })
  it('returns true for internal values', function () {
    var i = Interval(2, 5)
    expect(i.has(3)).to.equal(true)
    expect(i.has(4)).to.equal(true)
  })
  it('returns true for endpoints', function () {
    var i = Interval(2, 5)
    expect(i.has(2)).to.equal(true)
    expect(i.has(5)).to.equal(true)
  })
  it('returns false for values outside of the interval', function () {
    var i = Interval(2, 5)
    expect(i.has(-1)).to.equal(false)
    expect(i.has(13)).to.equal(false)
  })
  it('returns true for internal values when bounds are equal', function () {
    var i = Interval(2, 2)
    expect(i.has(2)).to.equal(true)
  })
  it('returns false for external values when bounds are equal', function () {
    var i = Interval(2, 2)
    expect(i.has(1)).to.equal(false)
    expect(i.has(3)).to.equal(false)
  })
})
