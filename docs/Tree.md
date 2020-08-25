# Tree

This module exports a single constructor, `Tree()`, which can be used to create immutable tree structures. Please read below for usage information.

## Usage

```js
import { Interval } from '@mfields/lib/Interval'
```

## Properties

Each instance of `Tree` will always contain the following properties.

Name     | Type               | Description
-------- | ------------------ | -------------
key      | number|string|null | This tree's unique identifier.
parent   | number|string|null | The key of this tree's parent.
children | Tree[]             | Zero or more Tree instances.
size     | number             | A whole number representing the total number of trees (root + all subtrees) contained within this tree.

A tree may also have zero or more custom properties on any type except `undefined`.


##  Constructor
Creates a new instance of `Tree`. This function may be called with or without the `new` operator.

__Syntax__
```js
Tree([config])
```

__Parameters__

This function accepts one parameter: `config` which should be an object. The following properties are recognized:

| Property | Type          | Default   | Description
| -------- | ------------- | --------- | -------------------------
| key      | number|string | null      | A unique identifier.
| parent   | number|string | null      | Unique identifier of this tree's parent.
| children | Array         | []        | Zero or more trees.
| *        | *             | undefined | Zero or more custom properties.

A __unique identifier__ need only be unique within the scope of the tree in which it appears. A tree that contains two children, will always contain 3 unique keys. Likewise, a tree with a size of 549 will contain 549 unique keys.

If a child's parent property is equal to `this.id` a reference will be saved. In the event that these two values do not match, a derivative instance of the child will be created with its parent value modified to equal `this.id`.

Custom properties with a value of `undefined` will be ignored. All other values will be stored as instance properties. All object references will be frozen.

__Return value__

An instance of `Tree` will always be returned.

__Example 1: Empty Trees__

In cases where `config.key`, `config.parent` and `config.children` all contain default values and there are no custom properties, an empty tree will be returned. Empty trees are the only trees that have a `size` of zero.

```js
const empty = Tree()
console.log(empty.isEmpty()) // true
```
__Example 2: Childless Trees__

```js
const childless = Tree({
  key: 66,
  parent: 55,
})

console.log(childless.key) // 66
console.log(childless.parent) // 55
console.log(childless.children) // []
console.log(childless.size) // 1
console.log(childless.isEmpty()) // false
```

__Example 3: Nested Tree__

The following code creates a perfect binary tree with a height of 3.

```js
const tree = Tree({ key: 1, children: [
  Tree({ key: 2, children: [
    Tree({ key: 4 }),
    Tree({ key: 5 })
  ]}),
  Tree({ key: 3, children: [
    Tree({ key: 6 }),
    Tree({ key: 7 })
  ]})
]})
```


## Methods

### add()

Adds one tree to another as a subtree.

If the descendant's parent exists in this tree, the descendant will be appended to it's parent. If the descendant's parent does not exist in this tree, the descendant will be appended to this tree's root. If the descendant is not an instance of `Tree` or it is an empty Tree, `this` will be returned.

#### Syntax
```js
tree.add([descendant])
```


##### Parameters

| Name       | Type | Default   | Description
| ---------- | ---- | --------- | -------------------------
| descendant | Tree | undefined | A tree to add as a subtree.

##### Return value

A derivative `Tree` with the descendant added to its parent.

#### Examples
##### Add one tree to another
```js
var a = Tree({ key: 22 })
var b = Tree({ key: 33 })
var c = a.add(b)

console.log(a.size) // 1
console.log(b.size) // 1
console.log(c.size) // 2
```

### delete()

Remove a subtree.

#### Syntax
```js
tree.delete(key)
```

#### Parameters
| Name | Type          | Description
| ---- | ------------- | -------------------------
| key  | number|string | Unique identifier of a subtree to remove.

#### Return value

A derivative tree without the subtree indicated by the `key` parameter. In cases where the key of the root tree is provided as the key parameter, an empty tree will be returned.

### forEach()
Execute a given function once for each tree (root + all subtrees).

This method works in a very similar fashion to [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

#### Syntax
```js
tree.forEach(callback, [thisArg])
```

#### Parameters
| Name     | Type     | Default   | Description
| -------- | ---------| --------- | -------------------------
| callback | function | undefined | Function to execute on each tree.
| thisArg  | object   | undefined | Value to use as `this` for each iteration.

#### Return value

The return value of this method is `undefined`.

### get()

Get a reference to a subtree by key.

#### Syntax
```js
tree.get(key)
```

#### Parameters
| Name | Type          | Default   | Description
| ---- | ------------- | --------- | -------------------------
| key  | number|string | undefined | The unique identifier of the tree to return.

#### Return value

A value of `Tree` will be returned if the requested tree can be found as a descendant. If not, `null` will be returned.


### has()

Does this tree have a tree with a given key?

#### Syntax
```js
tree.has(key)
```

#### Parameters
| Name | Type          | Default   | Description
| ---- | ------------- | --------- | -------------------------
| key  | number|string | undefined | The unique identifier of the tree in question.

#### Return value

`boolean` - `true` if the requested tree was found; `false` otherwise. This method will consider the root tree as well as all of its subtrees.


### isEmpty()

Is this tree empty?

An empty tree has the following properties:

Name     | Value
-------- | ------
key      | null
parent   | null
children | []
size     | 0


#### Syntax
```js
tree.isEmpty()
```

#### Parameters

This method recognizes no properties.

#### Return value

`Boolean` - A value of `true` will be returned if the tree is empty; `false` will be returned otherwise.


### sort()

Recursively sort all subtrees.

#### Syntax
```js
tree.sort([options])
```

#### Parameter 1: `options {Object}` _optional_

| Property   | Type     | Default   | Description
| ---------- | -------- | --------- | -------------------------
| comparator | Function | Function  | Custom sort function.
| deep       | Boolean  | true      | Should all trees be sorted?

When `options.comparator` is not provided, this method will sort subtrees by `key` in ascending order.

When options.deep is `true` all of its subtrees will be sorted. When `false` only the root tree's children will be sorted.

#### Return value

Returns a derivative instance of `Tree` with subtrees sorted.

###  fromArray()

Assemble a list of trees into a single tree by nesting instance based on their parent/child relationship.

#### Syntax
```js
Tree.fromArray(trees, [options])
```

##### Parameter 1: `trees {Array}`

A list of `Tree` instances from which to build a new tree.


##### Parameter 2:

| Property   | Type     | Default  | Description
| ---------- | -------- | -------- | -------------------------
| height     | number   | 0        | The height that the generated tree is allowed grow to. If defined, this value must be a integer greater than 1.
| comparator | function | by key   | Optional sort function.

##### Return value

`Tree` - A composite tree containing all trees represented in the `trees` parameter.

#### Examples

##### Default Usage

Create a new tree of height 3 from a flat list.

```js
var tree = Tree.fromArray([
  Tree({ key:  1, parent:  0 }),
  Tree({ key:  2, parent:  1 }),
  Tree({ key:  3, parent:  2 })
])

console.log(tree.size) // 3
console.log(tree.children[0] ) // { key: 2 }
console.log(tree.children[0].children[0] ) // { key: 1 }
```

##### Orphan collection.

Trees will be appended to the root tree if their parent does not exist in the list. If no root exists one will be created from an empty tree.

```js
var tree = Tree.fromArray([
  Tree({ key: 2, parent: 5 }),
  Tree({ key: 3, parent: 6 }),
  Tree({ key: 4, parent: 7 }),
])

console.log(tree.size) // 4
console.log(tree.children[0].key) // 2
console.log(tree.children[1].key) // 3
console.log(tree.children[2].key) // 4
```

##### Height reduction

```js
var trees = [
  Tree({ key: 1, parent: 0 }),
  Tree({ key: 2, parent: 1 }),
  Tree({ key: 3, parent: 2 }),
  Tree({ key: 4, parent: 3 }),
  Tree({ key: 5, parent: 4 }),
]

var tree2 = Tree.fromArray(trees, { height: 2 })

console.log(tree2.size) // 5
console.log(tree2.children.length) // 4

var tree3 = Tree.fromArray(trees, { height: 3 })

console.log(tree3.size) // 5
console.log(tree3.children.length) // 1
console.log(tree3.children[0].children.length) // 3

var tree4 = Tree.fromArray(trees, { height: 4 })

console.log(tree4.size) // 5
console.log(tree4.children.length) // 1
console.log(tree4.children[0].children.length) // 1
console.log(tree4.children[0].children[0].children.length) // 2
```
