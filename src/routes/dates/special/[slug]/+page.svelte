<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import DatePicker from '$lib/DatePicker.svelte';
	import Nav from '$lib/Nav.svelte';
	import { CalendarDate } from '@internationalized/date';
	import SvelteMarkdown from 'svelte-markdown';
	//import { titleCase } from 'scule';
	/** @type {import('./$types').PageData} */
	export let data;
	const formatDate = (date) =>
		date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});

	const titleCase = (str) =>
		str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

	let dateObj = !data.all
		? new CalendarDate(data.date.getFullYear(), data.date.getMonth() + 1, data.date.getDate())
		: undefined;

	$: {
		if (browser && dateObj) {
			goto(
				`/dates/special/${encodeURIComponent(
					dateObj
						.toDate()
						.toLocaleString(undefined, { day: '2-digit', year: 'numeric', month: '2-digit' })
				)}`,
				{ replaceState: true }
			);
		}
	}
</script>

<Nav pagename="Special Dates" emoji="📆">
	<DatePicker bind:value={dateObj}></DatePicker>
</Nav>
<div class="m-6 flex flex-col gap-4">
	{#if !data.schedules.length}
		<p class="text-gray-600">No special dates found for this date.</p>
	{/if}
	{#each data.schedules as schedule}
		<div>
			<h2 class="font-bold text-3xl mb-2">{schedule.name}</h2>
			<p class="text-gray-600">
				{#each Object.entries(schedule.dates) as [i, date]}
					{formatDate(date)}{i < schedule.dates.length - 1 ? ', ' : ''}
				{/each}
			</p>
			<div class="flex">
				<div class="flex-col flex">
					{#each schedule.blocks as block}
						<div class="flex-row flex border border-gray-100">
							<div class="font-semibold p-2 border-r border-gray-200">{titleCase(block.block)}</div>
							{#each block.times as time}
								<div class="text-gray-600 border-r border-gray-100 h-full p-2">
									{titleCase(time)}
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>
			<div class="prose">
				<h2>Notes</h2>
				<SvelteMarkdown source={schedule.description} />
			</div>
		</div>
	{/each}
</div>
