<script context="module">
  export const prerender = true
</script>

<script>
  import Counter from '$lib/Counter/index.svelte'
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section class="flex flex-col w-full justify-center items-center">
  <h1 class="text-center w-full">
    Welcome to your new<br />SvelteKit app
  </h1>

  <h2>
    try editing <strong>src/routes/index.svelte</strong>
  </h2>

  <Counter />
</section>

<style style lang="postcss">
  /* section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  } */
</style>
