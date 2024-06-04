<script>
	import '../app.css';
	import Nav from '$lib/Nav.svelte';
	import { page } from '$app/stores';
</script>

<div>
	<Nav pagename="Tools" emoji="🚫"></Nav>
	<div class="flex w-full h-[calc(100vh-72px)] flex-col justify-center items-center">
		<h1 class="font-bold text-4xl">{$page.error.message}</h1>
		<p>Poke Graham if this continues</p>
	</div>
</div>
