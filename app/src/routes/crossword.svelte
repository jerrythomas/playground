<script>
  import Puzzle from '$lib/puzzle/index.svelte'
  import Crossword from '$lib/puzzle/Crossword/index.svelte'

  import { prepare } from '$lib/puzzle/Crossword/lib/helpers'
  import nyt from './data/nyt.json'

  $: data = prepare(nyt)

</script>

<Puzzle {data} type={Crossword} />
