<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
    class="w-full h-full p-0 rounded-[0.2em] border-[none] bg-gray-100"
>
	<div on:click|stopPropagation class="p-4">
        <div class="w-full flex justify-end cursor-pointer" on:click={() => dialog.close()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              
        </div>
    
		<slot name="header" />
		<hr />
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
	</div>
</dialog>

<style>

dialog::backdrop {
  background: rgba(0, 0, 0, 0.3);
}

dialog[open] {
  @apply animate-[zoom_0.3s_cubic-bezier(0.34,1.56,0.64,1)] backdrop:animate-[fade_0.2s_ease-out];
}
@keyframes zoom {
  from {
    @apply scale-95;
  }
  to {
    @apply scale-100;
  }
}
@keyframes fade {
  from {
    @apply opacity-0;
  }
  to {
    @apply opacity-100;
  }
}
button {
  @apply block;
}
</style>
