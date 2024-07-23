<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
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
	const formatDateShort = (date) =>
		date.toLocaleDateString('en-US', {
			day: '2-digit',
			month: '2-digit'
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
	let index = 0;
	let currSchedule;
	$: currSchedule = data.schedules[index];
</script>

<Nav pagename="Special Dates" emoji="📆">
	<DatePicker bind:value={dateObj}></DatePicker>
	<Button
		on:click={() => {
			goto('/dates/special/all');
			dateObj = undefined;
		}}>All</Button
	>
</Nav>
<div class="m-6 flex flex-col gap-4">
	<div class="flex-row flex h-screen">
		<div class="w-96 overflow-y-auto h-screen">
			{#each Object.entries(data.schedules) as [i, schedule]}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					on:click={() => {
						index = i;
					}}
				>
					<div
						class={`p-4 px-8 text-sm cursor-pointer border-l-2 text-gray-600 dark:text-gray-300 border-white dark:border-gray-900 hover:border-blue-500/25 dark:hover:border-blue-400/25 hover:bg-blue-100/50 dark:hover:bg-blue-900/10 ${index === i ? 'bg-blue-100/50 dark:bg-blue' : ''}`}
					>
						<div class="font-semibold flex justify-between">
							<p>{schedule.name}</p>
							<p class="font-normal">{formatDateShort(schedule.dates[0])}</p>
						</div>
						<p class="h-10 text-ellipsis overflow-hidden my-1">
							<SvelteMarkdown source={schedule.description}></SvelteMarkdown>
						</p>
					</div>
					<div class="flex items-center align-center text-center w-full flex-row">
						<div
							class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"
						></div>
						<!---->
					</div>
				</div>
			{/each}
		</div>
		<div class="flex-col items-stretch p-4 border-l border-gray-200 w-full flex-1 hidden lg:flex">
			{#if currSchedule}
				<div>
					<h2 class="font-bold text-3xl mb-2">{currSchedule.name}</h2>
					<p class="text-gray-600 dark:text-gray-200">
						{#each Object.entries(currSchedule.dates) as [i, date]}
							{formatDate(date)}{i < currSchedule.dates.length - 1 ? ', ' : ''}
						{/each}
					</p>
					<div class="flex">
						<div class="flex-col flex">
							{#each currSchedule.blocks as block}
								<div class="flex-row flex border border-gray-100 dark:border-gray-500">
									<div class="font-semibold p-2 border-r border-gray-100 dark:border-gray-500">
										{titleCase(block.block)}
									</div>
									{#each block.times as time}
										<div
											class="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-600 h-full p-2"
										>
											{titleCase(time)}
										</div>
									{/each}
								</div>
							{/each}
						</div>
					</div>
					<div class="prose dark:prose-invert">
						<h2>Notes</h2>
						<SvelteMarkdown source={currSchedule.description} />
					</div>
				</div>
			{/if}
		</div>
	</div>
	{#if !data.schedules.length}
		<p class="text-gray-600">No special dates found for this date.</p>
	{/if}
</div>
