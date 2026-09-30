<script lang="ts">
	import { themeStore } from '$lib/store/theme.svelte';
	import { onMount } from 'svelte';

	function toggleTheme() {
		const current = document.querySelector('html')?.getAttribute('data-theme');
		$themeStore = current === 'latte' ? 'mocha' : 'latte';
		document.querySelector('html')?.setAttribute('data-theme', $themeStore);
	}

	onMount(() => {
		const def = document.querySelector('html')?.getAttribute('data-theme');
		$themeStore = $themeStore || (def ?? 'mocha');
		document.querySelector('html')?.setAttribute('data-theme', $themeStore);
	});
</script>

<main class="flex flex-col gap-2">
	<h1>This is authed pages</h1>

	<section>
		<div>Now using: <span class="capitalize">{$themeStore}</span> theme</div>
		<button class="btn btn-primary" onclick={toggleTheme}>Toggle Theme!</button>
	</section>
</main>
