<script>
  import Puzzle from '$lib/puzzle/index.svelte'
  import Fillable from '$lib/puzzle/Fillable.svelte'

  let data = {
    text: ' Fill in the values for ~?~ and ~?~',
    options: [
      { value: 'one', expectedIndex: 0, actualIndex: -1, node: null },
      { value: 'two', expectedIndex: 1, actualIndex: -1, node: null },
      { value: 'three', expectedIndex: -1, actualIndex: -1, node: null },
      { value: 'four', expectedIndex: -1, actualIndex: -1, node: null }
    ]
  }

</script>

<Puzzle {data} type={Fillable} />
