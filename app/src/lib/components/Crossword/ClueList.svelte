<script>
  import ClueLine from './ClueLine.svelte'
  export let direction
  export let clues

  $: list = Object.keys(clues).map((key) => clues[key])
</script>

<h1 class="font-bold w-full my-2">
  {direction}
</h1>
<ul class="flex flex-col w-full">
  {#each list as { clue, number }}
    <ClueLine {clue} {number} />
  {/each}
</ul>
