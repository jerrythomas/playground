<script>
  import { createEventDispatcher } from 'svelte'
  import { isEqual } from 'lodash'
  const dispatch = createEventDispatcher()

  export let x
  export let y
  export let value = ''
  export let cursor
  export let solved = false
  export let blank = false
  export let active = false
  export let focus = false
  export let error = false
  export let number = null
  export let clue

  let me
  let focusFired = false

  $: current = isEqual({ x, y }, cursor)
  $: needsFocus = current && me && document.activeElement !== me
  $: needsFocus && me.focus()

  $: focus = current ? 'bg-yellow-300' : ''
  $: active = clue.cells.filter((cell) => cell.x == x && cell.y == y).length == 1

  /* @apply does not work in svelte.dev */
  $: style = blank
    ? 'bg-gray-600'
    : error && focus
    ? 'bg-red-500 text-red-100 border-2 border-red-300'
    : error
    ? 'bg-red-500 text-red-100'
    : focus
    ? 'bg-yellow-300'
    : active
    ? 'bg-yellow-100'
    : ''
  function handleClick(e) {
    if (solved || blank) return
    const action = !current ? 'moveTo' : value != '' ? 'remove' : 'toggle'
    if (!focusFired) {
      dispatch('change', { x, y, action })
    }
    focusFired = false
  }
  // handle tabs
  function handleFocus(e) {
    const action = !current ? 'moveTo' : value != '' ? 'remove' : 'toggle'
    if (!current && !focusFired) {
      focusFired = true
      dispatch('change', { x, y, action: 'moveTo' })
    }
  }
</script>

<li
  class="flex items-center justify-center w-10 h-10 relative bg-white cursor-pointer {style}"
  class:blank
  class:active
  class:focus
  class:error
  bind:this={me}
  on:click={handleClick}
  on:focus={handleFocus}
  tabIndex={blank ? -1 : 0}>
  {#if !blank}
    {#if number}
      <i class="text-xs text-current absolute top-0 left-0.5 opacity-50">{number}</i>
    {/if}
    {value}
  {/if}
</li>

<style type="postcss">
  .active {
    @apply bg-yellow-100;
  }
  .focus {
    @apply bg-yellow-300;
  }
  .error {
    @apply bg-red-100 text-red-500;
  }
  .error.focus {
    @apply bg-red-100 text-red-500 border-2 border-red-300;
  }
  .blank {
    @apply bg-gray-600;
  }
</style>
