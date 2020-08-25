# @mfields/lib

A collection of JavaScript functions.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```
npm install @mfields/lib
```

## Modules

### BoundNumber

### Interval

### Tree
Constructor function which creates immutable general tree instances. [Read more about Tree](/Tree)


###  Interval()

#### Syntax
```
Interval(i)
```

##### Parameters
| Name  | Type     | Default   | Description
| ----- | -------- | --------- | -----------
| `i`   | `string` | `""`      | String representation of an interval using [interval notation](https://www.ck12.org/algebra/intervals-and-interval-notation/lesson/intervals-and-interval-notation-calc/)

###### Properties

| Name     | Type     | Default | Description
| -------- | -------- | ------- | -----------
| `min`    | `number` | `0`     | The lower bound
| `max`    | `number` | `0`     | The upper bound
| `length` | `number` | `0`     | The quantity of values

#### Examples

##### Closed interval
```
var i = Interval('[3,7]')
```

##### Open interval
```
var i = Interval('(3,7)')
```

##### Half-open interval
```
var i = Interval('(3,7]')
```

##### Half-closed interval
```
var i = Interval('[3,7)')
```
