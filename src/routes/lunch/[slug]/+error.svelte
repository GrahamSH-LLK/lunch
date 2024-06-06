<script>
	import '../../../app.css';
	import Nav from '$lib/Nav.svelte';
	import { today, isWeekday } from '@internationalized/date';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button/index.js';
	import {goto} from '$app/navigation'
	const goToToday = () => {
		let dateObj = today('America/New_York');
		while (!isWeekday(dateObj, 'en-US')) {
			dateObj.add({days: 1}); 
		}
		goto(
				`/lunch/${encodeURIComponent(
					dateObj
						.toDate()
						.toLocaleString('en-US', { day: '2-digit', year: 'numeric', month: '2-digit' })
				)}`,
				{ replaceState: true }
			);

	};
</script>

<div>
	<Nav pagename="Tools" emoji="🚫">
		<Button class="mr-2" target="_blank" on:click={goToToday}>Today</Button>
	</Nav>
	<div class="flex w-full h-[calc(100vh-72px)] flex-col justify-center items-center">
		<h1 class="font-bold text-4xl">{$page.error.message}</h1>
		<p>Poke Graham if this continues</p>
	</div>
</div>
