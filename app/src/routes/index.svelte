<script>
	import Crossword from '$lib/Crossword/index.svelte';
	import { prepare } from '$lib/Crossword/helpers';
	import data from '$lib/Crossword/nyt.json';

	$: cw = prepare(data);
</script>

<div class="flex flex-col m-10">
	<Crossword {...cw} showKeyboard />
</div>
