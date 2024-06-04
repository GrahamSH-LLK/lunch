<script lang="ts">
	export let pagename;
	export let emoji;

	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="flex w-full px-6 py-4 bg-blue-400 justify-between content-center">
	<span class=" font-bold text-3xl text-white"><a href="/">{emoji} LHS {pagename}</a></span>
	<div class="flex items-center">
		<slot></slot>

		<Button class="ml-2" on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</div>
