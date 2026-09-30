<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authStore } from '$lib/store/auth.svelte';
	const { children } = $props();

	function onLogout() {
		authStore.set({ username: '' });
	}

	$effect(() => {
		if ($authStore?.username) return;

		goto(resolve('/login'));
	});
</script>

<header class="navbar flex justify-between gap-2 bg-base-100">
	<h1 class="text-2xl">Test App</h1>
	<section class="flex items-center gap-2">
		<div>Hello! {$authStore?.username}</div>
		<button class="btn btn-primary" onclick={onLogout}>Logout</button>
	</section>
</header>

<section class="p-3">
	{@render children()}
</section>
