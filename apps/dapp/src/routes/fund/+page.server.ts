import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
  return {
    baseUrl: url.origin
  }
}
