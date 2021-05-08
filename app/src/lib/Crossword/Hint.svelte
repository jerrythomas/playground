<script>
  export let text
  export let number
  export let active = false
</script>

<span class:active class="flex flex-row w-full mx-auto py-1 {$$props.class}">
  <i class="flex text-xs w-4 text-gray-400 mr-2 align-text-top px-2 py-1">{number}</i>
  <p class="flex flex-wrap text-left">
    {text}
  </p>
</span>

<style>
  .active {
    background-color: aliceblue;
  }
</style>
