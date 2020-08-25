const { expect } = require('chai')
const { Interval } = require('../Interval.js')

describe('Interval()', () => {
  it('is a function.', () => {
    expect(typeof Interval).to.equal('function')
  })
  it('can be called without the "new" keyword.', () => {
    expect(() => { Interval() }).not.to.throw()
  })
})
describe('Interval(min)', () => {
  it('is optional', () => {
    expect(() => { Interval() }).not.to.throw()
  })
  it('defaults to -Infinity', () => {
    expect(Interval().min).to.equal(-Infinity)
    expect(Interval(NaN).min).to.equal(-Infinity)
  })
  it('may be an integer', () => {
    expect(Interval(123).min).to.equal(123)
  })
  it('may be have a decimal', () => {
    expect(Interval(1.23).min).to.equal(1.23)
  })
  it('does not coerce types', () => {
    expect(Interval('123').min).to.equal(-Infinity)
    expect(Interval(null).min).to.equal(-Infinity)
    expect(Interval(false).min).to.equal(-Infinity)
    expect(Interval(true).min).to.equal(-Infinity)
  })
})
describe('Interval(min, max)', () => {
  it('is optional', () => {
    expect(() => { Interval(123) }).not.to.throw()
  })
  it('defaults to Infinity', () => {
    expect(Interval(123).max).to.equal(Infinity)
    expect(Interval(123, NaN).max).to.equal(Infinity)
  })
  it('may be an integer', () => {
    expect(Interval(1, 123).max).to.equal(123)
  })
  it('may be have a decimal', () => {
    expect(Interval(1, 1.23).max).to.equal(1.23)
  })
  it('does not coerce types', () => {
    expect(Interval(1, '123').max).to.equal(Infinity)
    expect(Interval(1, null).max).to.equal(Infinity)
    expect(Interval(1, false).max).to.equal(Infinity)
    expect(Interval(1, true).max).to.equal(Infinity)
  })
  it('may be the same value as min', () => {
    expect(Interval(7, 7).min).to.equal(7)
    expect(Interval(7, 7).max).to.equal(7)
  })
  it('swaps places with `min` when it is less than min', () => {
    expect(Interval(100, 2).min).to.equal(2)
  })
})
describe('Interval.prototype.has(n)', () => {
  it('is an instance method.', () => {
    expect(typeof Interval().has).to.equal('function')
  })
  it('returns false when called without parameters', () => {
    expect(Interval().has()).to.equal(false)
  })
  it('returns true for internal values', () => {
    var i = Interval(2, 5)
    expect(i.has(3)).to.equal(true)
    expect(i.has(4)).to.equal(true)
  })
  it('returns true for endpoints', () => {
    var i = Interval(2, 5)
    expect(i.has(2)).to.equal(true)
    expect(i.has(5)).to.equal(true)
  })
  it('returns false for values outside of the interval', () => {
    var i = Interval(2, 5)
    expect(i.has(-1)).to.equal(false)
    expect(i.has(13)).to.equal(false)
  })
  it('returns true for internal values when bounds are equal', () => {
    var i = Interval(2, 2)
    expect(i.has(2)).to.equal(true)
  })
  it('returns false for external values when bounds are equal', () => {
    var i = Interval(2, 2)
    expect(i.has(1)).to.equal(false)
    expect(i.has(3)).to.equal(false)
  })
})
