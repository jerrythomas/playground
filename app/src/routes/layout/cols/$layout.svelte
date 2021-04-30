<script>
  import Sidebar from '$lib/components/Sidebar.svelte'
  let items = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Todos', href: '/todos' },
    { separator: true },
    { label: 'Three Row Layout', href: '/layout/rows' },
    { label: 'Two Column Layout', href: '/layout/cols' }
  ]
</script>

<div class="flex flex-row flex-grow">
  <Sidebar {items} />
  <section><slot /></section>
</div>
