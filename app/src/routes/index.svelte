<script>
  import GoogleIcon from '$lib/icons/Google.svelte'
  import GithubIcon from '$lib/icons/Github.svelte'
  import MicrosoftIcon from '$lib/icons/Microsoft.svelte'

  import Provider from '$lib/auth/Provider.svelte'

  // $: document.title = 'Sign in'

</script>

<div class="flex flex-col mx-auto w-64">
  <h2>Sign in with</h2>
  <Provider name="Microsoft" icon={MicrosoftIcon} />
  <Provider name="Github" icon={GithubIcon} />
  <Provider name="Google" icon={GoogleIcon} />
</div>
