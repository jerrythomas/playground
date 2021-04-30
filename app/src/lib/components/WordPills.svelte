<script>
  export let words = []
  export let state = ''

  let colors = {
    pass: 'green',
    info: 'blue',
    warn: 'yellow',
    fail: 'red'
  }
  $: color = colors[state] || 'gray'
</script>

<div class="flex flex-row flex-wrap justify-center leading p-4 md:overflow-y-scroll">
  {#each words as word}
    <p
      class="px-3 mr-2 mb-2 rounded-full bg-{color}-50 text-{color}-500 border border-{color}-200 ">
      {word}
    </p>
  {/each}
</div>
