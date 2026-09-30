<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authStore } from '$lib/store/auth.svelte';

	$effect(() => {
		if ($authStore?.username) {
			goto(resolve('/(authed)/dashboard'));
		}
	});

	function onsubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!username || !password) {
			alert('Please enter both username and password');
			return;
		}

		if (password !== 'ironmen99') {
			alert('Invalid password');
			return;
		}

		authStore.set({ username });

		goto(resolve('/(authed)/dashboard'));
	}
</script>

<main class="grid h-screen place-items-center">
	<form class="card flex w-100 flex-col gap-2 bg-base-100 p-5" {onsubmit}>
		<label for="username">Username</label>
		<input type="text" name="username" class="input w-full" placeholder="Username" />

		<label for="password">Password</label>
		<input type="password" name="password" class="input w-full" placeholder="Password" />

		<button type="submit" class="btn mt-2 btn-primary">Login</button>
	</form>
</main>
