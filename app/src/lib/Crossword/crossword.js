import { isEmpty, isEqual } from 'lodash'

export function cycle(lower, upper, value) {
  return value < lower ? upper : value > upper ? lower : value
}

export function skipBlanks(cells, x, y) {
  return cells[y][x].blank
}
export function skipFilled(cells, x, y) {
  return (cells[y][x].value || '') !== ''
}
function markCharUsage(allowed, char, usage = true) {
  const index = allowed.findIndex((el) => el.used == !usage && el.char == char)
  if (index > -1) allowed[index].used = usage
  return allowed
}

export function takeCharFromAllowed(allowed, char) {
  return markCharUsage(allowed, char, true)
}

export function returnCharToAllowed(allowed, char) {
  return markCharUsage(allowed, char, false)
}
export function replaceAllowed(allowed, oldValue, newValue) {
  allowed = markCharUsage(allowed, oldValue, false)
  if (newValue !== '') allowed = markCharUsage(allowed, newValue, true)
  return allowed
}
export function getClueForDirection(clues, cells, direction, x, y) {
  direction = direction || 'across'
  if (direction in cells[y][x].directions) {
    const number = cells[y][x].directions[direction].number
    return clues[direction][number]
  }
}
export function clearErrors(clue, cells) {
  return markFailed(clue, cells, false)
  //     clue.cells.map((pos) => {
  //       cells[pos.y][pos.x].error = true
  //     })
}
export function clearCells(clue, cells) {
  clue.cells.map((pos) => {
    cells[pos.y][pos.x].error = false
    if (!cells[pos.y][pos.x].solved) {
      clue.allowed = replaceAllowed(clue.allowed, cells[pos.y][pos.x].value, '')
      cells[pos.y][pos.x].value = ''
    }
  })
  console.log(clue.allowed)
  return cells
}
export function markFailed(clue, cells, failed = true) {
  clue.cells.map((pos) => {
    cells[pos.y][pos.x].error = failed
  })
  return failed
}

export function markSolved(clue, cells, clues) {
  const other = clue.direction === 'across' ? 'down' : 'across'
  clue.cells.map((pos) => {
    cells[pos.y][pos.x].solved = true
    if (other in cells[pos.y][pos.x].directions) {
      // mark the key as used for the other direction also
      const number = cells[pos.y][pos.x].directions[other].number
      let index = takeCharFromAllowed(clues[other][number].allowed, cells[pos.y][pos.x].value)
      //       console.log(index, other, number)
    }
  })
}

export function navigateTo({ x, y }, current, cells, clues) {
  const clue = getClueForDirection(clues, cells, current.clue.direction, x, y)

  if (!isEqual(clue, current.clue)) {
    current.clue.cells.map((pos) => {
      cells[pos.y][pos.x].error = false
      if (!cells[pos.y][pos.x].solved) {
        current.clue.allowed = replaceAllowed(current.clue.allowed, cells[pos.y][pos.x].value, '')
        cells[pos.y][pos.x].value = ''
      }
    })
    console.log('nav', current.clue.allowed)
  }
  return { clue, cell: { x, y }, cells, current }
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
