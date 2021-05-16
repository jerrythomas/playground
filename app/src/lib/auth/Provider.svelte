<script>
  import Icon from '$lib/icons/Icon.svelte'

  export let name
  export let icon

</script>

<button
  class="w-64 px-2 py-2 my-1 leading-loose flex flex-row items-center border rounded bg-accent-500 text-white">
  <Icon class="mr-2 text-accent-50" title="Sign in with {name}" {icon} />
  {name}
</button>
