import { httpFactory } from '$lib/http'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch }) => {
  const http = httpFactory(fetch)
  const countries = await http.get('/countries/api')
  return {
    countries
  }
}
