import type { Handle } from '@sveltejs/kit'
import { publicConfig } from '$lib/utils/config'
import { env } from '$env/dynamic/public'

const isJetty = env.PUBLIC_SWAP_VARIATION === 'JETTY'

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === '/.well-known/radix.json') {
    return new Response(
      JSON.stringify({
        callbackPath: '/connect',
        dApps: [
          {
            dAppDefinitionAddress: isJetty
              ? publicConfig.accounts.jettySwapDappDefinition.address
              : publicConfig.accounts.lettySwapDappDefinition.address
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
  }

  const response = await resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replace('theme="jetty"', `theme='${isJetty ? 'jetty' : 'letty'}'`)
  })
  return response
}
