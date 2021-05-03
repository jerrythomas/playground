export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

export function clamp(min, max, value) {
  return min > value ? min : max < value ? max : value
}

/* lodash omit fails es import */
export function omit(input, keys) {
  const xclKeys = Object.keys(input).filter((key) => !keys.includes(key))
  const result = {}
  xclKeys.map((key) => (result[key] = input[key]))
  return result
}

/**
 * Returns an array with arrays of the given size.
 *
 * @param input {Array} Array to split
 * @param size {Integer} Size of every group
 */
export function chunkArray(input, size) {
  var results = []
  var values = [...input]
  while (values.length) {
    results.push(values.splice(0, size))
  }
  return results
}
