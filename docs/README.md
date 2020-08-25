# @mfields/range.js


This is a simple javascript library which allows the easy creation and syncing of _bound values_. In this context, a bound value is defined as a floating point number that has a definite upper and lower boundary. This project was inspired by a problem I faced in a canvas animation exercise:

* There is a circle.
* When the circle's z index increases the color should become darker.
* When the circle's z index decreases the color should become lighter.
* Z index is a number between -300 and 300.
* The color brightness is a color between 10 and 100.

While it wasn't very hard to figure out the math to accomplish this task, I really wished that _something_ existed that would make this a bit easier. I'm not sure if anyone will get much use out of this, but I had a lot of fun putting it together and learned a thing or 10 about javascript during the process.

For the time being you can find hints about usage in the [test file](https://github.com/mfields/jsRange.js/blob/master/test/unit/main.js).


## API Documentation

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
