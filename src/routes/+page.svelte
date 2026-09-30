<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	function onLoginClicked() {
		goto(resolve('/login'));
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<p class="mt-4">
	Login to the dashboard<br />
	<button class="btn btn-primary" onclick={onLoginClicked}>Login</button>
</p>
