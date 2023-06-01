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
			headers: {'Content-Type': 'application/json'},
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
	};
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
			style={`background-image: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0),
				rgba(0, 0, 0, 0.6)
			  ), url("${encodeURI(modalMeal.image)}");`}
			class="h-48 w-full rounded-md bg-cover bg-center relative"
		>
				<p class="absolute bottom-1 left-1 text-2xl text-white 	">
					{modalMeal.name}
				</p>
			
		</div>
		<div class="flex justify-between pt-2">
			<span class="font-bold"
				>{modalMeal['rating_average']
					? `${modalMeal['rating_average']} stars  (${modalMeal['rating_count']} ratings)`
					: 'No ratings yet'}
			</span>
			<StarRating bind:config on:change={changeSliderInput} />
		</div>
		<div class="flex">
			<div class="font-bold">
				<div class="h-10">Allergens</div>
				<div class="h-10">Provider item code</div>
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

				{modalMeal['providerProductID']}
			</div>
		</div>
		<table class="w-64 p-4 border-2 border-black border-spacing-4">
			<thead class="border-b border-b-black px-2">
				<tr>
					<th class="font-black text-2xl" colspan="2">Nutrition Facts</th>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td class="px-1">
						{modalMeal['portion_size']}
						{modalMeal['portion_size_unit']}
					</td>
				</tr>
				<tr>
					<td class="px-1"> Serving size: {Math.floor(modalMeal['prod_gram_weight'])}g</td>
				</tr>
				<tr class="bg-black h-2 px-1">
					<td />
				</tr>
				<tr
					><p class="font-bold px-1">Amount Per Serving</p>
					<p class="text-3xl font-extrabold px-1">Calories {modalMeal['prod_calories']}</p>
				</tr>
				<tr class="bg-black h-1 px-1">
					<td />
				</tr>
				<tr>
					<p class="px-1">
						<span class="font-bold">Total Fat</span>
						{modalMeal['prod_total_fat']}g
					</p>
					<p class="px-6">
						Saturated Fat {modalMeal['prod_sat_fat']}g
					</p>
					<p class="px-6">
						<span class="italic">Trans</span> Fat {modalMeal['prod_trans_fat']}g
					</p>
					<p class="px-1">
						<span class="font-bold">Cholesterol</span>
						{modalMeal['prod_cholesterol']}g
					</p>
					<p class="px-1"><span class="font-bold">Sodium</span> {modalMeal['prod_sodium']}g</p>

					<p class="px-1">
						<span class="font-bold">Total Carbohydrate</span>
						{modalMeal['prod_carbs']}g
					</p>
					<p class="px-6">
						Dietary Fiber {modalMeal['prod_dietary_fiber']}g
					</p>
					<p class="px-6">
						Sugar {modalMeal['sugar']}g
					</p>
					<p class="px-1"><span class="font-black">Protein</span> {modalMeal['prod_protein']}</p>
				</tr>
			</tbody>
		</table>
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

<style>
	table {
		font-family: Helvetica;
	}
</style>
