import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const LOCAL_STORE_KEY = 'theme';
const DEFAULT_VALUE = '';

function persistentStore() {
	const initial = browser ? (localStorage.getItem(LOCAL_STORE_KEY) ?? null) : null;
	const { subscribe, ...store } = writable(initial ?? DEFAULT_VALUE);

	const update = (updater: (value: string) => string) => {
		store.update((current) => {
			const updated = updater(current);
			localStorage.setItem(LOCAL_STORE_KEY, updated);
			return updated;
		});
	};

	const set = (value: string) => {
		localStorage.setItem(LOCAL_STORE_KEY, value);
		store.set(value);
	};

	return {
		update,
		set,
		subscribe,
		setTheme: (value: string) => {
			set(value);
		}
	};
}

export const themeStore = persistentStore();
