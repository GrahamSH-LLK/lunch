<script>
	export let pagename;
    export let emoji;
</script>

<div class="flex w-full px-6 py-4 bg-blue-400 justify-between content-center  text-white">
	<span class=" font-bold text-3xl"><a href="/">{emoji} LHS {pagename}</a></span>
    <slot></slot>

</div>
