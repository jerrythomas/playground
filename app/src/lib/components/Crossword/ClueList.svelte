<script>
  export let direction
  export let clues
</script>

<h1 class="font-bold w-full mb-4 border-b border-gray-600">
  {direction}
</h1>
<ul class="flex flex-column w-full">
  {#each clues as { clue, number }}
    <li class="flex flex-row">
      <i class="flex w-8">{number}</i>
      <p class="flex flex-grow">{clue}</p>
    </li>
  {/each}
</ul>
