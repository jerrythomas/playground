<script>
  import Option from './Option.svelte'
  export let options = []

</script>

<ul class="rounded overflow-clip">
  {#each options as { value, actualIndex }, index}
    <Option {value} {index} used={actualIndex != -1} on:click />
  {/each}
</ul>
