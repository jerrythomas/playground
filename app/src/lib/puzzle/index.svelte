<script>
  export let data
  export let type

</script>

<div class="flex flex-col m-10">
  <svelte:component this={type} {...data} />
</div>
