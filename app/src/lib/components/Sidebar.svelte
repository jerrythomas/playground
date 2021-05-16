<script>
  export let items = []

</script>

<ul class="flex flex-col bg-primary-600 text-primary-50 h-full w-full">
  {#each items as item}
    <li
      class:separator={item.separator}
      class="text-accent-100 hover:bg-accent-300 hover:text-accent-600">
      {#if item.separator}
        <hr />
      {:else}
        <a href={item.href} alt={item.label} class="w-full text-current hover:no-underline">
          {item.label}</a>
      {/if}
    </li>
  {/each}
</ul>

<style lang="postcss">
  li {
    @apply flex h-10 px-4 items-center;
  }
  .separator {
    @apply mt-1 mb-2 h-1 hover:bg-transparent;
  }

</style>
