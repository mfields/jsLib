#  Interval

This module exports a single constructor, `Interval()`, which can be used to create immutable closed intervals.

## Usage

```js
import { Interval } from '@mfields/lib/Interval'
```

## Properties
Each instance of `Interval` contains the following properties.

| Name  | Type   | Default   | Description
| ----- | ------ | --------- | -----------
| min   | number | -Infinity | The lower bound.
| max   | number | Infinity  | The upper bound

##  Constructor
Creates a new instance of `Interval`. This function may be called with or without the `new` operator.

__Syntax__
```js
Interval(min, max)
```

__Parameters__

| Name  | Type   | Default   | Description
| ----- | ------ | --------- | -----------
| min   | number | -Infinity | The lower bound.
| max   | number | Infinity  | The upper bound


__Example 1: No parameters__

```js
var i = Interval()
console.log(i.min) // -Infinity
console.log(i.max) // Infinity
```

__Example 2: Numeric parameters in correct order__

```js
var i = Interval(3, 7)
console.log(i.min) // 3
console.log(i.max) // 7
```

__Example 3: Reversed parameters__

In cases where `min` is not less than `max` the values will be swapped before they are saved to properties.

```js
var i = Interval(7, 3)
console.log(i.min) // 3
console.log(i.max) // 7
```
## Methods

### has()

Predicate method that  answers the question: _Does this interval contain a given value?_

#### Syntax
```js
interval.has(n)
```

##### Parameters

| Name  | Type   | Description
| ----- | ------ | -------------------------
| n     | number | The value to search for.

##### Return value

`boolen` - `true` if the given value exists within this interval, `false` if not.

__Example 1: Value exists in interval__

```js
var i = Interval(3,5)
console.log(i.has(3)) // true
console.log(i.has(4)) // true
console.log(i.has(5)) // true
```

__Example 2: Value does not exist in interval__

```js
var i = Interval(3,5)
console.log(i.has(1)) // false
console.log(i.has(7)) // false
console.log(i.has('this is a string')) // false
```

### isFinite()

Predicate method that answers the question: _Is this interval finite?_

#### Syntax
```js
interval.isFinite()
```

##### Parameters

This method does not accept any parameters.

##### Return value

`boolen` - `true` if both the `min` and `max` properties are not infinite, `false` if either `min` or `max` is infinite.
