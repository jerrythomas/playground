<script>
  import { shuffle as _shuffle } from 'lodash'
  import cssVars from 'svelte-css-vars'

  export let word
  let letters

  $: letters = letters || Array.from(word)
  $: style = { cols: letters.length }

  export function shuffle() {
    letters = _shuffle(letters)
  }
</script>

<ul class="grid gap-1 leading font-mono" use:cssVars={style}>
  {#each letters as char}
    <li class="text-center px-2 py-1 border border-gray-800 rounded bg-gray-300">
      {char}
    </li>
  {/each}
</ul>

<style>
  ul {
    grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
  }
</style>
