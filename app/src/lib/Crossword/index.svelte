<script>
  import { onMount } from 'svelte'
  import cssVars from 'svelte-css-vars'
  import Cell from './Cell.svelte'
  import ClueKeys from './ClueKeys.svelte'
  import { keyboard, findKey, move } from './actions'
  import { isEqual, isEmpty } from 'lodash'
  import { omit } from '$lib/utils'

  export let size = 0
  export let cells
  export let clues
  export let showKeyboard = true

  let hideUntilMounted = true
  let current = {
    cell: {},
    clue: {}
  }
  $: allowedKeys = isEmpty(current.clue)
    ? {}
    : omit(clues[current.clue.direction][current.clue.number], ['cells', 'answer', 'direction'])
  $: console.log(hideUntilMounted)
  onMount(async () => {
    hideUntilMounted = false
  })

  $: focussed = !isEmpty(current.clue)
  $: style = { size: size }

  function toggle(directions, current) {
    const whichWay = ((current === 'across' ? 0 : 1) + 1) % directions.length
    return directions[whichWay]
  }

  function retain(directions, current) {
    return directions.includes(current) ? current : directions[0]
  }
  function getNextClue(clues, cells, current, next) {
    const { x, y } = next
    const directions = Object.keys(cells[y][x].directions)
    const which = isEqual(current.cell, next)
      ? toggle(directions, current.clue.direction)
      : retain(directions, current.clue.direction)
    const clue = { direction: which, number: cells[y][x].directions[which].number }
    let cell = isEqual(current.clue, clue) ? next : clues[clue.direction][clue.number].cells[0]
    return { cell, clue }
  }

  function clearCells(clues, current) {
    const clue = clues[current.clue.direction][current.clue.number]
    clue.cells.map((cursor) => {
      cells[cursor.y][cursor.x]['active'] = false
      cells[cursor.y][cursor.x].error = false
      if (!cells[cursor.y][cursor.x].solved) {
        // cells[cursor.y][cursor.x].answer = ''
        let index = findKey(allowedKeys.allowed, cells[cursor.y][cursor.x].answer, true)
        if (index != -1) onChange(cursor, index, true)
      }
    })
    // cells[current.cell.y][current.cell.x]['focus'] = false
  }
  function hasPending(clues, current) {
    const clue = clues[current.clue.direction][current.clue.number]
    let pending = false

    for (let i = 0; !pending && i < clue.cells.length; i++) {
      const { x, y } = clue.cells[i]
      // console.log(x, y, cells[y][x].blank, cells[y][x].answer)
      pending = !cells[y][x].blank && cells[y][x].answer === ''
    }

    // console.log('pending', pending)
    return pending
  }
  function activateCells(clues, current) {
    const clue = clues[current.clue.direction][current.clue.number]
    clue.cells.map((cursor) => {
      cells[cursor.y][cursor.x]['active'] = true
    })
    // cells[current.cell.y][current.cell.x]['focus'] = true
  }
  function changeFocus(clues, current, focus) {
    const clue = clues[current.clue.direction][current.clue.number]
    clue.cells.map((cursor) => {
      cells[cursor.y][cursor.x]['active'] = focus
    })
    cells[current.cell.y][current.cell.x]['focus'] = focus
  }

  function handleCursorMoved(e) {
    // console.log(e.detail);
    const next = getNextClue(clues, cells, current, e.detail)
    if (!isEqual(next.clue, current.clue)) {
      if (!isEmpty(current.clue)) {
        clearCells(clues, current)
      }
      current.clue = next.clue
      // current.cell = next.cell
      activateCells(clues, current)
    }
    moveCursorTo(next.cell)

    // console.log(current);
  }
  function validate(clues, current) {
    // loop thrugh the cells of the current clue
    // if there is any empty cell skip validation
    // if any of the values are wrong then mark all cells as error otherwise mark all as solved
    const clue = clues[current.clue.direction][current.clue.number]
    let error = false
    // let skipped = false
    clue.cells.map((cursor) => {
      // skipped = skipped || cells[cursor.y][cursor.x].answer === ''
      error =
        error ||
        (!cells[cursor.y][cursor.x].solved &&
          cells[cursor.y][cursor.x].answer !== cells[cursor.y][cursor.x].expected)
    })
    // if (!skipped) {
    clue.cells.map((cursor) => {
      cells[cursor.y][cursor.x].error = error
      cells[cursor.y][cursor.x].solved = cells[cursor.y][cursor.x].solved || !error
    })
    if (!error) {
      const other = current.clue.direction === 'across' ? 'down' : 'across'

      clue.cells.map((cursor) => {
        cells[cursor.y][cursor.x].solved = true
        // update the clue to mark the allowed keys as used.
        if (other in cells[cursor.y][cursor.x].directions) {
          const number = cells[cursor.y][cursor.x].directions[other].number
          const index = findKey(
            clues[other][number].allowed,
            cells[cursor.y][cursor.x].answer,
            false
          )
          console.log(other, number, cells[cursor.y][cursor.x].answer, index)
          if (index != -1) clues[other][number].allowed[index].used = true
        }
      })
    }
    // }
  }
  function clearErrors() {
    const clue = clues[current.clue.direction][current.clue.number]
    clue.cells.map((cursor) => {
      cells[cursor.y][cursor.x].error = false
    })
  }
  function onChange(cursor, index, remove = false) {
    cells[cursor.y][cursor.x].answer = remove ? '' : allowedKeys.allowed[index].char
    allowedKeys.allowed[index].used = !remove
  }
  function moveCursorTo(nextCell) {
    if (!isEmpty(current.cell)) cells[current.cell.y][current.cell.x]['focus'] = false
    current.cell = nextCell
    cells[current.cell.y][current.cell.x]['focus'] = true
  }
  function moveToNextCell() {
    const stepX = current.clue.direction === 'across' ? 1 : 0
    const stepY = stepX == 0 ? 1 : 0

    // skip non empty cells?
    const nextCell = move(cells, current.cell, stepX, stepY)
    console.log(nextCell, stepX, stepY)
    if (!isEqual(nextCell, current.cell)) {
      moveCursorTo(nextCell)
    }
  }

  function handleChange(e) {
    console.log('change', e.detail)
    onChange(current.cell, e.detail.index, e.detail.remove)
    if (hasPending(clues, current)) {
      if (e.detail.remove) {
        clearErrors()
      } else {
        moveToNextCell()
      }
    } else {
      validate(clues, current)
    }
  }
  function replaceChar(char) {
    const { x, y } = current.cell

    if (cells[y][x].answer !== '' && !cells[y][x].solved) {
      const index = findKey(allowedKeys.allowed, cells[y][x].answer, true)
      onChange(current.cell, index, true)
    }
    const index = findKey(allowedKeys.allowed, char, false)
    onChange(current.cell, index, false)
  }

  function handleKeyClick(e) {
    console.log('key click', e.detail)
    replaceChar(e.detail.char)
    moveToNextCell()
  }
</script>

<div class="flex flex-col items-center justify-center text-lg" class:hideUntilMounted>
  <ul
    class="grid gap-px bg-gray-700 border border-gray-700 focus:border-blue-600 focus:border-2 outline-none"
    use:cssVars={style}
    use:keyboard={{ allowed: allowedKeys.allowed, cells, cursor: current.cell }}
    on:move={handleCursorMoved}
    on:change={handleChange}
    tabindex="0">
    {#each cells as row}
      {#each row as cell}
        <Cell {...omit(cell, ['directions'])} on:move={handleCursorMoved} />
      {/each}
    {/each}
  </ul>
  {#if focussed}
    <span>{current.clue.direction}</span>
    <span>{current.clue.number}</span>
  {/if}
  {#if showKeyboard && focussed}
    <ClueKeys {...allowedKeys} on:click={handleKeyClick} />
  {/if}
</div>

<style>
  div {
    min-width: calc(var(--size) * 3em);
    overflow: scroll;
  }
  .hideUntilMounted {
    @apply hidden;
  }
  ul {
    min-width: calc(var(--size) * (2.5rem + 1px) + 1px);
    grid-template-rows: repeat(var(--size), minmax(0, 1fr));
    grid-template-columns: repeat(var(--size), minmax(0, 1fr));
  }
</style>
