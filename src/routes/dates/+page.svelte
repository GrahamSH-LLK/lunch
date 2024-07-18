<script>
	export let data;

	import { Doughnut } from 'svelte-chartjs';
	import Nav from '$lib/Nav.svelte';
	import 'chart.js/auto';
</script>

<Nav emoji="📅" pagename="Dates"></Nav>

<div class="flex flex-row">
	<div >
		<h3 class="text-3xl">Normalized Fridays</h3>
		<span class="italic font-light text-gray-500">Alike days are grouped</span>
		<div class="h-80 w-80">
			<Doughnut
				data={{
					labels: Object.keys(data.fridays.countPerDayReduced).map(
						(x) => `Day ${x} or ${parseInt(x) + 4}`
					),
					datasets: [
						{
							data: Object.values(data.fridays.countPerDayReduced)
						}
					]
				}}
				options={{ responsive: true }}
			></Doughnut>
		</div>
		<h3 class="text-3xl">All Fridays</h3>
		<div class="h-80 w-80">
			<Doughnut
				data={{
					labels: Object.keys(data.fridays.countPerDay).map((x) => `Day ${x}`),
					datasets: [
						{
							data: Object.values(data.fridays.countPerDay)
						}
					]
				}}
				options={{ responsive: true }}
			></Doughnut>
		</div>
	</div>
	<div>
		<h3 class="text-3xl">Normalized Days</h3>
		<span class="italic font-light text-gray-500">Alike days are grouped</span>

		<div class="h-80 w-80">
			<Doughnut
				data={{
					labels: Object.keys(data.allDays.countPerDayReduced).map(
						(x) => `Day ${x} or ${parseInt(x) + 4}`
					),
					datasets: [
						{
							data: Object.values(data.allDays.countPerDayReduced)
						}
					]
				}}
				options={{ responsive: true }}
			></Doughnut>
		</div>

		<h3 class="text-3xl">All Days</h3>
		<div class="h-80 w-80">
			<Doughnut
				data={{
					labels: Object.keys(data.allDays.countPerDay).map((x) => `Day ${x}`),
					datasets: [
						{
							data: Object.values(data.allDays.countPerDay)
						}
					]
				}}
				options={{ responsive: true }}
			></Doughnut>
		</div>
	</div>
</div>
