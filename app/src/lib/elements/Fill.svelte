<svelte:options tag="fill-me" />

<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  export let value = '?'
  export let correct = false
  export let show = false

  $: value = value || '?'
  $: empty = value === '?'
  $: info = !empty
  $: pass = show && correct
  $: fail = show && !correct

  function handleClick(e) {
    dispatch('remove', { composed: true, value })
    // this.dispatchEvent(new CustomEvent('remove', {composed:true, value}))
  }

</script>

<span
  class="h-full items-center justify-center bg-yellow-200 inline px-2 py-1 mx-1 rounded cursor-pointer text-gray-600"
  class:info
  class:pass
  class:fail
  class:empty
  on:click={handleClick}
  >{value}
</span>
