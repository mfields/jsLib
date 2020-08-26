export function isSameScalarArray (a, b) {
  if (a.length !== b.length) {
    return false
  }

  a.sort()
  b.sort()

  return a.every(function (v, i) {
    return v === b[i]
  })
}
