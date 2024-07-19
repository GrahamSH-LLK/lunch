<script>
	export let data;

	import { VisSingleContainer, VisBulletLegend, VisDonut, VisTooltip } from '@unovis/svelte';
	import {Donut} from '@unovis/ts'
	import Nav from '$lib/Nav.svelte';
	import Card from '$lib/Card.svelte';
	import 'chart.js/auto';

	const normalizedSubtitle = `Alike days are grouped`;
	let fridayItems =[];
	let fridayData = [];
	$: {
		fridayItems = data.fridays.items
		fridayData = data.fridays.data || [];
	}
	const value = (d) => d
	const triggers = { [Donut.selectors.segment]: (d) => d.data };

</script>

<Nav emoji="📅" pagename="Dates"></Nav>

<div class="flex md:flex-row flex-col m-6 gap-2">
	<div>
		<Card title="Normalized Fridays" subtitle={normalizedSubtitle}>
			<div class="h-80 w-80">
				<VisBulletLegend items={data.fridays.itemsNormalized}  />
				<VisSingleContainer data={data.fridays.dataNormalized}>
					<VisDonut value={value} arcWidth={30} />
					<VisTooltip {triggers}></VisTooltip>
				</VisSingleContainer>

			
			</div>
		</Card>
		<Card title="All Fridays">
			<div class="h-80 w-80">
				<VisBulletLegend items={data.fridays.items}  />
				<VisSingleContainer data={data.fridays.data}>
					<VisDonut value={value} arcWidth={30}/>
					<VisTooltip {triggers}></VisTooltip>

				</VisSingleContainer>
			</div></Card
		>
	</div>
	<div>
		<Card title="Normalized Days" subtitle={normalizedSubtitle}>
			<div class="h-80 w-80">
				<VisBulletLegend items={data.allDays.itemsNormalized}  />
				<VisSingleContainer data={data.allDays.dataNormalized}>
					<VisDonut value={value} arcWidth={30}/>
					<VisTooltip {triggers}></VisTooltip>
				</VisSingleContainer>
			</div>
		</Card>
		<Card title="All Days">
			<div class=" w-80">
				<VisBulletLegend items={data.allDays.items}  />
				<VisSingleContainer data={data.allDays.data}>
					<VisDonut value={value} arcWidth={30}/>
					<VisTooltip {triggers}></VisTooltip>
				</VisSingleContainer>
			</div>
		</Card>
	</div>
</div>
