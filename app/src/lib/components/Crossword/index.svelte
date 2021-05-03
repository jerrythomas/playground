<script>
  import cssVars from 'svelte-css-vars'
  import Cell from './Cell.svelte'
  import { currentClue } from './store'

  export let size = 12
  export let clues
  export let cells

  $: style = { size: size }

  function handleActivate(e) {
    console.log('activated', e.detail)
    currentClue.set(clues[e.detail.direction][e.detail.number])
  }
</script>

<div class="flex m-auto items-center justify-center text-lg">
  <ul class="grid gap-px bg-gray-700 border border-gray-700" use:cssVars={style}>
    {#each cells as row}
      {#each row as cell}
        <Cell {...cell} on:activate={handleActivate} />
      {/each}
    {/each}
  </ul>
</div>

<style>
  ul {
    grid-template-rows: repeat(var(--size), minmax(0, 1fr));
    grid-template-columns: repeat(var(--size), minmax(0, 1fr));
  }
</style>
