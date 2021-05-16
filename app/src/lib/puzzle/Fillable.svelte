<script>
  import OptionList from '$lib/components/OptionList.svelte'
  import Fillable from '$lib/components/Fillable.svelte'

  let current = 0
  export let options = []
  export let text = ''

  $: maxUsable = options.filter(({ expectedIndex }) => expectedIndex > -1).length

  function nextIndex() {
    const used = options
      .filter(({ actualIndex }) => actualIndex > -1)
      .map(({ actualIndex }) => actualIndex)
    let index = 0
    while (used.includes(index)) index++
    return index >= maxUsable ? -1 : index
  }

  function remove(event) {
    let index = options.findIndex(({ actualIndex }) => actualIndex == event.detail.index)
    options[index].actualIndex = -1
  }

  function fill(event) {
    current = nextIndex()
    if (current > -1) {
      options[event.detail.index].actualIndex = current
    }
  }

</script>

<Fillable {text} {options} {current} on:remove={remove} />
<OptionList {options} on:click={fill} />
