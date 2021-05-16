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
  export let error = false
  export let number = null
  export let clue

  let me
  let focusFired = false

  $: current = isEqual({ x, y }, cursor)
  $: needsFocus = current && me && document.activeElement !== me
  $: needsFocus && me.focus()
  $: active = clue.cells.filter((cell) => cell.x == x && cell.y == y).length == 1

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
  class="flex items-center justify-center w-10 h-10 relative bg-primary-50 cursor-pointer"
  class:blank
  class:active
  class:current
  class:error
  bind:this={me}
  on:click={handleClick}
  on:focus={handleFocus}
  tabIndex={blank ? -1 : 0}>
  {#if !blank}
    {#if number}
      <i class="text-xs text-current absolute top-0 left-0.5 opacity-60">{number}</i>
    {/if}
    {value}
  {/if}
</li>

<style lang="postcss">
  .active {
    @apply bg-accent-100 text-accent-600;
  }
  .current {
    @apply bg-accent-300 text-accent-600;
  }
  .error {
    @apply bg-fail-500 text-fail-100;
  }
  .error.current {
    @apply bg-fail-500 text-fail-100 border-2 border-fail-300;
  }
  .blank {
    @apply bg-primary-600;
  }

</style>
