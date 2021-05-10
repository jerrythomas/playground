<script>
  import cssVars from 'svelte-css-vars'
  import Key from './Key.svelte'
  import Hint from './Hint.svelte'

  export let clue
  export let allowed
  export let number
  export let rows = 2

  $: styleVars = { width: Math.ceil(allowed.length / rows) }

  function fill(used, crossed) {
    return used ? 'bg-blue-50' : crossed ? 'bg-red-50' : 'bg-blue-400'
  }
</script>

<div use:cssVars={styleVars} class="flex flex-col m-auto items-center justify-center ">
  <Hint text={clue} {number} class="my-4 border-b border-gray-200" />
  {#if allowed}
    <ul class="flex flex-row flex-wrap justify-center items-center pr-1 text-lg">
      {#each allowed as { char, used }}
        <Key {char} disabled={used} on:click />
      {/each}
    </ul>
  {/if}
</div>

<style>
  /* fix the width for ul based max letters per row */
  div {
    width: calc(3rem * var(--width) + 0.25rem);
  }
</style>
