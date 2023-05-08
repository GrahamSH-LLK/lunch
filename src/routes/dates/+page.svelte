<script>
	import Nav from '$lib/Nav.svelte';
	import '$src/app.css';
	/** @type {import('./$types').PageData} */
	export let data;
	$: daysOff = data.daysOff;
</script>

<Nav emoji="📅" pagename="Dates" />
<div class="m-4 ml-8 flex flex-1 h-full justify-center align-middle text-3xl">
	<div>
		<span class="font-bold"
			>{Math.ceil(
				(new Date(daysOff[0].start.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
			)}</span
		>
		days until the next break:
		{daysOff[0].summary}
	</div>
	<div />
</div>
