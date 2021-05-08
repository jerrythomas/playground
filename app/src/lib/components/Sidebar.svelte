<script>
  export let items = []
</script>

<ul class="flex flex-col bg-gray-100 text-gray-900 h-full w-full">
  {#each items as item}
    <li class:separator={item.separator} class="">
      {#if item.separator}
        <hr />
      {:else}
        <a href={item.href} alt={item.label} class="w-full"> {item.label}</a>
      {/if}
    </li>
  {/each}
</ul>

<style lang="postcss">
  li {
    @apply h-12 px-4 py-2 leading-loose;
    @apply hover:bg-gray-300;
    @apply hover:text-white;
  }
  .separator {
    @apply py-2 h-4 hover:bg-transparent;
  }
</style>
