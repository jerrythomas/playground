<script>
  export let value = 0
  export let label = 'Score'

  $: width = value < 99999 ? 'w-20' : 'min-w-max'
</script>

<div
  class="flex flex-row ml-auto leading-loose rounded w-max border border-gray-800 content-between">
  <span class="px-2 bg-gray-600 text-gray-50">{label}</span>
  <p class="px-2 text-right font-mono {width} ">{value.toLocaleString()}</p>
</div>
