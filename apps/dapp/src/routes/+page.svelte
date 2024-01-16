<script lang="ts">
	import { onMount } from 'svelte';

	import Button from '../stories/Button.svelte';
	import { DataRequestBuilder, RadixDappToolkit, createLogger } from '@radixdlt/radix-dapp-toolkit';
	import { authApi } from './api/auth/auth-api';
	import { userApi } from './api/(protected)/user/user-api';
	import { env } from '$env/dynamic/public';
	import { ResultAsync } from 'neverthrow';

	// TODO: move dApp toolkit to a better location
	onMount(() => {
		const radixDappToolkit = RadixDappToolkit({
			networkId: parseInt(env.PUBLIC_NETWORK_ID),
			dAppDefinitionAddress: env.PUBLIC_DAPP_DEFINITION_ADDRESS,
			logger: createLogger(1),
			onDisconnect: () => {
				// TODO: handle application state cleanup
				authApi.logout();
			}
		});

		radixDappToolkit.walletApi.provideChallengeGenerator(async () => {
			const result = await authApi.createChallenge();

			// TODO: handle challenge creation failure and give user some feedback
			if (result.isErr()) throw new Error('Failed to create challenge');

			return result.value;
		});

		radixDappToolkit.walletApi.setRequestData(
			DataRequestBuilder.persona().withProof(),
			DataRequestBuilder.accounts().exactly(1).withProof()
		);

		radixDappToolkit.walletApi.dataRequestControl(async ({ proofs }) => {
			const personaProof = proofs.find((proof) => proof.type === 'persona');
			if (personaProof) {
				// TODO: set the current user in a store
				const result = await authApi.login(personaProof);

				// TODO: handle login failure and give user some feedback
				if (result.isErr()) throw new Error('Failed to login');
			}
		});

		radixDappToolkit.walletApi.walletData$.subscribe(({ persona }) => {
			if (persona?.identityAddress)
				ResultAsync.combine([userApi.me(), authApi.authToken()])
					.map(([user, authToken]) => {
						// TODO:
						// - bootstrap the application state (quest progress, user, notifications etc...) and connect to notifications websocket
						// - improve the websocket connection logic and handle reconnection
						new WebSocket(env.PUBLIC_NOTIFICATION_URL);
					})
					.mapErr(({ status }) => {
						// TODO: logout user and give feedback that the session has expired
						if (status === 401) radixDappToolkit.disconnect();
					});
		});
	});
</script>

<div><radix-connect-button></radix-connect-button></div>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Button label="Just a button"></Button>

<style lang="scss">
	div {
		display: flex;
		justify-content: flex-end;
	}
</style>
