<script>
	import { chunkArray } from '$lib/utils';

	export let words = [];
	export let state = '';
	export let maxRows = 5;

	let colors = {
		pass: 'green',
		info: 'blue',
		warn: 'yellow',
		fail: 'red'
	};

	$: color = colors[state] || 'gray';
	$: size = Math.max(Math.ceil(words.length / maxRows), maxRows);
	$: chunks = chunkArray(words, size);
</script>

<ul class="flex flex-col m-auto items-center justify-center">
	{#each chunks as chunk}
		<li class="flex flex-row justify-center content-between">
			{#each chunk as word}
				<p class="px-4 m-1 rounded-full bg-{color}-50 text-{color}-500 border border-{color}-200">
					{word}
				</p>
			{/each}
		</li>
	{/each}
</ul>
