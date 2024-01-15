import type { SignedChallenge } from '@radixdlt/radix-dapp-toolkit';
import { fetchWrapper } from '$lib/helpers/fetch-wrapper';

const login = (signedChallenge: SignedChallenge) =>
	fetchWrapper<{ authToken: string }>(
		fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(signedChallenge)
		})
	).map(({ data }) => data.authToken);

const createChallenge = () =>
	fetchWrapper<{ challenge: string }>(fetch('/api/auth/challenge')).map(
		({ data }) => data.challenge
	);

const logout = () =>
	fetchWrapper<undefined>(
		fetch('/api/auth/logout', {
			method: 'POST'
		})
	);

const authToken = () =>
	fetchWrapper<{ authToken: string }>(
		fetch('/api/auth/token', {
			method: 'get'
		})
	).map(({ data }) => data.authToken);

export const authApi = { login, logout, createChallenge, authToken } as const;
