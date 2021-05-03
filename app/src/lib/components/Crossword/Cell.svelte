<script>
  import { createEventDispatcher } from 'svelte'
  import { currentClue } from './store'

  const dispatch = createEventDispatcher()

  export let blank = false
  export let x
  export let y
  export let answer = ''
  export let across = {}
  export let down = {}

  let entry = answer
  let checked = false
  let allowed

  let activeClue
  let defaultDirection = Object.keys(across).length > 0 ? 'across' : 'down'
  let currentDirection = defaultDirection

  const unsubscribe = currentClue.subscribe((value) => {
    activeClue = value
    currentDirection = value.direction ? value.direction : currentDirection
  })

  $: clue = currentDirection === 'across' ? across : down
  $: id = x + '-' + y
  $: canToggle = Object.keys(across).length > 0 && Object.keys(down).length > 0
  $: fail = checked && !(entry === answer)
  $: number = across.first ? across.number : down.first ? down.number : ''
  $: highlight =
    (activeClue.direction === 'across' && activeClue.number == across.number) ||
    (activeClue.direction === 'down' && activeClue.number == down.number)

  $: highlightFirst = highlight && (activeClue.direction === 'across' ? across.first : down.first)

  // @apply does not work on svelte.dev
  // $: bgColor = highlightFirst ? 'bg-yellow-300' : highlight ? 'bg-yellow-100' : 'bg-white'

  export function check() {
    checked = true
  }
  export function clear() {
    entry = ''
    checked = false
  }

  function handleClick() {
    const isActive = activeClue.direction === currentDirection && activeClue.number == clue.number
    const nextDirection = currentDirection == 'across' ? 'down' : 'across'

    const direction = isActive && canToggle ? nextDirection : currentDirection
    const number = direction == 'across' ? across.number : down.number

    if (!isActive || canToggle) dispatch('activate', { direction, number })
  }

  function keydown(e) {
    let key = e.key.toUpperCase()
    console.log(key)
    if (key in allowed) {
      value = key
    }
  }
</script>

{#if blank}
  <li class="w-10 h-10 blank bg-gray-600" />
{:else}
  <li
    {id}
    class:highlight
    class:highlightFirst
    class:fail
    class="flex w-10 h-10 select-none bg-white items-center justify-center hover:bg-yellow-200 cursor-pointer relative pt-1"
    on:click={handleClick}
    on:keydown={keydown}>
    {#if number !== ''}
      <i class="text-xs text-blue-400 absolute top-0 left-0.5">{number}</i>
    {/if}
    {answer}
  </li>
{/if}

<style type="postcss">
  .highlight {
    @apply bg-yellow-100;
  }
  .highlightFirst {
    @apply bg-yellow-300;
  }
  .fail {
    @apply bg-red-500 text-white;
  }
</style>
