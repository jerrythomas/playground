<script>
  import { page } from '$app/stores'
  import Logo from './svelte-logo.svelte'

  let items = [
    { label: 'Home', href: '/', prefetch: true },
    { label: 'About', href: '/about', prefetch: true },
    { label: 'Todos', href: '/todos', prefetch: true },
    { label: 'Counter', href: '/counter', prefetch: true },
    { label: 'Fillable', href: '/fillable', prefetch: true },
    { label: 'Split View', href: '/splitview', prefetch: true },
    { label: 'Words', href: '/words', prefetch: true },
    { label: 'Crossword', href: '/crossword', prefetch: true }
  ]

</script>

<header class="flex justify-between h-12 border-b">
  <div class="corner">
    <a href="https://kit.svelte.dev">
      <Logo size="40" />
    </a>
  </div>

  <nav class="flex justify-center">
    <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
    </svg>
    <ul class="flex flex-row relative justify-center align-center">
      {#each items as { label, href, prefetch }}
        <li class:active={$page.path === href}>
          <a sveltekit:prefetch={prefetch} {href}>{label}</a>
        </li>
      {/each}
    </ul>
    <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
    </svg>
  </nav>

  <div class="corner">
    <!-- TODO put something else here? github link? -->
  </div>
</header>

<style lang="postcss">
  /* header {
		display: flex;
		justify-content: space-between;
	} */

  .corner {
    @apply w-12 h-12;
  }

  .corner a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  nav {
    /* display: flex;
		justify-content: center; */
    --background: rgba(255, 255, 255, 0.7);
  }

  path {
    fill: var(--background);
  }

  li {
    @apply h-full relative;
  }

  li.active::before {
    --size: 6px;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--accent-color);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1em;
    color: var(--heading-color);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 10%;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--accent-color);
  }

</style>
