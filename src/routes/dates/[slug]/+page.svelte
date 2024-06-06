<script>
	import DatePicker from '$lib/DatePicker.svelte';
	import Nav from '$lib/Nav.svelte';
	import '$src/app.css';
	import { browser } from '$app/environment';
	import {goto} from "$app/navigation"
	/** @type {import('./$types').PageData} */
	export let data;
	$: daysOff = data.daysOff;
	let dateObj = data.dateObj;
	$: {
		if (browser && data.todayDate?.getTime() != dateObj.toDate().getTime()) {
			goto(
				`/dates/${encodeURIComponent(
					dateObj
						.toDate()
						.toLocaleString(undefined, { day: '2-digit', year: 'numeric', month: '2-digit' })
				)}`,
				{ replaceState: true }
			);
		}
	}
</script>

<Nav emoji="📅" pagename="Dates">
	<DatePicker bind:value={dateObj}></DatePicker>
</Nav>
<div class="m-4 ml-8 flex flex-1 h-full justify-center align-middle text-3xl">
	{data.day}
	<!---
	<div>
		<span class="font-bold"
			>{Math.ceil(
				(new Date(daysOff[0].start.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
			)}</span
		>
		days until the next break:
		{daysOff[0].summary}
	</div>
	-->
</div>
