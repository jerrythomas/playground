<script>
  import Header from '$lib/Header/index.svelte'
  import Footer from '$lib/components/footer.svelte'
</script>

<Header />
<div class="flex flex-col flex-grow">
  <slot />
</div>
<Footer />
