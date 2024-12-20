import { config } from '$lib/config'

export const createWellKnownResponse = () =>
  new Response(
    JSON.stringify({
      dApps: [
        {
          dAppDefinitionAddress: config.dapp.accounts.dAppDefinition.address
        },
        {
          dAppDefinitionAddress: config.dapp.accounts.jetty.address
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
