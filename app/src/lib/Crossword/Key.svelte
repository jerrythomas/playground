<script>
  export let disabled = false
  export let uppercase = true
  export let char = '?'
  $: style = uppercase ? ' uppercase' : '' + disabled ? ' opacity-50' : ''
</script>

<li
  class:disabled
  class="flex w-10 h-10 items-center justify-center rounded-md leading-loose ml-1 mb-1 first:ml-0 border cursor-pointer bg-blue-500 text-white shadow {style}">
  {char}
</li>

<style type="postcss">
  .disabled {
    @apply opacity-50;
  }
</style>
