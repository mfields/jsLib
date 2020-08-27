# BoundNumber

This module exports a single constructor, `BoundNumber()`, which can be used to create immutable instances of a number that has both upper and lower bounds.

## Usage

```js
import { BoundNumber } from '@mfields/lib/BoundNumber'
```

## Properties

Each instance of `BoundNumber` contains the following enumerable properties.

| Name  | Type   | Default   | Description
| ----- | ------ | --------- | -----------
| value | number | null      | The bound number.
| min   | number | -Infinity | The lower bound.
| max   | number | Infinity  | The upper bound.

##  Constructor

Creates a new instance of `BoundNumber`. This function may be called with or without the `new` operator.

__Syntax 1__
```js
BoundNumber(value, min, max)
```

__Syntax 1: Parameters__

| Name  | Type   | Description
| ----- | ------ | -----------
| value | number | The number to be bound.
| min   | number | The lower bound.
| max   | number | The upper bound

__Syntax 2__
```js
BoundNumber(value, interval)
```

__Syntax 2: Parameters__

| Name     | Type   | Description
| -------- | ------ | -----------
| value    | number | The number to be bound.
| interval | number | An object having both min and max properties.


__Example 1: no parameters__

```js
var b = BoundNumber()
console.log(BoundNumber.min) // -Infinity
console.log(BoundNumber.max) // Infinity
console.log(BoundNumber.value) // null
```

__Example 2: value only__

```js
var b = BoundNumber()
console.log(b.min) // -Infinity
console.log(b.max) // Infinity
console.log(b.value) // 3
```

__Example 3: value, min, max__

```js
var b = BoundNumber(4, 3, 5)
console.log(b.value) // 4
console.log(b.min) // 3
console.log(b.max) // 5
```

__Example 4: value, interval__

```js
var b = BoundNumber(4, { min: 3, max: 5 })
console.log(b.value) // 4
console.log(b.min) // 3
console.log(b.max) // 5
```

__Example 4: min + max are reversed__

In cases where `min` is greater than `max` the values will be swapped before they are saved to properties.

```js
var b = BoundNumber(4, 5, 3)
console.log(b.value) // 4
console.log(b.min) // 3
console.log(b.max) // 5
```

## Methods

### has()

Predicate method that answers the question: _Does this BoundNumner have the potential to become another number?_

#### Syntax
```js
bn.has(n)
```

##### Parameters

| Name  | Type   | Description
| ----- | ------ | -------------------------
| n     | number | The potential value.

##### Return value

`boolen` - `true` if the the `BoundNumber` has the potential to become `n`, `false` if ir does not.

__Example 1: potential exists__

```js
var bn = BoundNumber(4, 3, 5)
console.log(i.has(3)) // true
console.log(i.has(4)) // true
console.log(i.has(5)) // true
```

__Example 2: potential does not exist__

```js
var bn = BoundNumber(4, 3, 5)
console.log(i.has(1)) // false
console.log(i.has(7)) // false
console.log(i.has('this is a string')) // false
```

### project()

Translate this BoundValue to a new interval. This method produces a new instance of `BoundValue` with its `min` and `max` properties set to those of the new interval. Its `value` is proportionally equal to the old value within the scope of the new interval.

For example, if the orignal instance's value is 20 within the interval of `[0, 100]` and it is then _projected_ to the interval `[1, 10]`, the `value` property of the new instance wil be 2.


#### Syntax 1
```js
bn.project(min, max)
```

| Name  | Type   | Description
| ----- | ------ | -----------
| min   | number | The lower bound of the new interval.
| max   | number | The upper bound of the new interval

__Syntax 2__
```js
bn.project(interval)
```

__Syntax 2: Parameters__

| Name     | Type   | Description
| -------- | ------ | -----------
| interval | object | An object having both min and max properties.


##### Return value

A new instance of `BoundNumber` whose value whos has been translated from the original to the new interval.
