<script>
  import cssVars from 'svelte-css-vars'
  import { isEqual, isEmpty } from 'lodash'
  import { navigate } from './keyboard'
  import { stepper, omit } from '$lib/utils'

  import Cell from './Cell.svelte'
  import ClueKeys from './ClueKeys.svelte'

  import { skipBlanks, skipFilled, replaceAllowed } from './crossword'
  import { getClueForDirection, markFailed, clearErrors, markSolved, navigateTo } from './crossword'

  export let size
  export let cells
  export let clues

  export let showKeyboard = true

  let hasFailed = false
  let first = Object.keys(clues['across'])[0]
  let current = {
    clue: clues['across'][first],
    cell: clues['across'][first].cells[0]
  }

  $: style = { size: size }
  $: allowed = current.clue.allowed.filter((el) => !el.used).map(({ char }) => char)
  $: activeCell = { x: current.cell.x, y: current.cell.y, allowed }
  $: focussed = !isEmpty(current.cell)
  function clearCells(clue) {
    clue.cells.map((pos) => {
      cells[pos.y][pos.x].error = false
      if (!cells[pos.y][pos.x].solved) cells[pos.y][pos.x].value = ''
    })
    return cells
  }
  function validate(current) {
    const filled =
      current.clue.allowed.filter(({ used }) => used).length == current.clue.answer.length
    const solved = current.clue.allowed.filter(({ valid, used }) => valid && !used).length == 0

    if (filled) {
      if (solved) {
        markSolved(current.clue, cells, clues)
      } else {
        hasFailed = markFailed(current.clue, cells)
      }
    } else {
      const x = current.clue.direction === 'across' ? 1 : 0
      const y = x == 1 ? 0 : 1
      const coords = stepper(cells, current.cell, x, y, skipFilled)
      current = navigateTo(coords, current, cells, clues)
    }
    return current
  }
  function switchClue(clue) {
    if (hasFailed) {
      hasFailed = clearErrors(current.clue, cells)
    }
    if (!isEqual(clue, current.clue)) {
      current.clue.cells.map((pos) => {
        cells[pos.y][pos.x].error = false
        if (!cells[pos.y][pos.x].solved) {
          current.clue.allowed = replaceAllowed(current.clue.allowed, cells[pos.y][pos.x].value, '')
          cells[pos.y][pos.x].value = ''
        }
      })
      current.clue = clue
    }
  }

  const actions = {
    moveBy: ({ x, y }) => {
      const coords = stepper(cells, current.cell, x, y, skipBlanks)
      actions['moveTo'](coords)
    },
    moveTo: ({ x, y }) => {
      const result = navigateTo({ x, y }, current, cells, clues)
      if (hasFailed) {
        hasFailed = clearErrors(current.clue, cells)
      }
      console.log(current.clue.allowed, result.clue.allowed)
      current.cell = result.cell
      current.clue = result.clue
      cells = result.cells
    },
    replace: ({ x, y, value }) => {
      if (cells[y][x].solved) return

      current.clue.allowed = replaceAllowed(current.clue.allowed, cells[y][x].value, value)
      cells[y][x].value = value
      current = validate(current)
    },
    remove: ({ x, y }) => {
      if (cells[y][x].solved) return

      if (hasFailed) {
        hasFailed = clearErrors(current.clue, cells)
      }
      current.clue.allowed = replaceAllowed(current.clue.allowed, cells[y][x].value, '')
      cells[y][x].value = ''
      // switchClue(clue)
    },
    toggle: ({ x, y }) => {
      const other = current.clue.direction === 'across' ? 'down' : 'across'
      const clue = getClueForDirection(clues, cells, other, x, y)
      switchClue(clue)
      console.log(clue, current)
    }
  }

  function handleChange(e) {
    actions[e.detail.action](e.detail)
  }

  function handleKeyClick(e) {
    actions['replace']({
      x: current.cell.x,
      y: current.cell.y,
      value: e.detail.char
    })
  }
</script>

<div
  class="flex flex-col items-center justify-center text-lg"
  use:navigate={activeCell}
  on:change={handleChange}>
  <ul
    class="grid gap-px bg-gray-700 border border-gray-700 focus:border-blue-600 focus:border-2 outline-none"
    use:cssVars={style}
    tabindex={0}>
    {#each cells as row, y}
      {#each row as cell, x}
        <Cell
          {...omit(cell, ['directions', 'position'])}
          cursor={current.cell}
          clue={current.clue}
          on:change={handleChange} />
      {/each}
    {/each}
  </ul>
  {#if showKeyboard && focussed}
    <ClueKeys
      clue={current.clue.clue}
      number={current.clue.number}
      allowed={current.clue.allowed}
      on:click={handleKeyClick} />
  {/if}
</div>

<style>
  ul {
    min-width: calc(var(--size) * (2.5rem + 1px) + 1px);
    grid-template-rows: repeat(var(--size), minmax(0, 1fr));
    grid-template-columns: repeat(var(--size), minmax(0, 1fr));
  }
</style>
