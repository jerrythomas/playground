<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let value
  export let index
  export let used

  $: color = used ? 'bg-gray-100' : 'bg-yellow-300'

  function handler(event) {
    if (!used) dispatch('click', { index, value })
  }

</script>

<li
  class="flex flex-row items-center px-4 my-1 text-left w-full leading-loose {color} cursor-pointer"
  class:used
  on:click={handler}>
  {value}
</li>
