import { error } from '@sveltejs/kit'
import { hasEnoughXrd } from './has-enough-xrd'
import type { PageLoad } from './$types'

export const load: PageLoad = async () => {
  const enoughXrd = hasEnoughXrd()

  const result = await enoughXrd

  if (result.isErr()) error(500, 'Failed to get XRD balance')

  return {
    hasEnoughXrd: result.value
  }
}
