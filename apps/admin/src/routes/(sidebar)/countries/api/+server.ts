import { json } from '@sveltejs/kit'

export const GET = async ({ locals }) => {
  const countries = await locals.blockedCountryModel.getAll()
  return json(countries.value, { status: 200 })
}

export const PUT = async ({ request, locals }) => {
  const { countryCode, status } = await request.json()
  const result = await locals.blockedCountryModel.update(countryCode, status)

  return json(result.value, { status: 200 })
}
