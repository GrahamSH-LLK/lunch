<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';
	import { MetaTags } from 'svelte-meta-tags';
	import { Tooltip } from '@svelte-plugins/tooltips';
	import Nav from '$lib/Nav.svelte';
	import Modal from '$lib/Modal.svelte';
	import StarRating from '@ernane/svelte-star-rating';
	let config = {
		readOnly: false,
		countStars: 5,
		range: { min: 0, max: 5, step: 1 },
		score: 0,
		showScore: true,
		starConfig: {
			size: 30,
			fillColor: '#F9ED4F',
			strokeColor: '#BB8511',
			unfilledColor: '#FFFFF',
			strokeUnfilledColor: '#00000'
		}
	};
	import '$src/app.css';
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
				`/lunch/${encodeURIComponent(
					date.toLocaleString(undefined, { day: '2-digit', year: 'numeric', month: '2-digit' })
				)}`,
				{ replaceState: true }
			);
		}
	}
	let modalMeal;
	let showModal = false;
	let allergens = [
		'dairy',
		'egg',
		'fish',
		'gluten',
		'milk',
		'other',
		'peanut',
		'pork',
		'shellfish',
		'soy',
		'treenuts',
		'vegetarian',
		'wheat'
	];
	const changeSliderInput = async () => {
		if (!localStorage.uuid) {
			localStorage.setItem('uuid', crypto.randomUUID());
		}
		let res = await fetch('/lunch/rate', {
			method: 'POST',
			body: JSON.stringify({
				uuid: localStorage.uuid,
				product_id: modalMeal.id,
				rating: config.score
			})
		});
		//modalMeal["rating_avg_new"] = (modalMeal["rating_average"] * modalMeal["rating_count"]) + config.score / (modalMeal["rating_count"] + 1)
		console.log(config.score);
	};
	const openModal = (meal) => {
		showModal = true;
		modalMeal = meal;
		config.score = 0;
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
<Nav emoji={'🍽️'} pagename="Lunch">
	<a href="/lunch/today" class="font-bold text-3xl" target="_blank">📌 Today</a>
	<DateInput bind:value={date} />
</Nav>
<Modal bind:showModal class="">
	{#if modalMeal}
		<div
			style={`background-image: url("${encodeURI(modalMeal.image)}");`}
			class="h-48 w-full rounded-t-md bg-cover bg-center relative"
		>
			<p class="absolute bottom-1 left-1 text-2xl mix-blend-exclusion		text-white">
				{modalMeal.name}
			</p>
		</div>
<div class="flex justify-between pt-2">
		<span class="font-bold">{modalMeal['rating_average'] ? `${modalMeal['rating_average']} stars  (${modalMeal["rating_count"]} ratings)`: 'No ratings yet'} </span>
		<StarRating bind:config on:change={changeSliderInput} />
	</div>
		<div class="flex">
			<div class="font-bold">
				<div class="h-10">Allergens</div>
				<div class="h-10">Serving Size</div>
			</div>
			<div class="px-5">
				<div class="flex h-10">
					{#each allergens as allergen}
						{#if modalMeal['allergen_' + allergen] == 1}
							<Tooltip content={allergen.charAt(0).toUpperCase() + allergen.slice(1)}>
								<img src={`/allergens/${allergen}.png`} alt={allergen} class="h-10 w-10" /></Tooltip
							>
						{/if}
					{/each}
				</div>

				{modalMeal['portion_size']}
				{modalMeal['portion_size_unit']}
				{modalMeal['providerProductID']}
			</div>
		</div>
	{/if}
</Modal>

<div class="m-4 ml-8">
	{#if date.getDay() == 0 || date.getDay() == 6}
		<h2 class="text-2xl">Didn't realize you liked school lunch that much</h2>
		<p>It's a weekend!</p>
	{:else}
		<ul>
			{#each today as category}
				<li>
					<h2 class="font-semibold text-2xl my-1">{category.name}</h2>
					<div class="flex overflow-scroll w-full">
						{#each category.items as meal}
							<div
								class="h-48 w-60 bg-white rounded-md shadow-sm mr-2  shrink-0	"
								on:click={openModal(meal)}
							>
								<div
									style={`background-image: url("${encodeURI(meal.image)}");`}
									class="h-32 w-full rounded-t-md bg-cover"
								/>
								<span class="m-2 font-bold ">{meal.name} </span>
							</div>
						{/each}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
