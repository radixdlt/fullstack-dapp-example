import { json } from '@sveltejs/kit'

export const GET = async ({ locals }) => {
  const countries = await locals.blockedCountryModel.getAll()
  return json(countries.value, { status: 200 })
}

export const PUT = async ({ request, locals }) => {
  const { countryCode, blocked } = await request.json()
  const result = await locals.blockedCountryModel.update(countryCode, blocked)

  return json(result.value, { status: 200 })
}
