import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname === '/health') {
    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }

  const response = await resolve(event, {})
  return response
}
