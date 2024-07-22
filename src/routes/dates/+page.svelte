<script>
	export let data;

	import { VisSingleContainer, VisBulletLegend, VisDonut, VisTooltip } from '@unovis/svelte';
	import { Donut } from '@unovis/ts';
	import Nav from '$lib/Nav.svelte';
	import Card from '$lib/Card.svelte';
	import 'chart.js/auto';

	const normalizedSubtitle = `Alike days are grouped`;
	
	const value = (d) => d.value;
	const triggers = {
		[Donut.selectors.segment]: (d) => `<p class="font-semibold">
		${d.data.name}
		</p>
		${d.value}`
	};
</script>

<Nav emoji="📅" pagename="Dates"></Nav>

<div class="flex md:flex-row flex-col m-6 gap-2">
	<div>
		<Card title="Normalized Fridays" subtitle={normalizedSubtitle}>
			<div class="w-80">
				<VisSingleContainer data={data.fridays.itemsNormalized}>
					<VisDonut {value} arcWidth={30} />
					<VisTooltip {triggers}></VisTooltip>
				</VisSingleContainer>
				<VisBulletLegend items={data.fridays.itemsNormalized} />

			</div>
		</Card>
		<Card title="All Fridays">
			<div class="w-80">
				<VisSingleContainer data={data.fridays.items}>
					<VisDonut {value} arcWidth={30} />
					<VisTooltip {triggers}></VisTooltip>
				</VisSingleContainer>
				<VisBulletLegend items={data.fridays.items} />

			</div></Card

		>
	</div>
	<div>
		<Card title="Normalized Days" subtitle={normalizedSubtitle}>
			<div class="w-80">
				<VisSingleContainer data={data.allDays.itemsNormalized}>
					<VisDonut {value} arcWidth={30} />
					<VisTooltip {triggers}></VisTooltip>
				</VisSingleContainer>
				<VisBulletLegend items={data.allDays.itemsNormalized} />

			</div>
		</Card>
		<Card title="All Days">
			<div class="w-80">
				<VisSingleContainer data={data.allDays.items}>
					<VisDonut {value} arcWidth={30} />
					<VisTooltip {triggers}></VisTooltip>
				</VisSingleContainer>
				<VisBulletLegend items={data.allDays.items} />

			</div>
		</Card>
	</div>
</div>
