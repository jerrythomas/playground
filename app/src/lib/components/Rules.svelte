<script>
  import IconShuffle from './IconShuffle.svelte'
  import WordPills from './WordPills.svelte'
  import WordAsBlocks from './WordAsBlocks.svelte'

  let word = 'dinosaur'
  let hits = [
    'din',
    'sun',
    'run',
    'son',
    'don',
    'sin',
    'darn',
    'ran',
    'rind',
    'round',
    'sound',
    'nod',
    'rod',
    'aid',
    'said'
  ]
  let misses = ['in', 'on', 'nid', 'odd', 'rode']
  let letters
</script>

<div class="flex flex-col flex-grow items-center justify-center w-96 bg-gray-100 m-auto rounded-md">
  <h1 class="mt-4 leading-loose font-bold">Maximum Words</h1>
  <l class="w-3/5 border-b border-gray-400" />
  <p class="px-4 mt-4 text-justify">
    The goal of the game is to guess the maximum number of words that can be made using letters in a
    given set of words.
  </p>
  <h1 class="leading-loose font-bold">Rules</h1>
  <l class="w-2/5 border-b border-gray-400" />
  <span class="mt-4 flex flex-row justify-center items-center">
    <button
      on:click={() => letters.shuffle()}
      class="leading-loose p-1 bg-gray-600 text-gray-50 mr-2 rounded-md"><IconShuffle /></button>
    <WordAsBlocks {word} bind:this={letters} />
  </span>
  <p class="px-4 my-4 text-justify">
    Using the letters above create as many words as you can. You can use the shuffle button to
    shuffle the letters.
  </p>
  <ul class="list-disc pl-8 pr-4">
    <li>Words should be made from letters provided</li>
    <li>You can only use repeat based on occurrance</li>
    <li>Words should contain least 3 letters</li>
  </ul>
  <l class="mt-4 w-2/5 border-b border-gray-400" />
  <p class="px-4 my-4 text-justify">Sample valid and invalid words are shown below.</p>
  <l class="mb-2 w-3/5 border-b border-gray-400" />
  <WordPills words={hits} state="info" maxRows={3} />
  <l class="my-2 w-3/5 border-b border-gray-400" />
  <WordPills words={misses} state="fail" />

  <button class="my-4 px-4 leading-loose rounded bg-purple-600 text-purple-50"> Start </button>
</div>
