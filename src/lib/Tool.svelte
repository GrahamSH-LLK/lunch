<script>
	export let name;
	export let info;
	export let emoji;
	export let url;
</script>

<a href="/{url || name.toLowerCase()}">
	<li class="flex justify-between gap-x-6 py-5 items-center">
		<div class="flex min-w-0 gap-x-4">
         <svg xmlns="http://w3.org/2000/svg" viewBox="0 0 100 100" class="h-12 w-12 flex-none">
            <text y=".9em" font-size="90">{emoji}</text>
            </svg>

			<div class="min-w-0 flex-auto">
				<p class="text-sm font-semibold leading-6 text-primary">{name}</p>
				<p class="mt-1 truncate text-xs leading-5 text-primary opacity-70">{info}</p>
			</div>
		</div>
		<div class=" shrink-0 flex flex-col align-middle">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</div>
	</li>
</a>
