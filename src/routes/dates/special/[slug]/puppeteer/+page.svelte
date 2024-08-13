<script>
	import { CalendarDate } from '@internationalized/date';
	import SvelteMarkdown from 'svelte-markdown';

	export let data;
	const titleCase = (str) =>
		str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

	let dateObj = !data.all
		? new CalendarDate(data.date.getFullYear(), data.date.getMonth() + 1, data.date.getDate())
		: undefined;
	const formatDate = (date) =>
		date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});

	let currSchedule = data.schedules[0];
</script>

<div id="day-container" class="flex flex-row gap-4">
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
	</div>

	<div class="prose dark:prose-invert">
		<h2>Notes</h2>
		<SvelteMarkdown source={currSchedule.description} />
	</div>
</div>
