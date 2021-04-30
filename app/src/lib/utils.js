export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

export function clamp(min, max, value) {
  return min > value ? min : max < value ? max : value
}
