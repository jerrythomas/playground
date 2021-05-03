<script context="module">
  // see https://kit.svelte.dev/docs#loading
  export const load = async ({ fetch }) => {
    const res = await fetch('/scenarios.json')
    console.log(res)
    if (res.ok) {
      const scenarios = await res.json()

      return {
        props: { scenarios }
      }
    }

    const { message } = await res.json()

    return {
      error: new Error(message)
    }
  }
</script>

<script>
  import cssVars from 'svelte-css-vars'
  export let scenarios

  export let width = 50
  $: styleVars = { asideWidth: width + 'ch', headHeight: 2 + 'em' }
</script>

<wrap class="flex flex-row h-full" use:cssVars={styleVars}>
  <aside class="flex flex-col overflow-y-scroll h-full">
    {#each scenarios as scenario (scenario.uid)}
      <div class="flex flex-col w-full h-0 bg-yellow-100">
        <h1>{scenario.uid}</h1>
        <p>{scenario.text}</p>
      </div>
    {/each}
  </aside>
  <section class="flex flex-col border-yellow-700">
    <bar class="flex w-full h-12 bg-blue-400" />
    <textarea class="flex w-full h-full bg-blue-200 overflow-scroll" />
  </section>
</wrap>

<style type="postcss">
  /* div {
    @apply w-full h-full ;
  } */
  aside {
    width: var(--asideWidth);
  }
  bar {
    height: var(--headHeight);
  }
  section {
    @apply border-0  w-full h-full overflow-hidden;
  }
</style>
