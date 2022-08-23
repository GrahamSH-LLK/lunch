<script>
	import { goto } from '$app/navigation';
	import { browser } from "$app/env";

	import '../../app.css';
	import { DateInput } from 'date-picker-svelte'


	/** @type {import('./$types').PageData} */
	export let data;
	$: today = data.today;
	let date = data.date;
	$: {
			if(browser) goto(`/${encodeURIComponent(date.toLocaleString(undefined, {day: '2-digit', year: 'numeric', month: '2-digit'}))}`, { replaceState: true })
		console.log(date)
	}
</script>

<div class="m-4">
	<ul>
		<DateInput bind:value={date} />

		{#each today as category}
			<li>
				<h2 class="font-semibold text-2xl">{category.name}</h2>
				<ul class="bg-red">
					{#each category.items as meal}
						<li>
							{meal.name}
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
