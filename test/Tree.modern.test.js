import chai from 'chai'
import { Tree } from '../Tree.js'
import { expectEmpty } from './helpers/expect.js'

var expect = chai.expect

describe('Tree(props)', () => {
  it('may be a symbol.', () => {
    expect(() => { Tree(Symbol()) }).not.to.throw()
  })
})
describe('Tree(props.key)', () => {
  it('may be a symbol.', () => {
    expect(() => { Tree({ key: Symbol() }) }).not.to.throw()
  })
})
describe('Tree(props.parent)', () => {
  it('may be a symbol.', () => {
    expect(() => { Tree({ parent: Symbol() }) }).not.to.throw()
  })
})
describe('Tree(props.children)', () => {
  it('may be a symbol.', () => {
    expect(() => { Tree({ children: Symbol() }) }).not.to.throw()
  })
})
describe('Tree(props.*)', () => {
  it('may be a synbol.', () => {
    expect(() => { Tree({ symbol: Symbol() }) }).not.to.throw()
  })
  it('may be a map.', () => {
    expect(() => { Tree({ map: new Map() }) }).not.to.throw()
  })
  it('may be a set.', () => {
    expect(() => { Tree({ set: new Set() }) }).not.to.throw()
  })
})
describe('Properties.', () => {
  describe('key', () => {
    it(`is null when props.key is a symbol.`, () => {
      expect(Tree({ key: Symbol() }).key).to.equal(null)
    })
  })
  describe('parent', () => {
    it(`is null when props.key is a symbol.`, () => {
      expect(Tree({ parent: Symbol() }).parent).to.equal(null)
    })
  })
})
describe('Tree.prototype.add()', () => {
  it('returns self when descendant is not an instance of Tree.', () => {
    var tree = Tree({ key: 99, parent: 86 })
    expect(tree.add(123n) === tree).to.equal(true)
    expect(tree.add(Symbol()) === tree).to.equal(true)
    expect(tree.add(new Map()) === tree).to.equal(true)
    expect(tree.add(new Set()) === tree).to.equal(true)
  })
})
describe('Tree.fromArray(trees)', () => {
  it('may not be a symbol.', () => {
    expectEmpty(Tree.fromArray(Symbol()))
  })
  it('may not be an object that is not an array.', function () {
    expectEmpty(Tree.fromArray(new Map()))
    expectEmpty(Tree.fromArray(new Set()))
  })
})
