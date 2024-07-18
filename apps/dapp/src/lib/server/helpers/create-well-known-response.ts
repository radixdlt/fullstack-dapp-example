import { config } from '$lib/config'

export const createWellKnownResponse = () =>
  new Response(
    JSON.stringify({
      callbackPath: '/connect',
      dApps: [
        {
          dAppDefinitionAddress: config.dapp.accounts.dAppDefinition
        },
        {
          dAppDefinitionAddress: config.dapp.accounts.jetty
        }
      ]
    }),
    {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  )
