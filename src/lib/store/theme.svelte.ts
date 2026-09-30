import { writable } from 'svelte/store';

const LOCAL_STORE_KEY = 'theme';

function persistentStore() {
	const { update, subscribe, set } = writable('');

	return {
		update: (updater: (value: string) => string) => {
			update((current) => {
				const updated = updater(current);
				localStorage.setItem(LOCAL_STORE_KEY, updated);
				return updated;
			});
		},
		set: (value: string) => {
			localStorage.setItem(LOCAL_STORE_KEY, value);
			set(value);
		},
		subscribe
	};
}

export const themeStore = persistentStore();
