import { fetchWrapper } from '$lib/helpers/fetch-wrapper'

export const getRadmorphImage = (radgem1: string, radgem2: string, card: string) =>
  fetchWrapper<{
    imageUrl: string
  }>(
    fetch('/api/radmorph/image', {
      method: 'POST',
      body: JSON.stringify({
        radgem1,
        radgem2,
        card
      })
    })
  ).map(({ data }) => data)
