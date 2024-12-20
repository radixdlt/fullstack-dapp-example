import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = ({ url }) => {
  let homePath = '/home/basic'
  const queryParams = url.searchParams.toString()
  homePath = queryParams ? `${homePath}?${queryParams}` : homePath

  redirect(301, homePath)
}
