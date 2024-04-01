<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
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
	const getMyRating = async (product_id) => {
		if (!localStorage.uuid) {
			localStorage.setItem('uuid', crypto.randomUUID());
		}

		const res = await fetch('/api/get-my-rating', {
			headers: { 'Content-Type': 'application/json' },

			body: JSON.stringify({
				product_id,
				uuid: localStorage.uuid
			}),
			method: 'POST'
		});
		let data = await res.json();

		if (!data.rate) return 0;
		return data.rate;
	};
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
		let res = await fetch('/api/rate', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				uuid: localStorage.uuid,
				product_id: modalMeal.id,
				rating: config.score
			})
		});
	};
	const openModal = async (meal) => {
		showModal = true;
		modalMeal = meal;
		config.score = await getMyRating(meal.id);
	};
</script>

{#if today[0].items.length}
	<MetaTags
		openGraph={{
			url: 'https://www.url.ie/a',
			title: today[0]?.items[0].componentEnglishName || '',
			description: `The main lunch at LHS ${relativeDate(date)}`,
			images: [
				{
					url: today[0]?.items[0].image ?? '',
					width: 800,
					height: 600,
					alt: `Stock picture of ${today[0]?.items[0]?.name ?? ''}`
				}
			],
			site_name: 'LHS Lunch'
		}}
	/>
{/if}
<Nav emoji={'🍽️'} pagename="Lunch">
	<a href="/lunch/today" class="font-bold text-3xl" target="_blank">📌 Today</a>
	<DateInput bind:value={date} />
</Nav>

<Modal bind:showModal class="">
	{#if modalMeal}
		<div
			style={`background-image: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0),
				rgba(0, 0, 0, 0.6)
			  ), url("${encodeURI(modalMeal.image)}");`}
			class="h-48 w-full rounded-md bg-cover bg-center relative"
		>
			<p class="absolute bottom-1 left-1 text-2xl text-white">
				{modalMeal.componentEnglishName}
			</p>
		</div>
		<div class="flex justify-between pt-2">
			<span class="font-bold">ratings temporarily disabled while i figure out the new api 🫡</span>
			<span class="italic">it's probably a 3.5</span>

			{#if false}
				<span class="font-bold"
					>{modalMeal['ratings']
						? `${modalMeal['rating']} stars  (${modalMeal['ratings']} ratings)`
						: 'No ratings yet'}
				</span>
				<StarRating bind:config on:change={changeSliderInput} />
			{/if}
		</div>
		<div class="flex">
			<div class="font-bold">
				<div class="h-10">Allergens (coming soon)</div>
				<div class="h-10">Full Name</div>
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

				{modalMeal['componentName']}
			</div>
		</div>
		<table class="w-64 p-4 border-2 border-black border-spacing-4">
			<thead class="border-b border-b-black px-2">
				<tr>
					<th class="font-black text-2xl" colspan="2">Nutrition Facts</th>
				</tr>
			</thead>

			<tbody>
				<tr class="bg-black h-2 px-1">
					<td />
				</tr>
				<tr
					><p class="font-bold px-1">Amount Per Serving</p>
					<p class="text-3xl font-extrabold px-1">Calories {modalMeal['calories']}</p>
				</tr>
				<tr class="bg-black h-1 px-1">
					<td />
				</tr>
				<tr>
					<p class="px-1">
						<span class="font-bold">Total Fat</span>
						{modalMeal['fat']}g
					</p>
					<p class="px-6">
						Saturated Fat {modalMeal['saturatedFat']}g
					</p>
					<p class="px-6">
						<span class="italic">Trans</span> Fat {modalMeal['transFattyAcid']}g
					</p>
					<p class="px-1">
						<span class="font-bold">Cholesterol</span>
						{modalMeal['cholesterol']}g
					</p>
					<p class="px-1"><span class="font-bold">Sodium</span> {modalMeal['sodium']}g</p>

					<p class="px-1">
						<span class="font-bold">Total Carbohydrate</span>
						{modalMeal['carbohydrates']}g
					</p>
					<p class="px-6">
						Dietary Fiber {modalMeal['dietaryFiber']}g
					</p>
					<p class="px-6">
						Sugar {modalMeal['totalSugars']}g
					</p>
					<p class="px-1"><span class="font-black">Protein</span> {modalMeal['protein']}g</p>
				</tr>
			</tbody>
		</table>
	{/if}
</Modal>

<div class="m-4 ml-8">
	{#if date.getDay() == 0 || date.getDay() == 6}
		<h2 class="text-2xl">Sorry, no lunch today!</h2>
		<p>It's a weekend!</p>
	{:else}
		<ul>
			{#each today as category}
				<li>
					<h2 class="font-semibold text-2xl my-1">{category.name}</h2>
					<div class="flex overflow-scroll w-full">
						{#each category.items as meal}
							<Tooltip content={meal.componentEnglishDescription}>
								<div
									class="h-48 w-72 bg-white rounded-md shadow-sm mr-2 shrink-0"
									on:click={openModal(meal)}
								>
									<div
										style={`background-image: url("${encodeURI(meal.image)}");`}
										class="h-32 w-full rounded-t-md bg-cover"
									/>
									<span class="m-2 font-bold">{meal.componentEnglishName} </span>
								</div>
							</Tooltip>
						{/each}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	table {
		font-family: Helvetica;
	}
</style>
