<script>
  export let items = []
</script>

<ul class="flex flex-col bg-gray-100 text-gray-900 h-full w-96">
  {#each items as item}
    <li class:separator={item.separator}>
      {#if item.separator}
        <hr />
      {:else}
        <a href={item.href} alt={item.label} class="w-full"> {item.label}</a>
      {/if}
    </li>
  {/each}
</ul>

<style>
  li {
    @apply h-12 px-4 leading-loose py-2 hover:bg-gray-600 hover:text-white;
  }
  .separator {
    @apply py-2 h-4 hover:bg-transparent;
  }
</style>
