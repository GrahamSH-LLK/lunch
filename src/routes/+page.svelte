<script>
	import Nav from '$lib/Nav.svelte';
  	import Tool from '$lib/Tool.svelte';

	import '$src/app.css';
</script>

<Nav emoji={'🏫'} pagename="School Tools" />
<div class="text-2xl m-4 ml-8">
	<ul role="list" class="divide-y divide-gray-100">
  <Tool name={"Lunch"} info={"Daily Lunch Menus"} emoji="fork_and_knife_with_plate"></Tool>
    <Tool name={"Dates"} info={"Important Dates"} emoji={"calendar"}></Tool>

	</ul>

</div>
