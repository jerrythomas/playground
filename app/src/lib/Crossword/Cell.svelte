<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let x = 0
  export let y = 0
  export let solved = false
  export let answer = ''
  export let blank = false
  export let active = false
  export let focus = false
  export let error = false
  export let number = null
  // export let directions = {}
  // export let directionKeys = []

  function handleClick() {
    if (solved || blank) return
    dispatch('move', { x, y })
  }

  /* @apply does not work in svelte.dev */
  $: style = blank
    ? 'bg-gray-600'
    : error
    ? 'bg-red-500 text-gray-50'
    : focus
    ? 'bg-yellow-300'
    : active
    ? 'bg-yellow-100'
    : ''
</script>

<li
  class="flex items-center justify-center w-10 h-10 {style} relative bg-white cursor-pointer"
  class:blank
  class:active
  class:focus
  class:error
  on:click={handleClick}>
  {#if !blank}
    {#if number}
      <i class="text-xs text-current absolute top-0 left-0.5 opacity-50">{number}</i>
    {/if}
    {answer}
  {/if}
</li>

<style type="postcss">
  .blank {
    @apply bg-gray-600 cursor-auto;
  }
  .activeClue {
    @apply bg-yellow-100;
  }
  .activeCell {
    @apply bg-yellow-300;
  }
  .error {
    @apply bg-red-500 text-gray-50;
  }
  .error > i {
    color: white;
    @apply text-white;
  }
  .solved {
    @apply cursor-auto;
  }
</style>
