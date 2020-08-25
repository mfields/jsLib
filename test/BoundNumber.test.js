const { expect } = require('chai')
const { BoundNumber } = require('../BoundNumber.js')

describe('BoundNumber()', () => {
  it('is a function.', () => {
    expect(typeof BoundNumber).to.equal('function')
  })
  it('can be called without the "new" keyword.', () => {
    expect(() => { BoundNumber() }).not.to.throw()
  })
  it('creates a default instance when passed no parameters', () => {
    expect(BoundNumber().min).to.equal(-Infinity)
    expect(BoundNumber().max).to.equal(Infinity)
    expect(BoundNumber().value).to.equal(null)
  })
})
describe('BoundNumber(value)', () => {
  it('is optional', () => {
    expect(() => { BoundNumber() }).not.to.throw()
  })
  it('is null when undefined', () => {
    expect(BoundNumber().value).to.equal(null)
  })
  it('is null when is NaN', () => {
    expect(BoundNumber(NaN).value).to.equal(null)
  })
  it('may be an integer', () => {
    expect(BoundNumber(123).value).to.equal(123)
  })
  it('may be have a decimal', () => {
    expect(BoundNumber(1.23).value).to.equal(1.23)
  })
  it('does not coerce types', () => {
    expect(BoundNumber('123').value).to.equal(null)
    expect(BoundNumber(null).value).to.equal(null)
    expect(BoundNumber(false).value).to.equal(null)
    expect(BoundNumber(true).value).to.equal(null)
  })
})
describe('BoundNumber(value, interval)', () => {
  var b = BoundNumber(17, { min: 2, max: 100 })
  it('sets min property', () => {
    expect(b.min).to.equal(2)
  })
  it('sets max property', () => {
    expect(b.max).to.equal(100)
  })
  it('sets value property', () => {
    expect(b.value).to.equal(17)
  })
})
describe('BoundNumber(value, min, max)', () => {
  var b = BoundNumber(17, 2, 100)
  it('sets min property', () => {
    expect(b.min).to.equal(2)
  })
  it('sets max property', () => {
    expect(b.max).to.equal(100)
  })
  it('sets value property', () => {
    expect(b.value).to.equal(17)
  })
})
describe('BoundNumber() - behavior', () => {
  it('is null when lower bound is infinite', () => {
    expect(BoundNumber(undefined, -Infinity, Infinity).value).to.equal(null)
  })
  it('is value of lower bound when lower bound is finite', () => {
    expect(BoundNumber(undefined, 4, 8).value).to.equal(4)
  })
  it('may be the lower bound', () => {
    expect(BoundNumber(3, 3, 5).value).to.equal(3)
  })
  it('may be the upper bound', () => {
    expect(BoundNumber(5, 3, 5).value).to.equal(5)
  })
  it('may be an internal value within the interval', () => {
    expect(BoundNumber(4, 4, 8).value).to.equal(4)
  })
  it('snaps out-of-range numbers to nearest bound', () => {
    expect(BoundNumber(2, 3, 5).value).to.equal(3)
    expect(BoundNumber(1, 3, 5).value).to.equal(3)
    expect(BoundNumber(6, 3, 5).value).to.equal(5)
    expect(BoundNumber(7, 3, 5).value).to.equal(5)
  })
  it('can be used as a number', () => {
    expect(BoundNumber(97, 30, 120) + 5).to.equal(102)
  })
})
describe('BoundNumber.prototype.project', () => {
  it('is an instance method', () => {
    expect(typeof BoundNumber().project).to.equal('function')
  })
  it('accepts an object as the first parameter', () => {
    var a = BoundNumber(3, { min: 2, max: 4}).project({ min: 5, max: 7})
    expect(a.min).to.equal(5)
    expect(a.max).to.equal(7)
    expect(a.value).to.equal(6)
  })
  it('accepts min and max as first and second parameter.', () => {
    var a = BoundNumber(3, 2, 4).project({ min: 5, max: 7})
    expect(a.min).to.equal(5)
    expect(a.max).to.equal(7)
    expect(a.value).to.equal(6)
  })
})
describe('BoundNumber.prototype.project() - behavior', () => {
  it('returns self when same interval is provided', () => {
    var a = BoundNumber(3, 2, 4)
    var b = a.project(2, 4)
    expect(a).to.equal(b)
  })
  it('projects 3 from [2, 4] to [5, 7]', () => {
    expect(BoundNumber(3, 2, 4).project(5, 7).value).to.equal(6)
  })
  it('projects center value to larger interval', () => {
    expect(BoundNumber(3, 2, 4).project(1, 5).value).to.equal(3)
  })
  it('retains lower bound', () => {
    expect(BoundNumber(1, 1, 5).project(1, 9).value).to.equal(1)
  })
  it('snaps upper bound to new upper bound', () => {
    expect(BoundNumber(5, 1, 5).project(1, 9).value).to.equal(9)
  })
})
