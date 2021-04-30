<script>
  // import { sum } from '$lib/utils'
  import cssVars from 'svelte-css-vars'
  import Splitter from './Splitter.svelte'

  export let vertical = false
  export let min = 30
  export let max = 70
  export let pos = 30

  let sizes = [pos, 100 - pos]

  $: direction = { direction: vertical ? 'flex-col' : 'flex-row' }
  $: sizeA = {
    width: (vertical ? 100 : sizes[0]) + '%',
    height: (vertical ? sizes[0] : 100) + '%'
  }
  $: sizeB = {
    width: (vertical ? 100 : sizes[1]) + '%',
    height: (vertical ? sizes[1] : 100) + '%'
  }

  function onSplitterChange(e) {
    // let ub = sum(sizes.slice(e.detail.index, e.detail.index + 2))
    // console.log(ub)
    sizes[e.detail.index] = e.detail.pos - e.detail.offset
    sizes[e.detail.index + 1] = 100 - e.detail.pos + e.detail.offset
  }
</script>

<div class="relative flex w-full h-full" use:cssVars={direction}>
  <section class="flex flex-grow flex-shrink bg-yellow-50 a" use:cssVars={sizeA}>
    <slot name="a" />
  </section>
  <section use:cssVars={sizeB} class="flex flex-grow flex-shrink bg-red-50 b">
    <slot name="b" />
  </section>
  <Splitter {vertical} {min} {max} {pos} on:change={onSplitterChange} />
</div>

<style>
  div {
    flex-direction: var(--direction);
  }
  .a,
  .b {
    width: var(--width);
    height: var(--height);
  }
</style>
