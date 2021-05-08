// import { isEqual, isEmpty } from 'lodash'
import { cycle } from '$lib/utils'

/**
 * Move the current cursor in any of the eight directions
 * using a combination of steps for either axis. Cells are
 * skipped if they are blank or have been solved.
 *
 * @param cells  {array} A two dimentional array
 * @param cursor {dict}  Current cursor with (x, y) coordinates
 * @param stepX  {int}   The step size to be used on X axis
 * @param stepY  {int}   The step size to be used on Y axis
 */
function move(cells, cursor, stepX = 0, stepY = 0) {
  const maxY = cells.length - 1
  const maxX = cells[0].length - 1
  const size = Math.max(maxX, maxY)

  let nextY = cycle(0, maxY, (cursor.y || 0) + stepY)
  let nextX = cycle(0, maxX, (cursor.x || 0) + stepX)
  let i = 1

  while (i < size && (cells[nextY][nextX].solved || cells[nextY][nextX].blank)) {
    nextY = cycle(0, maxY, nextY + stepY)
    nextX = cycle(0, maxX, nextX + stepX)
    i++
  }

  return { x: nextX, y: nextY }
}

/**
 * An action to handle keyboard events in the crossword.
 *
 * @param obj {dict} Object to be checked
 */
export function keyboard(node, { cells, cursor }) {
  let data = { cells, cursor }
  const actions = {
    ArrowUp: () => move(data.cells, data.cursor, 0, -1),
    ArrowDown: () => move(data.cells, data.cursor, 0, 1),
    ArrowLeft: () => move(data.cells, data.cursor, -1, 0),
    ArrowRight: () => move(data.cells, data.cursor, 1, 0)
  }

  function keydown(e) {
    if (e.key in actions) {
      e.preventDefault()
      e.stopPropagation()
      const cursor = actions[e.key]()
      node.dispatchEvent(new CustomEvent('move', { detail: cursor }))
    } else if (e.key === ' ' || e.key === 'Enter')
      node.dispatchEvent(new CustomEvent('move', { detail: data.cursor }))
    else {
      console.log(e.key)
    }
  }

  window.addEventListener('keyup', keydown)
  return {
    update({ cells, cursor }) {
      data.cells = cells
      data.cursor = cursor
    },
    destroy() {
      window.removeEventListener('keyup', keydown)
    }
  }
}
