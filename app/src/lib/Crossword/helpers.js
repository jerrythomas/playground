import { shuffle, sampleSize } from 'lodash'
// import _ from 'lodash'
import { range, sorted, omit } from '$lib/utils'

const alphabets = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

/**
 * Returns a dict containing the follwoing attributes
 *
 *  - size: size of the crossword
 *  - clues: A dict containing the across and down clue arrays
 *  - cells: A two dimensional array containing the cells for the crossword
 *
 * @param input {Array} Array of dicts with crossword clues
 */
export function prepare(input) {
  const adjust = getMinValue(input)
  const size = getSize(input, adjust)

  let data = fixBounds(input, adjust)
  data = addNumbers(data)

  const clues = makeClues(data)
  const cells = makeCells(data, size)

  return { size, clues, cells }
}

/**
 * Returns the minimum value for x,y start points of the input
 *
 * @param input {Array} Array of dicts with crossword clues
 */
function getMinValue(input) {
  const xMin = input.map((d) => d.x)
  const yMin = input.map((d) => d.y)
  const adjust = Math.min(...xMin, ...yMin)
  return adjust
}

/**
 * Returns the maximum value based on start point and length of the answers
 *
 * @param input {Array} Array of dicts with crossword clues
 * @param adjust {int}  Value used to reduce from the x,y values
 */
function getSize(data, adjust = 0) {
  const xMax = data.map((d) => d.x - adjust + (d.direction === 'across' ? d.answer.length : 0))
  const yMax = data.map((d) => d.y - adjust + (d.direction === 'down' ? d.answer.length : 0))
  const size = Math.max(...xMax, ...yMax)
  return size
}

/**
 * Returns an array of updated crossword clues.
 *
 * - x and y values are adjusted by reducing the value adjust
 * - an id column is added
 * - array is sorted by x & y
 *
 * @param input {Array} Array of dicts with crossword clues
 * @param adjust {int}  Value used to reduce from the x,y values
 */
function fixBounds(input, adjust) {
  const data = input
    .map((d) => ({
      ...d,
      x: d.x - adjust,
      y: d.y - adjust,
      id: `${d.x - adjust}-${d.y - adjust}`
    }))
    .sort((a, b) => a.y - b.y || a.x - b.x)

  return data
}

/**
 * Returns an array of updated crossword clues after adding clue numbers
 * based on the sorted values of x & y
 *
 * @param input {Array} Array of dicts with crossword clues
 */
function addNumbers(input) {
  let lookup = {}
  let currentNumber = 1

  const data = input.map((d) => {
    let number
    if (d.id in lookup) number = lookup[d.id]
    else lookup[d.id] = number = currentNumber++

    return { ...d, number }
  })

  return data
}

/**
 * Returns a dict containing two arrays of clues for across and down
 *
 * @param input {Array} Array of dicts with crossword clues
 */
function makeClues(input) {
  let clues = { down: {}, across: {} }
  input.map((d) => {
    let cells = []
    const answer = Array.from(d.answer).map((char) => {
      return { char, valid: true }
    })
    const filler = sampleSize(alphabets, 4).map((char) => {
      return { char, valid: false }
    })
    const allowed = shuffle([...answer, ...filler])
    const props = omit(d, ['id', 'x', 'y'])
    if (d.direction === 'across') cells = range(d.x, d.answer.length).map((x) => ({ x, y: d.y }))
    else cells = range(d.y, d.answer.length).map((y) => ({ x: d.x, y }))
    clues[d.direction][d.number] = { ...props, allowed, cells }
  })

  return clues
}

/**
 * Returns a matrix of cell values for the crossword.
 *
 * @param input {Array} Array of dicts with crossword clues
 * @param size {int}  size of the crossword square
 */
function makeCells(input, size) {
  let cells = {}

  input.map((d) => {
    let chars = Array.from(d.answer)

    chars.map((answer, i) => {
      let x = d.x + (d.direction === 'across' ? i : 0)
      let y = d.y + (d.direction === 'down' ? i : 0)
      let number = d.number
      let id = `${x}-${y}`
      let first = i == 0

      if (!(id in cells)) {
        cells[id] = { x, y, directions: {}, number: null }
      }
      cells[id].number = first ? number : cells[id].number
      cells[id].directions[d.direction] = { first, number }

      cells[id].directions = sorted(cells[id].directions)
      // 			cells[id].directionKeys = Object.keys(cells[id].directions).sort()
      // 			cells[id].directionKeys = Object.keys(cells[id].directions)
    })
  })

  return asMatrix(cells, size)
}

/**
 * Returns a matrix with cell values
 *
 * @param cells {dict} dict containing cell values
 * @param size {int}  size of the crossword square
 */
function asMatrix(cells, size) {
  let indexes = [...Array(size).keys()]
  let matrix = []

  indexes.map((y) => {
    let row = []
    indexes.map((x) => {
      let key = `${x}-${y}`
      if (key in cells) {
        row = [...row, cells[key]]
      } else {
        row = [...row, { x, y, blank: true }]
      }
    })
    matrix = [...matrix, row]
  })
  return matrix
}
