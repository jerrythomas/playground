<script>
  export let clue
  export let number

</script>

<span class="flex flex-row w-full overflow-full py-1 my-2">
  <i class="flex text-xs w-4 text-primary-400 mr-2 align-text-top px-2 py-1">{number}</i>
  <p class="flex flex-wrap text-left">
    {clue}
  </p>
</span>
