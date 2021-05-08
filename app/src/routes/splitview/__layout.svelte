<script>
  import Sidebar from '$lib/components/Sidebar.svelte'
  import SplitView from '$lib/components/SplitView.svelte'
  let items = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Todos', href: '/todos' },
    { separator: true },
    { label: 'Three Row Layout', href: '/layout/rows' },
    { label: 'Two Column Layout', href: '/layout/cols' }
  ]
</script>

<SplitView min={10} pos={15}>
  <!-- <div slot="a"> -->
  <Sidebar {items} slot="a" />
  <!-- </div> -->
  <section slot="b" class="flex w-full bg-red-100"><slot /></section>
</SplitView>
<!-- <div class="flex flex-row flex-grow">
  
  
</div> -->
