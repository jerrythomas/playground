import { isEmpty } from 'lodash'
import { cycle } from '$lib/utils'

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
export function move(cells, cursor, stepX = 0, stepY = 0) {
  const size = cells.length - 1

  let nextY = cycle(0, size, (cursor.y || 0) + stepY)
  let nextX = cycle(0, size, (cursor.x || 0) + stepX)
  let i = 1
  // should we exlude solved?
  while (i <= size && cells[nextY][nextX].blank) {
    nextY = cycle(0, size, nextY + stepY)
    nextX = cycle(0, size, nextX + stepX)
    i++
  }

  return { x: nextX, y: nextY }
}

export function findKey(allowed, char, used) {
  return allowed.findIndex((el) => el.used == used && el.char == char)
}
/**
 * An action to handle keyboard events in the crossword.
 *
 * @param obj {dict} Object to be checked
 */
export function keyboard(node, { allowed, cells, cursor }) {
  let data = { allowed, cells, cursor }
  const actions = {
    ArrowUp: () => move(data.cells, data.cursor, 0, -1),
    ArrowDown: () => move(data.cells, data.cursor, 0, 1),
    ArrowLeft: () => move(data.cells, data.cursor, -1, 0),
    ArrowRight: () => move(data.cells, data.cursor, 1, 0)
  }

  function keydown(e) {
    e.preventDefault()
    e.stopPropagation()
    const { x, y } = data.cursor
    if (e.key in actions) {
      const cursor = actions[e.key]()
      node.dispatchEvent(new CustomEvent('move', { detail: cursor }))
    } else if (e.key === ' ' || e.key === 'Enter')
      node.dispatchEvent(new CustomEvent('move', { detail: data.cursor }))
    else if (e.key === 'Backspace' || e.key === 'Delete') {
      if (!data.cells[y][x].solved) {
        const index = findKey(data.allowed, data.cells[y][x].answer, true)
        console.log(e.key, index)
        if (index != -1)
          node.dispatchEvent(new CustomEvent('change', { detail: { index, remove: true } }))
      }
    } else if (!isEmpty(data.cursor) && data.cells[y][x].answer === '') {
      // should it be allowed to replace the chars from available keys
      const index = findKey(data.allowed, e.key.toUpperCase(), false)
      console.log(index, e.key.toUpperCase(), data.allowed)
      if (index != -1)
        node.dispatchEvent(new CustomEvent('change', { detail: { index, remove: false } }))
    } else {
      console.log(' cell is not empty or key is not allowed', data.cells[y][x], e.key)
    }
  }

  window.addEventListener('keyup', keydown)
  return {
    update({ allowed, cells, cursor }) {
      data.allowed = allowed
      data.cells = cells
      data.cursor = cursor
    },
    destroy() {
      window.removeEventListener('keyup', keydown)
    }
  }
}
