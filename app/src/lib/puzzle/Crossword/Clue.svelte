<script>
  import cssVars from 'svelte-css-vars'
  import ClueLine from './ClueLine.svelte'

  export let clue
  // export let direction
  export let allowed
  export let number
  // export let answer

  $: styleVars = { width: Math.ceil(allowed.length / 2) }

  // function fill(used, crossed) {
  //   return used ? 'bg-blue-50' : crossed ? 'bg-red-50' : 'bg-blue-400'
  // }

</script>

<div class="flex flex-col items-center my-4 mx-auto" use:cssVars={styleVars}>
  <ClueLine {clue} {number} />
  {#if allowed}
    <ul class=" flex flex-row flex-wrap justify-center items-center pr-2 text-lg">
      {#each allowed as { char, used }}
        <li class:used class="ml-2 mb-2 first:ml-0">
          {char}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="postcss">
  li {
    @apply flex w-10 h-10 items-center justify-center leading-loose;
    @apply rounded-md cursor-pointer shadow-2xl;
    @apply bg-gray-500 text-gray-50;
  }

  div {
    width: calc(3.25rem * var(--width) + 0.25rem);
  }
  .used {
    @apply bg-gray-300;
  }

</style>
