const { expect } = require('chai')
const { Bounded } = require('../src/Bounded.js')

describe('Bounded()', () => {
  it('is a function.', () => {
    expect(typeof Bounded).to.equal('function')
  })
  it('can be called without the "new" keyword.', () => {
    expect(() => { Bounded() }).not.to.throw()
  })
  it('creates a default instance when passed no parameters', () => {
    expect(Bounded().min).to.equal(-Infinity)
    expect(Bounded().max).to.equal(Infinity)
    expect(Bounded().value).to.equal(null)
  })
})
describe('Bounded(value)', () => {
  it('is optional', () => {
    expect(() => { Bounded() }).not.to.throw()
  })
  it('is null when undefined', () => {
    expect(Bounded().value).to.equal(null)
  })
  it('is null when is NaN', () => {
    expect(Bounded(NaN).value).to.equal(null)
  })
  it('may be an integer', () => {
    expect(Bounded(123).value).to.equal(123)
  })
  it('may be have a decimal', () => {
    expect(Bounded(1.23).value).to.equal(1.23)
  })
  it('does not coerce types', () => {
    expect(Bounded('123').value).to.equal(null)
    expect(Bounded(null).value).to.equal(null)
    expect(Bounded(false).value).to.equal(null)
    expect(Bounded(true).value).to.equal(null)
  })
})
describe('Bounded(value, interval)', () => {
  var b = Bounded(17, { min: 2, max: 100 })
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
describe('Bounded(value, min, max)', () => {
  var b = Bounded(17, 2, 100)
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
describe('Bounded() - behavior', () => {
  it('is null when lower bound is infinite', () => {
    expect(Bounded(undefined, -Infinity, Infinity).value).to.equal(null)
  })
  it('is value of lower bound when lower bound is finite', () => {
    expect(Bounded(undefined, 4, 8).value).to.equal(4)
  })
  it('may be the lower bound', () => {
    expect(Bounded(3, 3, 5).value).to.equal(3)
  })
  it('may be the upper bound', () => {
    expect(Bounded(5, 3, 5).value).to.equal(5)
  })
  it('may be an internal value within the interval', () => {
    expect(Bounded(4, 4, 8).value).to.equal(4)
  })
  it('snaps out-of-range numbers to nearest bound', () => {
    expect(Bounded(2, 3, 5).value).to.equal(3)
    expect(Bounded(1, 3, 5).value).to.equal(3)
    expect(Bounded(6, 3, 5).value).to.equal(5)
    expect(Bounded(7, 3, 5).value).to.equal(5)
  })
  it('can be used as a number', () => {
    expect(Bounded(97, 30, 120) + 5).to.equal(102)
  })
})
describe('Bounded.prototype.project', () => {
  it('is an instance method', () => {
    expect(typeof Bounded().project).to.equal('function')
  })
  it('accepts an object as the first parameter', () => {
    var a = Bounded(3, { min: 2, max: 4}).project({ min: 5, max: 7})
    expect(a.min).to.equal(5)
    expect(a.max).to.equal(7)
    expect(a.value).to.equal(6)
  })
  it('accepts min and max as first and second parameter.', () => {
    var a = Bounded(3, 2, 4).project({ min: 5, max: 7})
    expect(a.min).to.equal(5)
    expect(a.max).to.equal(7)
    expect(a.value).to.equal(6)
  })
})
describe('Bounded.prototype.project() - behavior', () => {
  it('returns self when same interval is provided', () => {
    var a = Bounded(3, 2, 4)
    var b = a.project(2, 4)
    expect(a).to.equal(b)
  })
  it('projects 3 from [2, 4] to [5, 7]', () => {
    expect(Bounded(3, 2, 4).project(5, 7).value).to.equal(6)
  })
  it('projects center value to larger interval', () => {
    expect(Bounded(3, 2, 4).project(1, 5).value).to.equal(3)
  })
  it('retains lower bound', () => {
    expect(Bounded(1, 1, 5).project(1, 9).value).to.equal(1)
  })
  it('snaps upper bound to new upper bound', () => {
    expect(Bounded(5, 1, 5).project(1, 9).value).to.equal(9)
  })
})
