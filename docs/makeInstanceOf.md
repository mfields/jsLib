# makeInstanceOf

This module exports a single function, `makeInstanceOf()`, which makes an instance of a provided constructor with a variable number of arguments.

__Usage__

```js
import { makeInstanceOf } from '@mfields/lib/makeInstanceOf'
```

__Signature__
```js
makeInstanceOf(constructor, args)
```

| Name        | Type     | Description
| ----------- | -------- | -----------
| constructor | function | The function used to create an instance.
| args        | object   | Arguments to be passed to constructor.


__Example 1: make a string__

```js
var s = makeInstanceOf(String, 'abc')
console.log(s) // String { "a" }
```

__Example 2: make a number__

```js
var n = makeInstanceOf(Number, 123)
console.log('n', n)
```

__Example 3: Scope-safe constructor__

```js
function PandaBear (one, two, three) {
  if (!(this instanceof PandaBear)) {
    return makeInstanceOf(PandaBear, arguments)
  }
  this.one = one
  this.two = two
  this.three = three
}

var bear = PandaBear (1, 2, 3)
console.log(bear) // PandaBear { one: 1, two: 2, three: 3 }
```
