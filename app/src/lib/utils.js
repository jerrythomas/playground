/**
 * Returns the sum of an array of numbers
 *
 * @param arr {array} Array to be summed
 */
export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0)
}

/**
 * Checks if an object is empty or not
 *
 * @param obj {dict} Object to be checked
 */
export function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

/**
 * Sorts the keys of an object and returns the updated object
 *
 * @param obj {dict} Object to be checked
 */
export function sorted(obj) {
  return Object.fromEntries(Object.entries(obj).sort())
}

/**
 * Keeps `value` between a lower and upper limit.
 *
 * @param lower {int} Lower limit of the cycle range
 * @param upper {int} Upper limit of the cycle range
 * @param value {int} Value to be checked between the limits
 */
export function clamp(lower, upper, value) {
  return lower > value ? lower : upper < value ? upper : value
}

/**
 * Keeps `value` between a lower and upper limit. When value crosses either side, it is cycled to the other side
 *
 * @param lower {int} Lower limit of the cycle range
 * @param upper {int} Upper limit of the cycle range
 * @param value {int} Value to be checked between the limits
 */
export function cycle(lower, upper, value) {
  return value < lower ? upper : value > upper ? lower : value
}

/* lodash-es omit fails es import */
export function omit(input, keys) {
  const selectedKeys = Object.keys(input).filter((key) => !keys.includes(key))
  const result = {}
  selectedKeys.map((key) => (result[key] = input[key]))
  return result
}

export function pick(input, keys) {
  const result = {}
  keys.map((key) => (result[key] = input[key]))
  return result
}
/**
 * Generates and returns an array
 *
 * @param start {int} Starting value of the array
 * @param length {int} Number of items in the array
 */
export function range(start, length) {
  return [...Array(length).keys()].map((i) => i + start)
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

/**
 * Move the current cursor in any of the eight directions
 * using a combination of steps for either axis. Cells are
 * skipped if they are blank or have been solved.
 *
 * @param cells  {array} A square two dimentional array
 * @param cursor {dict}  Current cursor with (x, y) coordinates
 * @param stepX  {int}   The step size to be used on X axis
 * @param stepY  {int}   The step size to be used on Y axis
 */
export function stepper(cells, cursor, stepX = 0, stepY = 0, skip = () => false) {
  const size = cells.length - 1

  let nextY = cycle(0, size, (cursor.y || 0) + stepY)
  let nextX = cycle(0, size, (cursor.x || 0) + stepX)
  let i = 1

  while (i <= size && skip(cells, nextX, nextY)) {
    nextY = cycle(0, size, nextY + stepY)
    nextX = cycle(0, size, nextX + stepX)
    i++
  }

  return { x: nextX, y: nextY }
}
