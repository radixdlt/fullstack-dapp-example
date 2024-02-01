import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export const POST: RequestHandler = async ({ cookies }) => {
  cookies.delete('jwt', { path: '/' })

  return json(
    {
      status: 200
    },
    {
      status: 200
    }
  )
}
