import chai from 'chai'
import { Tree } from '../Tree.js'
import { expectEmpty, expectTree } from './helpers/expect.js'
import { pbt2, pbt3 } from './helpers/data.js'

var expect = chai.expect
var N = null // Short name for null.

describe('Tree()', function () {
  it('is a function.', function () {
    expect(typeof Tree).to.equal('function')
  })
  it('can be constructed without the "new" keyword.', function () {
    expect(function () { Tree() }).not.to.throw(Error)
  })
  it('creates frozen instances.', function () {
    expect(Object.isFrozen(Tree())).to.equal(true)
    if (typeof Tree().__proto__ === 'object') {
      expect(Object.isFrozen(Tree().__proto__)).to.equal(true)
    }
  })
  it('does not accidentally freeze the built-in Object prototype.', function () {
    expect(Object.isFrozen(Object.prototype)).to.equal(false)
  })
  it('preserves node order after creation.', function () {
    var t = Tree({
      key: 0,
      children: [
        Tree({ key: 12 }),
        Tree({ key: 20 }),
        Tree({ key: 51 }),
        Tree({ key: 37 }),
        Tree({ key: 22 })
      ]
    })
    expect(t.children[0].key).to.equal(12)
    expect(t.children[1].key).to.equal(20)
    expect(t.children[2].key).to.equal(51)
    expect(t.children[3].key).to.equal(37)
    expect(t.children[4].key).to.equal(22)
  })
})
describe('Tree(props)', function () {
  it('may be any value.', function () {
    expect(function () { Tree(undefined) }).not.to.throw()
    expect(function () { Tree(null) }).not.to.throw()
    expect(function () { Tree(true) }).not.to.throw()
    expect(function () { Tree(false) }).not.to.throw()
    expect(function () { Tree(123) }).not.to.throw()
    expect(function () { Tree(1.23) }).not.to.throw()
    expect(function () { Tree('abc') }).not.to.throw()
    expect(function () { Tree(NaN) }).not.to.throw()
    expect(function () { Tree(Infinity) }).not.to.throw()
    expect(function () { Tree([]) }).not.to.throw()
    expect(function () { Tree({}) }).not.to.throw()
  })
})
describe('Tree(props.key)', function () {
  it('may be any value', function () {
    expect(function () { Tree({ key: undefined }) }).not.to.throw()
    expect(function () { Tree({ key: null }) }).not.to.throw()
    expect(function () { Tree({ key: true }) }).not.to.throw()
    expect(function () { Tree({ key: false }) }).not.to.throw()
    expect(function () { Tree({ key: 123 }) }).not.to.throw()
    expect(function () { Tree({ key: 1.23 }) }).not.to.throw()
    expect(function () { Tree({ key: 'abc' }) }).not.to.throw()
    expect(function () { Tree({ key: NaN }) }).not.to.throw()
    expect(function () { Tree({ key: Infinity }) }).not.to.throw()
    expect(function () { Tree({ key: [] }) }).not.to.throw()
    expect(function () { Tree({ key: {} }) }).not.to.throw()
  })
})
describe('Tree(props.parent)', function () {
  it('may be any value.', function () {
    expect(function () { Tree({ parent: undefined }) }).not.to.throw()
    expect(function () { Tree({ parent: null }) }).not.to.throw()
    expect(function () { Tree({ parent: true }) }).not.to.throw()
    expect(function () { Tree({ parent: false }) }).not.to.throw()
    expect(function () { Tree({ parent: 123 }) }).not.to.throw()
    expect(function () { Tree({ parent: 1.23 }) }).not.to.throw()
    expect(function () { Tree({ parent: 'abc' }) }).not.to.throw()
    expect(function () { Tree({ parent: NaN }) }).not.to.throw()
    expect(function () { Tree({ parent: Infinity }) }).not.to.throw()
    expect(function () { Tree({ parent: [] }) }).not.to.throw()
    expect(function () { Tree({ parent: {} }) }).not.to.throw()
  })
})
describe('Tree(props.children)', function () {
  it('may be any value.', function () {
    expect(function () { Tree({ children: undefined }) }).not.to.throw()
    expect(function () { Tree({ children: null }) }).not.to.throw()
    expect(function () { Tree({ children: true }) }).not.to.throw()
    expect(function () { Tree({ children: false }) }).not.to.throw()
    expect(function () { Tree({ children: 123 }) }).not.to.throw()
    expect(function () { Tree({ children: 1.23 }) }).not.to.throw()
    expect(function () { Tree({ children: 'abc' }) }).not.to.throw()
    expect(function () { Tree({ children: NaN }) }).not.to.throw()
    expect(function () { Tree({ children: Infinity }) }).not.to.throw()
    expect(function () { Tree({ children: [] }) }).not.to.throw()
    expect(function () { Tree({ children: {} }) }).not.to.throw()
  })
})
describe('Tree(props.*)', function () {
  it('may be undefined, null, boolean, number, string, or synbol.', function () {
    expect(function () { Tree({ food: undefined }) }).not.to.throw()
    expect(function () { Tree({ food: null }) }).not.to.throw()
    expect(function () { Tree({ isGood: true }) }).not.to.throw()
    expect(function () { Tree({ isBad: false }) }).not.to.throw()
    expect(function () { Tree({ number: 123 }) }).not.to.throw()
    expect(function () { Tree({ number: 1.23 }) }).not.to.throw()
    expect(function () { Tree({ number: Infinity }) }).not.to.throw()
    expect(function () { Tree({ number: -Infinity }) }).not.to.throw()
    expect(function () { Tree({ number: NaN }) }).not.to.throw()
    expect(function () { Tree({ string: 'Twilight Zone' }) }).not.to.throw()
  })
  it('may be a plain javascript object. Depth 1', function () {
    var t = Tree({ pojo: { number: 1 } })
    expect(Object.isFrozen(t.pojo)).to.equal(true)
    expect(t.pojo.number).to.equal(1)
  })
  it('may be a plain javascript object. Depth 2', function () {
    var t = Tree({ pojo: { numbers: { one: 1 } } })
    expect(Object.isFrozen(t.pojo)).to.equal(true)
    expect(Object.isFrozen(t.pojo.numbers)).to.equal(true)
    expect(t.pojo.numbers.one).to.equal(1)
  })
  it('may be a plain javascript object. Depth 3', function () {
    var t = Tree({ pojo: { numbers: { integers: { one: 1 } } } })
    expect(Object.isFrozen(t.pojo)).to.equal(true)
    expect(Object.isFrozen(t.pojo.numbers)).to.equal(true)
    expect(Object.isFrozen(t.pojo.numbers.integers)).to.equal(true)
    expect(t.pojo.numbers.integers.one).to.equal(1)
  })
  it('may be an array. Depth 1', function () {
    var t = Tree({ array: ['one', 'two', 'three'] })
    expect(Object.isFrozen(t.array)).to.equal(true)
    expect(t.array.length).to.equal(3)
  })
  it('may be an array. Depth 2', function () {
    var t = Tree({ array: [['one', 'two', 'three']] })
    expect(Object.isFrozen(t.array)).to.equal(true)
    expect(Object.isFrozen(t.array[0])).to.equal(true)
    expect(t.array[0].length).to.equal(3)
  })
  it('may be an array. Depth 3', function () {
    var t = Tree({ array: [[['one', 'two', 'three']]] })
    expect(Object.isFrozen(t.array)).to.equal(true)
    expect(Object.isFrozen(t.array[0])).to.equal(true)
    expect(Object.isFrozen(t.array[0][0])).to.equal(true)
    expect(t.array[0][0].length).to.equal(3)
  })
  it('.', function () {
    var tree = Tree({ a: undefined })
    expect(Object.keys(tree).indexOf('a')).to.equal(-1)
  })
})
describe('Properties.', function () {
  describe('children', function () {
    it('is an empty array for childless trees.', function () {
      expect(Tree().children).to.deep.equal([])
    })
    it('ris an array of direct descendants.', function () {
      var children = pbt3().children
      expect(children[0] instanceof Tree).to.equal(true)
      expect(children[1] instanceof Tree).to.equal(true)
      expect(children[0].key).to.equal(2)
      expect(children[1].key).to.equal(3)
    })
  })
  describe('key', function () {
    it('is null when props.key is null.', function () {
      expect(Tree({ key: null }).key).to.equal(null)
    })
    it('is a number when props.key is a valid number.', function () {
      expect(Tree({ key: 123 }).key).to.equal(123)
      expect(Tree({ key: 1.23 }).key).to.equal(1.23)
    })
    it('is a string when props.key is a string.', function () {
      expect(Tree({ key: 'abc' }).key).to.equal('abc')
    })
    it('is null when props.key is of an unsupported type.', function () {
      expect(Tree({ key: undefined }).key).to.equal(null)
      expect(Tree({ key: true }).key).to.equal(null)
      expect(Tree({ key: false }).key).to.equal(null)
      expect(Tree({ key: [] / [] }).key).to.equal(null)
      expect(Tree({ key: 1 / 0 }).key).to.equal(null)
      expect(Tree({ key: [] }).key).to.equal(null)
      expect(Tree({ key: {} }).key).to.equal(null)
    })
  })
  describe('parent', function () {
    it('is null when props.key is null.', function () {
      expect(Tree({ parent: null }).parent).to.equal(null)
    })
    it('is a number when props.key is a valid number.', function () {
      expect(Tree({ parent: 123 }).parent).to.equal(123)
      expect(Tree({ parent: 1.23 }).parent).to.equal(1.23)
    })
    it('is a string when props.key is a string.', function () {
      expect(Tree({ parent: 'abc' }).parent).to.equal('abc')
    })
    it('is null when props.key is of an unsupported type.', function () {
      expect(Tree({ parent: undefined }).parent).to.equal(null)
      expect(Tree({ parent: true }).parent).to.equal(null)
      expect(Tree({ parent: false }).parent).to.equal(null)
      expect(Tree({ parent: [] / [] }).parent).to.equal(null)
      expect(Tree({ parent: 1 / 0 }).parent).to.equal(null)
      expect(Tree({ parent: [] }).parent).to.equal(null)
      expect(Tree({ parent: {} }).parent).to.equal(null)
    })
  })
  describe('size', function () {
    it('is zero for empty trees.', function () {
      expect(Tree().size).to.deep.equal(0)
    })
    it('is one for non-empty childless trees.', function () {
      expect(Tree({ key: 14 }).size).to.deep.equal(1)
    })
  })
})
describe('Tree.prototype.add()', function () {
  it('is prototype method.', function () {
    expect(typeof Tree().add).to.equal('function')
  })
  it('returns self when descendant in not an instance of Tree.', function () {
    var tree = Tree({ key: 99, parent: 86 })
    expect(tree.add() === tree).to.equal(true)
    expect(tree.add(null) === tree).to.equal(true)
    expect(tree.add(true) === tree).to.equal(true)
    expect(tree.add(false) === tree).to.equal(true)
    expect(tree.add(123) === tree).to.equal(true)
    expect(tree.add(Infinity) === tree).to.equal(true)
    expect(tree.add(NaN) === tree).to.equal(true)
    expect(tree.add([]) === tree).to.equal(true)
    expect(tree.add({}) === tree).to.equal(true)
  })
  it('adds a dot to a dot.', function () {
    var $1 = Tree({ key: 1, parent: 0 })
    var $2 = Tree({ key: 2, parent: 1 })
    var a = $1.add($2)

    expect(a instanceof Tree).to.equal(true)
    expect(a.size).to.equal(2)
    expect(a.get(1) === $1).to.equal(false)
    expect(a.get(2) === $2).to.equal(true)
  })
  it('adds a dot to a dot then adds another dot. Chainable.', function () {
    var $1 = Tree({ key: 1, parent: 0 })
    var $2 = Tree({ key: 2, parent: 1 })
    var $3 = Tree({ key: 3, parent: 2 })

    var a = $1.add($2).add($3)

    expect(a instanceof Tree).to.equal(true)
    expect(a.get(1) === $1).to.equal(false)
    expect(a.get(1).size).to.equal(3)
    expect(a.get(2) === $2).to.equal(false)
    expect(a.get(2).size).to.equal(2)
    expect(a.get(3) === $3).to.equal(true)
    expect(a.get(3).size).to.equal(1)
  })
  it('adds tree with unrecognized parent to root.', function () {
    var a = pbt3()
    var b = a.add(Tree({ key: 8, parent: 777 }))

    expect(a.size).to.equal(7)
    expect(b.size).to.equal(8)
    expect(b.get(8).parent).to.equal(1)
  })
  it('relocates a subtree.', function () {
    var a = pbt3()
    var b = a.add(Tree({ key: 4, parent: 7 }))

    expect(a.size).to.equal(7)
    expect(b.size).to.equal(7)
    expect(a.get(2).size).to.equal(3)
    expect(b.get(2).size).to.equal(2)
    expect(a.get(7).size).to.equal(1)
    expect(b.get(7).size).to.equal(2)
  })
  it('uses structural sharing.', function () {
    var a = pbt3()
    var b = a.add(Tree({ key: 8, parent: 1 }))

    // Derivatives.
    expect(a.get(1) === b.get(1)).to.equal(false)

    // References.
    expect(a.get(2) === b.get(2)).to.equal(true)
    expect(a.get(3) === b.get(3)).to.equal(true)
    expect(a.get(4) === b.get(4)).to.equal(true)
    expect(a.get(5) === b.get(5)).to.equal(true)
    expect(a.get(6) === b.get(6)).to.equal(true)
    expect(a.get(7) === b.get(7)).to.equal(true)
  })
  it('returns self when empty tree is added.', function () {
    var a = pbt3()
    var b = a.add(Tree())
    expect(a === b).to.equal(true)
  })
})
describe('Tree.prototype.delete()', function () {
  it('is aprototype method.', function () {
    expect(typeof Tree().delete).to.equal('function')
  })
  it('removes a leaf.', function () {
    var a = pbt3()
    var b = a.delete(7)

    // Unchanged
    expect(b.get(2) === a.get(2)).to.equal(true)
    expect(b.get(4) === a.get(4)).to.equal(true)
    expect(b.get(5) === a.get(5)).to.equal(true)
    expect(b.get(6) === a.get(6)).to.equal(true)

    // Changed
    expect(b.get(1) === a.get(1)).to.equal(false)
    expect(b.get(1).size).to.equal(6)
    expect(b.get(3) === a.get(3)).to.equal(false)
    expect(b.get(3).size).to.equal(2)

    // Removed
    expect(b.get(7)).to.equal(null)
  })
  it('removes a branch.', function () {
    var a = pbt3()
    var b = a.delete(3)

    expect(b.size).to.equal(4)

    // Unchanged
    expect(b.get(2) === a.get(2)).to.equal(true)
    expect(b.get(4) === a.get(4)).to.equal(true)
    expect(b.get(5) === a.get(5)).to.equal(true)

    // Changed
    expect(b.get(1).size).to.equal(4)

    // Removed
    expect(b.get(3)).to.equal(null)
    expect(b.get(6)).to.equal(null)
    expect(b.get(7)).to.equal(null)
  })
  it('replaces root node with default Tree.', function () {
    var a = pbt3()
    var b = a.delete(1)
    expectEmpty(b)

    // Removed
    expect(b.get(1)).to.equal(null)
    expect(b.get(2)).to.equal(null)
    expect(b.get(3)).to.equal(null)
    expect(b.get(4)).to.equal(null)
    expect(b.get(5)).to.equal(null)
    expect(b.get(6)).to.equal(null)
    expect(b.get(7)).to.equal(null)
  })
  it('Uses structural sharing.', function () {
    var a = pbt3()
    var b = a.delete(7)

    // References.
    expect(a.get(2) === b.get(2)).to.equal(true)
    expect(a.get(4) === b.get(4)).to.equal(true)
    expect(a.get(5) === b.get(5)).to.equal(true)
    expect(a.get(6) === b.get(6)).to.equal(true)
  })
  it('returns itself when an unrecognized key is given .', function () {
    var a = Tree({ key: 1, parent: 0 })
    var b = a.delete(3)

    expect(a === b).to.equal(true)
  })
})
describe('Tree.prototype.forEach()', function () {
  it('is a prototype method.', function () {
    expect(typeof Tree().forEach).to.equal('function')
  })
  it('iterates 3 times for tree with size of 3.', function () {
    var count = 0
    pbt2().forEach(function() {
      count++
    })
    expect(count).to.equal(3)
  })
  it('iterates 7 times for tree with size of 7.', function () {
    var count = 0
    pbt3().forEach(function() {
      count++
    })
    expect(count).to.equal(7)
  })
  it('is able to use "this" from an outside scope.', function () {
    var maker = function (arg) {
      arg.forEach(function (tree) {
        this[tree.key] = 'Tree with key of ' + tree.key
      }, this)
    }

    var a = new maker(pbt2())

    expect(a[1]).to.equal('Tree with key of 1')
    expect(a[2]).to.equal('Tree with key of 2')
    expect(a[3]).to.equal('Tree with key of 3')
  })
})
describe('Tree.prototype.get()', function () {
  it('is a prototype method.', function () {
    expect(typeof Tree().get).to.equal('function')
  })
  it('returns appropriate subtree.', function () {
    var tree = pbt3()
    expect(tree.get(1) instanceof Tree).to.equal(true)
    expect(tree.get(2) instanceof Tree).to.equal(true)
    expect(tree.get(3) instanceof Tree).to.equal(true)
    expect(tree.get(4) instanceof Tree).to.equal(true)
    expect(tree.get(5) instanceof Tree).to.equal(true)
    expect(tree.get(6) instanceof Tree).to.equal(true)
    expect(tree.get(7) instanceof Tree).to.equal(true)
    expect(tree.get(1).key).to.equal(1)
    expect(tree.get(2).key).to.equal(2)
    expect(tree.get(3).key).to.equal(3)
    expect(tree.get(4).key).to.equal(4)
    expect(tree.get(5).key).to.equal(5)
    expect(tree.get(6).key).to.equal(6)
    expect(tree.get(7).key).to.equal(7)
  })
})
describe('Tree.prototype.has()', function () {
  it('is a prototype method.', function () {
    expect(typeof Tree().has).to.equal('function')
  })
  it('recognizes itself.', function () {
    expect(pbt3().has(1)).to.equal(true)
  })
  it('recognizes subtrees.', function () {
    var tree = pbt3()
    expect(tree.has(2)).to.equal(true)
    expect(tree.has(3)).to.equal(true)
    expect(tree.has(4)).to.equal(true)
    expect(tree.has(5)).to.equal(true)
    expect(tree.has(6)).to.equal(true)
    expect(tree.has(7)).to.equal(true)
  })
  it('ignores keys that do not exist in this.', function () {
    var tree = pbt3()
    expect(tree.has(8)).to.equal(false)
    expect(tree.has(-1)).to.equal(false)
    expect(tree.has('submarine')).to.equal(false)
  })
})
describe('Tree.prototype.isEmpty()', function () {
  it('is a prototype method.', function () {
    expect(typeof Tree().isEmpty).to.equal('function')
  })
  it('returns true for an empty tree.', function () {
    expect(Tree().isEmpty()).to.equal(true)
  })
  it('returns false when tree has a key.', function () {
    expect(Tree({ key: 123 }).isEmpty()).to.equal(false)
  })
  it('returns false when tree has a parent.', function () {
    expect(Tree({ parent: 123 }).isEmpty()).to.equal(false)
  })
  it('returns false when tree has a child.', function () {
    expect(Tree({ children: [ Tree({ key: 123 }) ] }).isEmpty()).to.equal(false)
  })
  it('returns false when tree has a custom property.', function () {
    expect(Tree({ rock: 'lobster' }).isEmpty()).to.equal(false)
  })
})
describe('Tree.prototype.sort()', function () {
  it('is a prototype method.', function () {
    expect(typeof Tree().sort).to.equal('function')
  })
  it('returns self when tree size is 1.', function () {
    var a = Tree()
    expect(a === a.sort()).to.equal(true)
  })
  it('returns self when tree size is 2.', function () {
    var a = Tree({ key: 1, parent: 0, children: [
      Tree({ key: 2, parent: 1 })
    ] })
    expect(a === a.sort()).to.equal(true)
  })
  it('returns self when tree is already sorted.', function () {
    var a = Tree({ key: 1, parent: 0, children: [
      Tree({ key: 2, parent: 1 }),
      Tree({ key: 3, parent: 1 }),
      Tree({ key: 4, parent: 1 }),
      Tree({ key: 5, parent: 1 })
    ] })
    expect(a === a.sort()).to.equal(true)
  })
  it('returns a clone with children sorted. 1 level deep.', function () {
    var a = Tree({ key: 5, parent: 1 })
    var b = Tree({ key: 4, parent: 1 })
    var c = Tree({ key: 3, parent: 1 })
    var d = Tree({ key: 2, parent: 1 })
    var backward = Tree({ key: 1, parent: 0, children: [a, b, c, d] })
    var forward = backward.sort()

    expect(backward === forward).to.equal(false)
    expect(forward.children[0]).to.deep.equal(d)
    expect(forward.children[1]).to.deep.equal(c)
    expect(forward.children[2]).to.deep.equal(b)
    expect(forward.children[3]).to.deep.equal(a)
  })
  it('sorts an unordered tree with a height of 3.', function () {
    var _7 = Tree({ key: 7, parent: 3 })
    var _6 = Tree({ key: 6, parent: 3 })
    var _5 = Tree({ key: 5, parent: 2 })
    var _4 = Tree({ key: 4, parent: 2 })
    var _3 = Tree({ key: 3, parent: 1, children: [_7, _6] })
    var _2 = Tree({ key: 2, parent: 1, children: [_5, _4] })
    var _1 = Tree({ key: 1, parent: 0, children: [_3, _2] })

    var s = _1.sort()

    // Derivative.
    expect(s.key).to.deep.equal(1)
    expect(s.children[0].key).to.deep.equal(2)
    expect(s.children[1].key).to.deep.equal(3)

    // Reference.
    expect(_4 === s.children[0].children[0]).to.equal(true)
    expect(_5 === s.children[0].children[1]).to.equal(true)
    expect(_6 === s.children[1].children[0]).to.equal(true)
    expect(_7 === s.children[1].children[1]).to.equal(true)
  })
  describe('options.comparator', function () {
    it('sorts tree with a custom function.', function () {
      var a = Tree({ key: 6, parent: 1, name: 'thumb' })
      var b = Tree({ key: 5, parent: 1, name: 'index' })
      var c = Tree({ key: 4, parent: 1, name: 'middle' })
      var d = Tree({ key: 3, parent: 1, name: 'ring' })
      var e = Tree({ key: 2, parent: 1, name: 'pinky' })
      var A = Tree({ key: 1, children: [a, b, c, d, e] })

      var sort = function (a, b) {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
            return 1
        }
        return 0
      }

      var sorted = A.sort({ comparator: sort })

      expect(sorted.children[0] === b).to.equal(true)
      expect(sorted.children[1] === c).to.equal(true)
      expect(sorted.children[2] === e).to.equal(true)
      expect(sorted.children[3] === d).to.equal(true)
      expect(sorted.children[4] === a).to.equal(true)
    })
  })
  describe('options.deep = false', function () {
    it('does not sort beyond level 2.', function () {
      var _7 = Tree({ key: 7, parent: 3 })
      var _6 = Tree({ key: 6, parent: 3 })
      var _5 = Tree({ key: 5, parent: 2 })
      var _4 = Tree({ key: 4, parent: 2 })
      var _3 = Tree({ key: 3, parent: 1, children: [_7, _6] })
      var _2 = Tree({ key: 2, parent: 1, children: [_5, _4] })
      var _1 = Tree({ key: 1, parent: 0, children: [_3, _2] })

      var s = _1.sort({ deep: false })

      // Equality: Leafs are references.
      expect(_1 === s).to.equal(false)
      expect(_2 === s).to.equal(false)
      expect(_3 === s).to.equal(false)
      expect(_5 === s.children[0].children[0]).to.equal(true)
      expect(_4 === s.children[0].children[1]).to.equal(true)

      expect(_6 === s.children[1].children[1]).to.equal(true)
      expect(_7 === s.children[1].children[0]).to.equal(true)

      // Indetity: Root + branch nodes are modified clones.
      expect(s.key).to.deep.equal(1)
      expect(s.children[0].key).to.deep.equal(2)
      expect(s.children[1].key).to.deep.equal(3)
    })
  })
})
/**
 * Tree Shapes
 *
 * Tree shapes are represented by a single letter indicating the type of tree
 * followed by an integer representing the size of the tree.
 *
 *   A: Dot/Line
 *      Descendants have a degree of 0 or 1.
 *      This shape is a 'dot' when its size is 1.
 *      This shape is a 'line' when its size is greater than 1.
 *
 *   B: Triangle
 *      Root has 2 or more children. Each child has a degree of 0.
 *
 *   C: Snake Tongue
 *      A line whose last node has 2 children.
 *
 *   D: Hook
 *      Root has degree of two.
 *      Child 1 has degree of zero.
 *      Child 2 is a line consisting of all remaining nodes.
 */
describe('Tree.fromArray()', function () {
  it('is an immutable static method.', function () {
    expect(typeof Tree.fromArray).to.equal('function')
  })
})
describe('Tree.fromArray(trees)', function () {
  it('is optional.', function () {
    expect(function () { Tree.fromArray() }).not.to.throw()
  })
  it('may be an empty array.', function () {
    expect(function () { Tree.fromArray([]) }).not.to.throw()
  })
  it('may be an array of unique Tree instances.', function () {
    expect(function () {
      Tree.fromArray([
        Tree({ key: 1, parent: 0}),
        Tree({ key: 2, parent: 1}),
        Tree({ key: 3, parent: 2})
      ])
    }).not.to.throw()
  })
  it('must not be an array containing Tree instances with duplicate ids.', function () {
    expect(function () {
      Tree.fromArray([ Tree({ key: 1 }), Tree({ key: 1 }) ])
    }).to.throw()
  })
  it('may not be null.', function () {
    expectEmpty(Tree.fromArray(null))
  })
  it('may not be boolean.', function () {
    expectEmpty(Tree.fromArray(true))
    expectEmpty(Tree.fromArray(false))
  })
  it('may not be NaN.', function () {
    expectEmpty(Tree.fromArray(NaN))
  })
  it('may not be a number.', function () {
    expectEmpty(Tree.fromArray(Infinity))
    expectEmpty(Tree.fromArray(123))
    expectEmpty(Tree.fromArray(1.23))
  })
  it('may not be a string.', function () {
    expectEmpty(Tree.fromArray('abc'))
  })
  it('may not be an object that is not an array.', function () {
    expectEmpty(Tree.fromArray({}))
    expectEmpty(Tree.fromArray(function () {}))
  })
  it('ignores trees with size less than 1.', function () {
    expectEmpty(Tree.fromArray([Tree(), Tree(), Tree()]))
  })
  it('accepts trees with size greater than 1.', function () {
    var a = [
      Tree({ key: 1, parent: 0 }),
      Tree({ key: 2, parent: 1, children: [Tree({ key: 3 })] }),
      Tree({ key: 4, parent: 3 }),
      Tree({ key: 5, parent: 4 }),
      Tree({ key: 6, parent: 5, children: [Tree({ key: 7 })] })
    ]

    var b = Tree.fromArray(a)
    expect(b.get(7).size).to.equal(1)
    expect(b.get(6).size).to.equal(2)
    expect(b.get(5).size).to.equal(3)
    expect(b.get(4).size).to.equal(4)
    expect(b.get(3).size).to.equal(5)
    expect(b.get(2).size).to.equal(6)
    expect(b.get(1).size).to.equal(7)
  })
  describe('parses a one node tree.', function () {
    it('parses dot: A1', function () {
      var node = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([node])
      expectTree(tree.get(5), 5, 4, 0, 1, 0)
      expect(node === tree).to.equal(true)
    })
  })
  describe('parses a two node tree.', function () {
    it('parses line: A2', function () {
      var a = Tree({ key: 5, parent: 0 })
      var b = Tree({ key: 6, parent: 5 })
      var tree = Tree.fromArray([a, b])
      expectTree(tree.get(5), 5, 0, 1, 2, 0)
      expectTree(tree.get(6), 6, 5, 0, 1, 1)
    })
  })
  describe('parses three node trees.', function () {
    it('parses line. A3', function () {
      var a = Tree({ key: 7, parent: 0 })
      var b = Tree({ key: 8, parent: 7 })
      var c = Tree({ key: 9, parent: 8 })
      var tree = Tree.fromArray([a, b, c])
      expectTree(tree.get(7), 7, 0, 1, 3, 0)
      expectTree(tree.get(8), 8, 7, 1, 2, 1)
      expectTree(tree.get(9), 9, 8, 0, 1, 2)
    })
    it('parses triangle: B3', function () {
      var a = Tree({ key: 7, parent: 0 })
      var b = Tree({ key: 8, parent: 7 })
      var c = Tree({ key: 9, parent: 7 })
      var tree = Tree.fromArray([a, b, c])
      expectTree(tree.get(7), 7, 0, 2, 3, 0)
      expectTree(tree.get(8), 8, 7, 0, 1, 1)
      expectTree(tree.get(9), 9, 7, 0, 1, 1)
    })
  })
  describe('parses four node trees.', function () {
    it('parses line: A4.', function () {
      var tree = Tree.fromArray([
        Tree({ key: 1, parent: 0 }),
        Tree({ key: 2, parent: 1 }),
        Tree({ key: 3, parent: 2 }),
        Tree({ key: 4, parent: 3 })
      ])
      expectTree(tree.get(1), 1, 0, 1, 4, 0)
      expectTree(tree.get(2), 2, 1, 1, 3, 1)
      expectTree(tree.get(3), 3, 2, 1, 2, 2)
      expectTree(tree.get(4), 4, 3, 0, 1, 3)
    })
    it('parses triangle: B4.', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 1 })
      var tree = Tree.fromArray([a, b, c, d])
      expectTree(tree.get(1), 1, 0, 3, 4, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 0, 1, 1)
      expectTree(tree.get(4), 4, 1, 0, 1, 1)
    })
    it('parses serpent tongue: C4', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 2 })
      var tree = Tree.fromArray([a, b, c, d])

      expectTree(tree.get(1), 1, 0, 1, 4, 0)
      expectTree(tree.get(2), 2, 1, 2, 3, 1)
      expectTree(tree.get(3), 3, 2, 0, 1, 2)
      expectTree(tree.get(4), 4, 2, 0, 1, 2)
    })
    it('parses hook: D4', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 3 })
      var tree = Tree.fromArray([a, b, c, d])
      expectTree(tree.get(1), 1, 0, 2, 4, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 1, 2, 1)
      expectTree(tree.get(4), 4, 3, 0, 1, 2)
    })
  })
  describe('parses five node trees.', function () {
    it('parses line: A5.', function () {
      var tree = Tree.fromArray([
        Tree({ key: 1, parent: 0 }),
        Tree({ key: 2, parent: 1 }),
        Tree({ key: 3, parent: 2 }),
        Tree({ key: 4, parent: 3 }),
        Tree({ key: 5, parent: 4 })
      ])
      expectTree(tree.get(1), 1, 0, 1, 5, 0)
      expectTree(tree.get(2), 2, 1, 1, 4, 1)
      expectTree(tree.get(3), 3, 2, 1, 3, 2)
      expectTree(tree.get(4), 4, 3, 1, 2, 3)
      expectTree(tree.get(5), 5, 4, 0, 1, 4)
    })
    it('parses triangle: B5.', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 1 })
      var e = Tree({ key: 5, parent: 1 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 4, 5, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 0, 1, 1)
      expectTree(tree.get(4), 4, 1, 0, 1, 1)
      expectTree(tree.get(5), 5, 1, 0, 1, 1)
    })
    it('parses serpent tongue: C5.', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 3 })
      var e = Tree({ key: 5, parent: 3 })
      var tree = Tree.fromArray([a, b, c, d, e])

      expectTree(tree.get(1), 1, 0, 1, 5, 0)
      expectTree(tree.get(2), 2, 1, 1, 4, 1)
      expectTree(tree.get(3), 3, 2, 2, 3, 2)
      expectTree(tree.get(4), 4, 3, 0, 1, 3)
      expectTree(tree.get(5), 5, 3, 0, 1, 3)
    })
    it('parses hook: D5.', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 3 })
      var e = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 2, 5, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 1, 3, 1)
      expectTree(tree.get(4), 4, 3, 1, 2, 2)
      expectTree(tree.get(5), 5, 4, 0, 1, 3)
    })
    it('parses 1 child: D4.', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 2 })
      var e = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 1, 5, 0)
      expectTree(tree.get(2), 2, 1, 2, 4, 1)
      expectTree(tree.get(3), 3, 2, 0, 1, 2)
      expectTree(tree.get(4), 4, 2, 1, 2, 2)
      expectTree(tree.get(5), 5, 4, 0, 1, 3)
    })
    it('parses 1 child: B4.', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 2 })
      var e = Tree({ key: 5, parent: 2 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 1, 5, 0)
      expectTree(tree.get(2), 2, 1, 3, 4, 1)
      expectTree(tree.get(3), 3, 2, 0, 1, 2)
      expectTree(tree.get(4), 4, 2, 0, 1, 2)
      expectTree(tree.get(5), 5, 2, 0, 1, 2)
    })
    it('parses 2 children: A2 A2.', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 2 })
      var d = Tree({ key: 4, parent: 1 })
      var e = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 2, 5, 0)
      expectTree(tree.get(2), 2, 1, 1, 2, 1)
      expectTree(tree.get(3), 3, 2, 0, 1, 2)
      expectTree(tree.get(4), 4, 1, 1, 2, 1)
      expectTree(tree.get(5), 5, 4, 0, 1, 2)
    })
    it('parses 2 children: A1 B3.', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 3 })
      var e = Tree({ key: 5, parent: 3 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 2, 5, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 2, 3, 1)
      expectTree(tree.get(4), 4, 3, 0, 1, 2)
      expectTree(tree.get(5), 5, 3, 0, 1, 2)
    })
    it('parses 3 children: A1 A1 A2.', function () {
      var a = Tree({ key: 1, parent: 0 })
      var b = Tree({ key: 2, parent: 1 })
      var c = Tree({ key: 3, parent: 1 })
      var d = Tree({ key: 4, parent: 1 })
      var e = Tree({ key: 5, parent: 4 })
      var tree = Tree.fromArray([a, b, c, d, e])
      expectTree(tree.get(1), 1, 0, 3, 5, 0)
      expectTree(tree.get(2), 2, 1, 0, 1, 1)
      expectTree(tree.get(3), 3, 1, 0, 1, 1)
      expectTree(tree.get(4), 4, 1, 1, 2, 1)
      expectTree(tree.get(5), 5, 4, 0, 1, 2)
    })
  })
  describe('adopts orphans', function () {
    it('adopts 2 orphaned dots.', function () {
        var root = Tree({ key: 7 })
        var child = Tree({ key: 8 })
        var tree = Tree.fromArray([root, child])
        expectTree(tree.get(N), N, N, 2, 3, 0)
        expectTree(tree.get(7), 7, N, 0, 1, 1)
        expectTree(tree.get(8), 8, N, 0, 1, 1)
    })
    it('adopts 3 orphaned dots.', function () {
      var a = Tree({ key: 7, parent: 0 })
      var b = Tree({ key: 8, parent: 0 })
      var c = Tree({ key: 9, parent: 0 })
      var tree = Tree.fromArray([a, b, c])
      expectTree(tree.get(N), N, N, 3, 4, 0)
      expectTree(tree.get(7), 7, N, 0, 1, 1)
      expectTree(tree.get(8), 8, N, 0, 1, 1)
      expectTree(tree.get(9), 9, N, 0, 1, 1)
    })
    it('adopts 4 orphaned dots.', function () {
      var a = Tree({ key: 6, parent: 0 })
      var b = Tree({ key: 7, parent: 0 })
      var c = Tree({ key: 8, parent: 0 })
      var d = Tree({ key: 9, parent: 0 })
      var tree = Tree.fromArray([a, b, c, d])

      expectTree(tree.get(N), N, N, 4, 5, 0)
      expectTree(tree.get(6), 6, N, 0, 1, 1)
      expectTree(tree.get(7), 7, N, 0, 1, 1)
      expectTree(tree.get(8), 8, N, 0, 1, 1)
      expectTree(tree.get(9), 9, N, 0, 1, 1)
    })
    it('adopts 5 orphaned dots.', function () {
      var a = Tree({ key: 5, parent: 0 })
      var b = Tree({ key: 6, parent: 0 })
      var c = Tree({ key: 7, parent: 0 })
      var d = Tree({ key: 8, parent: 0 })
      var e = Tree({ key: 9, parent: 0 })
      var tree = Tree.fromArray([a, b, c, d, e])

      expectTree(tree.get(N), N, N, 5, 6, 0)
      expectTree(tree.get(5), 5, N, 0, 1, 1)
      expectTree(tree.get(6), 6, N, 0, 1, 1)
      expectTree(tree.get(7), 7, N, 0, 1, 1)
      expectTree(tree.get(8), 8, N, 0, 1, 1)
      expectTree(tree.get(9), 9, N, 0, 1, 1)
    })
  })
})
describe('Tree.fromArray(trees, options.height)', function () {
  function A11 () {
    return [
      Tree({ key:  1, parent:  0 }),
      Tree({ key:  2, parent:  1 }),
      Tree({ key:  3, parent:  2 }),
      Tree({ key:  4, parent:  3 }),
      Tree({ key:  5, parent:  4 }),
      Tree({ key:  6, parent:  5 }),
      Tree({ key:  7, parent:  6 }),
      Tree({ key:  8, parent:  7 }),
      Tree({ key:  9, parent:  8 }),
      Tree({ key: 10, parent:  9 }),
      Tree({ key: 11, parent: 10 })
    ]
  }
  it('has no effect when values is larger than the tree\'s height.', function () {
    var expectNormal = function (t) {
      expectTree(t.get(1), 1, 0, 2, 7, 0)
      expectTree(t.get(2), 2, 1, 2, 3, 1)
      expectTree(t.get(3), 3, 1, 2, 3, 1)
      expectTree(t.get(4), 4, 2, 0, 1, 2)
      expectTree(t.get(5), 5, 2, 0, 1, 2)
      expectTree(t.get(6), 6, 3, 0, 1, 2)
      expectTree(t.get(7), 7, 3, 0, 1, 2)
    }

    var a = Tree({ key: 1, parent: 0 })
    var b = Tree({ key: 2, parent: 1 })
    var c = Tree({ key: 3, parent: 1 })
    var d = Tree({ key: 4, parent: 2 })
    var e = Tree({ key: 5, parent: 2 })
    var f = Tree({ key: 6, parent: 3 })
    var g = Tree({ key: 7, parent: 3 })

    var tree1 = Tree.fromArray([a, b, c, d, e, f, g], { height: 2 })

    expectTree(tree1,        1, 0, 6, 7, 0)
    expectTree(tree1.get(2), 2, 1, 0, 1, 1)
    expectTree(tree1.get(3), 3, 1, 0, 1, 1)
    expectTree(tree1.get(4), 4, 1, 0, 1, 1)
    expectTree(tree1.get(5), 5, 1, 0, 1, 1)
    expectTree(tree1.get(6), 6, 1, 0, 1, 1)
    expectTree(tree1.get(7), 7, 1, 0, 1, 1)

    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 3 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 4 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 5 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 6 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 7 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 8 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 9 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 10 }))
    expectNormal(Tree.fromArray([a, b, c, d, e, f, g], { height: 11 }))
  })
  it('smushes line A11 to height of 11.', function () {
    var t = Tree.fromArray(A11(), { height: 11 })
    expectTree(t,          1,  0, 1, 11,  0)
    expectTree(t.get(2),   2,  1, 1, 10,  1)
    expectTree(t.get(3),   3,  2, 1,  9,  2)
    expectTree(t.get(4),   4,  3, 1,  8,  3)
    expectTree(t.get(5),   5,  4, 1,  7,  4)
    expectTree(t.get(6),   6,  5, 1,  6,  5)
    expectTree(t.get(7),   7,  6, 1,  5,  6)
    expectTree(t.get(8),   8,  7, 1,  4,  7)
    expectTree(t.get(9),   9,  8, 1,  3,  8)
    expectTree(t.get(10), 10,  9, 1,  2,  9)
    expectTree(t.get(11), 11, 10, 0,  1, 10)
  })
  it('smushes line A11 to height of 10.', function () {
    var t = Tree.fromArray(A11(), { height: 10 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 1,  7, 4)
    expectTree(t.get(6),   6, 5, 1,  6, 5)
    expectTree(t.get(7),   7, 6, 1,  5, 6)
    expectTree(t.get(8),   8, 7, 1,  4, 7)
    expectTree(t.get(9),   9, 8, 2,  3, 8)
    expectTree(t.get(10), 10, 9, 0,  1, 9)
    expectTree(t.get(11), 11, 9, 0,  1, 9)
  })
  it('smushes line A11 to height of 9.', function () {
    var t = Tree.fromArray(A11(), { height: 9 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 1,  7, 4)
    expectTree(t.get(6),   6, 5, 1,  6, 5)
    expectTree(t.get(7),   7, 6, 1,  5, 6)
    expectTree(t.get(8),   8, 7, 3,  4, 7)
    expectTree(t.get(9),   9, 8, 0,  1, 8)
    expectTree(t.get(10), 10, 8, 0,  1, 8)
    expectTree(t.get(11), 11, 8, 0,  1, 8)
  })
  it('smushes line A11 to height of 8.', function () {
    var t = Tree.fromArray(A11(), { height: 8 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 1,  7, 4)
    expectTree(t.get(6),   6, 5, 1,  6, 5)
    expectTree(t.get(7),   7, 6, 4,  5, 6)
    expectTree(t.get(8),   8, 7, 0,  1, 7)
    expectTree(t.get(9),   9, 7, 0,  1, 7)
    expectTree(t.get(10), 10, 7, 0,  1, 7)
    expectTree(t.get(11), 11, 7, 0,  1, 7)
  })
  it('smushes line A11 to height of 7.', function () {
    var t = Tree.fromArray(A11(), { height: 7 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 1,  7, 4)
    expectTree(t.get(6),   6, 5, 5,  6, 5)
    expectTree(t.get(7),   7, 6, 0,  1, 6)
    expectTree(t.get(8),   8, 6, 0,  1, 6)
    expectTree(t.get(9),   9, 6, 0,  1, 6)
    expectTree(t.get(10), 10, 6, 0,  1, 6)
    expectTree(t.get(11), 11, 6, 0,  1, 6)
  })
  it('smushes line A11 to height of 6.', function () {
    var t = Tree.fromArray(A11(), { height: 6 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 1,  8, 3)
    expectTree(t.get(5),   5, 4, 6,  7, 4)
    expectTree(t.get(6),   6, 5, 0,  1, 5)
    expectTree(t.get(7),   7, 5, 0,  1, 5)
    expectTree(t.get(8),   8, 5, 0,  1, 5)
    expectTree(t.get(9),   9, 5, 0,  1, 5)
    expectTree(t.get(10), 10, 5, 0,  1, 5)
    expectTree(t.get(11), 11, 5, 0,  1, 5)
  })
  it('smushes line A11 to height of 5.', function () {
    var t = Tree.fromArray(A11(), { height: 5 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 1,  9, 2)
    expectTree(t.get(4),   4, 3, 7,  8, 3)
    expectTree(t.get(5),   5, 4, 0,  1, 4)
    expectTree(t.get(6),   6, 4, 0,  1, 4)
    expectTree(t.get(7),   7, 4, 0,  1, 4)
    expectTree(t.get(8),   8, 4, 0,  1, 4)
    expectTree(t.get(9),   9, 4, 0,  1, 4)
    expectTree(t.get(10), 10, 4, 0,  1, 4)
    expectTree(t.get(11), 11, 4, 0,  1, 4)
  })
  it('smushes line A11 to height of 4.', function () {
    var t = Tree.fromArray(A11(), { height: 4 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 1, 10, 1)
    expectTree(t.get(3),   3, 2, 8,  9, 2)
    expectTree(t.get(4),   4, 3, 0,  1, 3)
    expectTree(t.get(5),   5, 3, 0,  1, 3)
    expectTree(t.get(6),   6, 3, 0,  1, 3)
    expectTree(t.get(7),   7, 3, 0,  1, 3)
    expectTree(t.get(8),   8, 3, 0,  1, 3)
    expectTree(t.get(9),   9, 3, 0,  1, 3)
    expectTree(t.get(10), 10, 3, 0,  1, 3)
    expectTree(t.get(11), 11, 3, 0,  1, 3)
  })
  it('smushes line A11 to height of 3.', function () {
    var t = Tree.fromArray(A11(), { height: 3 })
    expectTree(t,          1, 0, 1, 11, 0)
    expectTree(t.get(2),   2, 1, 9, 10, 1)
    expectTree(t.get(3),   3, 2, 0,  1, 2)
    expectTree(t.get(4),   4, 2, 0,  1, 2)
    expectTree(t.get(5),   5, 2, 0,  1, 2)
    expectTree(t.get(6),   6, 2, 0,  1, 2)
    expectTree(t.get(7),   7, 2, 0,  1, 2)
    expectTree(t.get(8),   8, 2, 0,  1, 2)
    expectTree(t.get(9),   9, 2, 0,  1, 2)
    expectTree(t.get(10), 10, 2, 0,  1, 2)
    expectTree(t.get(11), 11, 2, 0,  1, 2)
  })
  it('smushes line A11 to height of 2.', function () {
    var t = Tree.fromArray(A11(), { height: 2 })
    expectTree(t,          1, 0, 10, 11, 0)
    expectTree(t.get(2),   2, 1,  0,  1, 1)
    expectTree(t.get(3),   3, 1,  0,  1, 1)
    expectTree(t.get(4),   4, 1,  0,  1, 1)
    expectTree(t.get(5),   5, 1,  0,  1, 1)
    expectTree(t.get(6),   6, 1,  0,  1, 1)
    expectTree(t.get(7),   7, 1,  0,  1, 1)
    expectTree(t.get(8),   8, 1,  0,  1, 1)
    expectTree(t.get(9),   9, 1,  0,  1, 1)
    expectTree(t.get(10), 10, 1,  0,  1, 1)
    expectTree(t.get(11), 11, 1,  0,  1, 1)
  })
})
