<script>
  import cssVars from 'svelte-css-vars'

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

<div class="flex flex-col m-auto items-center justify-center my-4 mx-auto" use:cssVars={styleVars}>
  <span class="flex flex-row mx-auto my-4 h-8 border-b border-gray-200">
    <i class="flex text-xs w-4 text-gray-400 mr-2 align-text-top px-2">{number}</i>
    <p class="flex flex-grow mx-auto text-left">
      {clue}
    </p>
  </span>
  {#if allowed}
    <ul class=" flex flex-row flex-wrap justify-center items-center pr-1 text-lg">
      {#each allowed as { char, used }}
        <li class:used class="ml-2 mb-2 first:ml-0">
          {char}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style type="postcss">
  li {
    @apply flex w-10 h-10 items-center justify-center leading-loose;
    @apply rounded-md cursor-pointer shadow-2xl;
    @apply bg-gray-500 text-gray-50;
  }

  span,
  ul {
    width: calc(3.25rem * var(--width) + 0.25rem);
  }
  .used {
    @apply bg-gray-300;
  }
</style>
