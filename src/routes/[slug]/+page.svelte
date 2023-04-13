<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { MetaTags } from 'svelte-meta-tags';
	import { Tooltip } from '@svelte-plugins/tooltips';

	import '../../app.css';
	import { DateInput } from 'date-picker-svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	$: today = data.today;
	let date = data.date;
	function relativeDate(date) {
		const diff = date - new Date();
		const days = Math.ceil(diff / 1000 / 60 / 60 / 24);
		const formatter = new Intl.RelativeTimeFormat('en-US', {
			numeric: 'auto'
		});
		try {
			return formatter.format(days, 'day');
		} catch {
			return '';
		}
	}
	$: {
		if (browser && data.todayDate?.getTime() != date.getTime()) {
			goto(
				`/${encodeURIComponent(
					date.toLocaleString(undefined, { day: '2-digit', year: 'numeric', month: '2-digit' })
				)}`,
				{ replaceState: true }
			);
		}
	}
</script>

<MetaTags
	openGraph={{
		url: 'https://www.url.ie/a',
		title: today[0]?.items[0].name || '',
		description: `The main lunch at LHS ${relativeDate(date)}`,
		images: [
			{
				url: today[0]?.items[0].image ?? '',
				width: 800,
				height: 600,
				alt: `Stock picture of ${today[0]?.items[0].name}`
			}
		],
		site_name: 'LHS Lunch'
	}}
/>
<div class="flex w-full px-6 py-4 bg-blue-400 justify-between content-center  text-white">
	<span class=" font-bold text-3xl">🍽️ LHS Lunch</span>
	<a href="/today" class="font-bold text-3xl" target="_blank">📌 Today</a>
	<DateInput bind:value={date} />
</div>
<div class="m-4 ml-8">
	<ul>
		{#each today as category}
			<li>
				<h2 class="font-semibold text-2xl my-1">{category.name}</h2>
				<div class="flex overflow-scroll w-full">
					{#each category.items as meal}
						<div class="h-48 w-60 bg-white rounded-md shadow-sm mr-2  shrink-0	">
							<div
								style={`background-image: url("${encodeURI(meal.image)}");`}
								class="h-32 w-full rounded-t-md bg-cover"
							/>
							<span class="m-2 font-bold "
								>{meal.name}
								<Tooltip content={meal.product_fullname }
									><svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-4 h-4 inline-block"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
										/>
									</svg>
								</Tooltip></span
							>
						</div>
					{/each}
				</div>
			</li>
		{/each}
	</ul>
</div>
