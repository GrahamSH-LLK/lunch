<script>
	export let title;
	export let subtitle;
</script>

<div class="p-4 border-gray-200 border rounded-md mb-4">
	<h3 class="text-gray-900 dark:text-white font-semibold">{title}</h3>
	<span class="mt-1 text-gray-500 dark:text-gray-400 text-sm">{subtitle || ''}</span>
	<div class="mt-2 flex flex-col justify-center">
		<slot />
	</div>
</div>
