<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { MetaTags } from 'svelte-meta-tags';
	import { Tooltip } from '@svelte-plugins/tooltips';
	import Nav from '$lib/Nav.svelte';
	import Modal from '$lib/Modal.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { StarFilled, Star } from 'svelte-radix';
	import StarRating from '@ernane/svelte-star-rating';
	import {today as getToday} from '@internationalized/date'
	import {fade, slide} from 'svelte/transition'
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
	import DatePicker from '$lib/DatePicker.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';
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
	let dateObj = data.dateObj;
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
		if (browser && data.todayDate?.getTime() != dateObj.toDate().getTime()) {
			goto(
				`/lunch/${encodeURIComponent(
					dateObj
						.toDate()
						.toLocaleString(undefined, { day: '2-digit', year: 'numeric', month: '2-digit' })
				)}`,
				{ replaceState: true }
			);
		}
	}
	let meal;
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
				product_id: meal.id,
				rating: config.score
			})
		});
	};
	const openModal = async (meal) => {
		showModal = true;
		meal = meal;
		config.score = await getMyRating(meal.id);
	};
	onMount(() => {
		HTMLElement.prototype.scrollIntoView = function () {};
		window.scrollTo = function (x, y) {
			console.log('hi', x, y);
		};
		window.scrollBy = function () {};
	});
	const uppercaseFirstLetter = (string) => {
		return string[0].toUpperCase() + string.substring(1);
	};
	const goToToday= ()=> {
		dateObj = getToday('America/New_York')
	}
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
	<Button  class="mr-2" target="_blank" on:click={goToToday}>Today</Button>
	<DatePicker bind:value={dateObj} />
</Nav>

<div class="m-4 ml-8" >
	{#if date.getDay() == 0 || date.getDay() == 6}
		<h2 class="text-2xl">Sorry, no lunch today!</h2>
		<p>It's a weekend!</p>
	{:else}
		<ul>
			{#each today as category}
			
				<li>
					<h2 class="font-semibold text-2xl my-1">{category.name}</h2>
					<div class="flex overflow-x-auto w-full snap-x">
						{#each category.items as meal}
						{#key meal.componentEnglishName}
							<div
								style={`background-image: linear-gradient(
								to bottom,
								rgba(0, 0, 0, 0),
								rgba(0, 0, 0, 0.6)
							  ), url("${encodeURI(meal.image)}");`}
								class="h-48 w-full rounded-md bg-cover bg-center mr-2 items-end flex max-w-[368px] snap-center"
								in:fade={{ duration: 300, delay: 180 }} out:fade={{ duration: 200 }}
							>
								<div class="w-full flex justify-between items-center m-2">
									<span class="text-white mr-1 min-w-40">{meal.componentEnglishName}</span>
									<Sheet.Root>
										<Sheet.Trigger><Button variant="secondary">See More</Button></Sheet.Trigger>

										<Sheet.Content>
											<Sheet.Header>
												<Sheet.Title>{meal.componentEnglishName}</Sheet.Title>
												<Sheet.Description>
													<ul class="list-disc pl-4">
														{#if meal['componentEnglishDescription']}
															<li>{uppercaseFirstLetter(meal['componentEnglishDescription'])}</li>
														{:else if meal['componentName']}
															<li>{meal['componentName']}</li>
														{/if}
														{#if meal['dietaryName']}
															<li>{meal['dietaryName']}</li>
														{/if}
													</ul>
												</Sheet.Description>
											</Sheet.Header>

											<div class="flex pt-2 gap-2">
												{#each { length: 5 } as _, star}
													{#if meal.ratings >= star + 1}
														<StarFilled></StarFilled>
													{:else}
														<Star></Star>
													{/if}
												{/each}
											<span class="font-light">{meal.ratings} stars</span>
											</div>
											<div class="flex">
												{#if false}
													<div class="font-bold">
														<div class="h-10">Allergens (coming soon)</div>
														<div class="h-10">Full Name</div>
													</div>
												{/if}
												<div class="px-5">
													<div class="flex h-10">
														{#each allergens as allergen}
															{#if meal['allergen_' + allergen] == 1}
																<Tooltip
																	content={allergen.charAt(0).toUpperCase() + allergen.slice(1)}
																>
																	<img
																		src={`/allergens/${allergen}.png`}
																		alt={allergen}
																		class="h-10 w-10"
																	/></Tooltip
																>
															{/if}
														{/each}
													</div>
												</div>
											</div>
											
											<table class="w-64 p-4 border-2 border-primary  border-spacing-4">
												<thead class="border-b border-b-primary px-2">
													<tr>
														<th class="font-black text-2xl" colspan="2">Nutrition Facts</th>
													</tr>
												</thead>

												<tbody>
													<tr class="bg-primary h-2 px-1">
														<td />
													</tr>
													<tr
														><p class="font-bold px-1">Amount Per Serving</p>
														<p class="text-3xl font-extrabold px-1">Calories {meal['calories']}</p>
													</tr>
													<tr class="bg-primary h-1 px-1">
														<td />
													</tr>
													<tr>
														<p class="px-1">
															<span class="font-bold">Total Fat</span>
															{meal['fat']}g
														</p>
														<p class="px-6">
															Saturated Fat {meal['saturatedFat']}g
														</p>
														<p class="px-6">
															<span class="italic">Trans</span> Fat {meal['transFattyAcid']}g
														</p>
														<p class="px-1">
															<span class="font-bold">Cholesterol</span>
															{meal['cholesterol']}g
														</p>
														<p class="px-1">
															<span class="font-bold">Sodium</span>
															{meal['sodium']}g
														</p>

														<p class="px-1">
															<span class="font-bold">Total Carbohydrate</span>
															{meal['carbohydrates']}g
														</p>
														<p class="px-6">
															Dietary Fiber {meal['dietaryFiber']}g
														</p>
														<p class="px-6">
															Sugar {meal['totalSugars']}g
														</p>
														<p class="px-1">
															<span class="font-black">Protein</span>
															{meal['protein']}g
														</p>
													</tr>
												</tbody>
											</table>
										</Sheet.Content>

										<!--</Tooltip>-->
									</Sheet.Root>
								</div>
							</div>
							{/key}
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
