export const createUnauthorizedResponse = (error: string) =>
  new Response(JSON.stringify({ error, status: 401 }), {
    headers: {
      'content-type': 'application/json'
    },
    status: 401
  })

export const createForbiddenResponse = () =>
  new Response(JSON.stringify({ error: 'Forbidden', status: 403 }), {
    headers: {
      'content-type': 'application/json'
    },
    status: 403
  })
