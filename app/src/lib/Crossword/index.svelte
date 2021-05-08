<script>
  import { onMount } from 'svelte'
  import cssVars from 'svelte-css-vars'
  import Cell from './Cell.svelte'
  import ClueKeys from './ClueKeys.svelte'
  import { keyboard } from './actions'
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
    clue.cells.map((index) => {
      cells[index.y][index.x]['active'] = false
      if (!cells[index.y][index.x].solved) cells[index.y][index.x].answer = ''
    })
    cells[current.cell.y][current.cell.x]['focus'] = false
  }

  function activateCells(clues, current) {
    const clue = clues[current.clue.direction][current.clue.number]
    clue.cells.map((index) => {
      cells[index.y][index.x]['active'] = true
    })
    cells[current.cell.y][current.cell.x]['focus'] = true
  }

  function handleCursorMoved(e) {
    // console.log(e.detail);
    const next = getNextClue(clues, cells, current, e.detail)
    if (!isEmpty(current.clue)) {
      clearCells(clues, current)
    }
    current.clue = next.clue
    current.cell = next.cell
    activateCells(clues, current)
    // console.log(current);
  }
  function handleToggle(e) {}
</script>

<div class="flex flex-col items-center justify-center text-lg">
  <ul
    class="grid gap-px bg-gray-700 border border-gray-700 focus:border-blue-600 focus:border-2 outline-none"
    use:cssVars={style}
    use:keyboard={{ cells, cursor: current.cell }}
    on:move={handleCursorMoved}
    on:toggle={handleToggle}
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
    <ClueKeys
      {...omit(clues[current.clue.direction][current.clue.number], [
        'cells',
        'answer',
        'direction'
      ])} />
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
