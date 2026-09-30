import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type AuthStore = {
	username: string;
};

const initial: AuthStore = {
	username: ''
};

function persistentStore() {
	const stored = browser ? localStorage.getItem('auth') : null;
	const data = stored ? JSON.parse(stored) : initial;

	const { subscribe, set, update } = writable(data);

	return {
		subscribe,
		set: (value: AuthStore) => {
			localStorage.setItem('auth', JSON.stringify(value));
			set(value);
		},
		update: (updater: (value: AuthStore) => AuthStore) => {
			update((current) => {
				const updated = updater(current);
				localStorage.setItem('auth', JSON.stringify(updated));
				return updated;
			});
		}
	};
}

export const authStore: ReturnType<typeof persistentStore> = persistentStore();
