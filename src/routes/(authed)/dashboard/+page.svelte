<script lang="ts">
	import { onMount } from 'svelte';

	let theme: string = $state('');

	function toggleTheme() {
		const current = document.querySelector('html')?.getAttribute('data-theme');
		theme = current === 'latte' ? 'mocha' : 'latte';
		document.querySelector('html')?.setAttribute('data-theme', theme);
	}

	onMount(() => {
		const current = document.querySelector('html')?.getAttribute('data-theme');
		theme = current || 'latte';
	});
</script>

<main class="flex flex-col gap-2">
	<h1>This is authed pages</h1>

	<section>
		<div>Now using: <span class="capitalize">{theme}</span> theme</div>
		<button class="btn btn-primary" onclick={toggleTheme}>Toggle Theme!</button>
	</section>
</main>
