<script>
  import Header from '$lib/Header/index.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import '../app.css'
</script>

<Header />

<main class="flex flex-grow justify-center">
  <slot />
</main>

<Footer />
