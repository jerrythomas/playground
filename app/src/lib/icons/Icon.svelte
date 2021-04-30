<script>
  export let size = 6
  export let title = ''
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-{size} w-{size}"
  viewBox="0 0 24 24"
  stroke="currentColor">
  <title>{title}</title>
  <slot />
</svg>
