<script>
  import Crossword from '$lib/components/Crossword/index.svelte'
  import { currentClue } from '$lib/components/Crossword/store'
  import Clue from '$lib/components/Crossword/Clue.svelte'
  import data from '$lib/components/Crossword/nyt.json'
  import { prepare } from '$lib/components/Crossword/helpers'

  let activeClue = {}
  const unsubscribe = currentClue.subscribe((value) => {
    activeClue = value
  })

  $: cw = prepare(data)
  // $: console.log(cw)
  // 	$: currentClue.set(cw.clues['down']['2'])
</script>

<svelte:head>
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
</svelte:head>
<div class="flex flex-col m-10">
  <Crossword {...cw} />
  {#if Object.keys(activeClue).length > 0}
    <Clue {...activeClue} />
  {/if}
</div>
