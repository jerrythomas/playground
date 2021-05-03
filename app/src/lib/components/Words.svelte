<script>
  import { shuffle } from 'lodash'
  import IconShuffle from './IconShuffle.svelte'
  import WordPills from './WordPills.svelte'

  let value = 'world'
  let word = ''
  let score = 200000
  let guesses = ['xyz', 'xxx']
  let misses = ['abc', 'def']
  let wordUrl = 'http://random-word-api.herokuapp.com/word?number=1'
  let url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/'

  $: blocks = Array.from(value)

  function scramble() {
    blocks = shuffle(blocks)
  }
  function refresh() {
    fetch(wordUrl).then((response) => {
      console.log(response)
      if (response.ok) {
        response.json().then((data) => (value = data[0]))
      }
    })
  }
  async function add() {
    if (word.trim().length > 2) {
      const response = await fetch(url + word)
      console.log(response)
      if (response.status == 200) {
        let res = await response.json()
        console.log(res)
        guesses = [...guesses, word]
      } else {
        misses = [...misses, word]
      }
      word = ''
    } else {
      misses = [...misses, word]
    }
  }
</script>

<svelte:head>
  <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
</svelte:head>

<div class="w-full h-full flex flex-col">
  <span
    class="flex flex-row content-between items-center w-full py-3 bg-gray-100 border-b border-gray-600">
    <button on:click={scramble} class="leading-loose p-1 bg-gray-600  text-gray-50 mx-2 rounded-md">
      <IconShuffle />
    </button>
    <ul class="flex items-center justify-center">
      {#each blocks as char}
        <li
          class="flex font-mono leading-loose px-2 ml-1 border border-gray-800 rounded bg-gray-300">
          {char}
        </li>
      {/each}
    </ul>
    <input
      type="text"
      bind:value={word}
      class="leading-loose px-2 rounded md:mx-auto"
      on:keyup={(e) => e.key === 'Enter' && add()} />
    <div
      class="flex flex-row ml-auto leading-loose rounded w-max border border-gray-800 content-between">
      <span class="px-2 bg-gray-600 text-gray-50">Score</span>
      <b class="px-2 text-right">{score}</b>
    </div>
  </span>
  <WordPills words={guesses} />
  <hr />
  <WordPills words={misses} state="error" />
</div>
